import gc
import io
import os
import re
import sys
import time
import json
import torch
import torchaudio
from TTS.tts.configs.xtts_config import XttsConfig
from TTS.tts.models.xtts import Xtts
from text_replacements import REPLACEMENTS


# Đường dẫn tuyệt đối đến thư mục hiện tại
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__)))

# Các đường dẫn quan trọng
_checkpoint_dir = os.path.join(BASE_DIR, "models", "viXTTS")
xtts_config = os.path.join(_checkpoint_dir, "config.json")
_voiceDefault = os.path.join(_checkpoint_dir, "samples", "nu-calm.wav")

def log_info(message):
    print(f"[INFO]: {message}", file=sys.stderr, flush=True)

def log_error(message):
    print(f"[ERROR]: {message}", file=sys.stderr, flush=True)

def log_debug(message):
    print(f"[DEBUG]: {message}", file=sys.stderr, flush=True)

def log_warn(message):
    print(f"[WARNING]: {message}", file=sys.stderr, flush=True)

def log_response(message):
    print(f"[RESPONSE]: {message}", file=sys.stdout, flush=True)

def success_response(data):
    return json.dumps({"ok": "true", "data": data})

def error_response(message):
    return json.dumps({"ok": "false", "message": message})

class TextToSpeech:
    def __init__(self):
        self.replacements = REPLACEMENTS
        self.compiled_replacements = []  
        self.model = None
        self.config = None

    def load_model(self):
        log_info("Loading TTS model...")
        self.config = XttsConfig()
        self.config.load_json(xtts_config)
        
        self.model = Xtts.init_from_config(self.config)
        self.model.load_checkpoint(self.config, checkpoint_dir=_checkpoint_dir)
        if torch.cuda.is_available():
            self.model.cuda()

        # Compile replacements
        self.compiled_replacements = [
            (re.compile(rf"\b{re.escape(pattern)}\b"), repl)
            for pattern, repl in self.replacements
        ]
        log_info("Model loaded successfully.")
    
    def unload_model(self):
        log_info("Unloading TTS model...")
        try:
            if self.model:
                del self.model
                self.model = None
            if self.config:
                del self.config
                self.config = None

            self.compiled_replacements = []

            if torch.cuda.is_available():
                torch.cuda.empty_cache()

            log_info("Model unloaded successfully.")
        except Exception as e:
            log_error(f"Failed to unload model: {str(e)}")

    def close(self):
        """
        Đóng kết nối mô hình và giải phóng bộ nhớ.
        """
        if self.model:
            del self.model
            self.model = None
            gc.collect()  # thu gom bộ nhớ
            if torch.cuda.is_available():
                torch.cuda.empty_cache()

    def convert_number(self, text):
        digit_map = {
            "0": "không",
            "1": "một",
            "2": "hai",
            "3": "ba",
            "4": "bốn",
            "5": "năm",
            "6": "sáu",
            "7": "bảy",
            "8": "tám",
            "9": "chín"
        }
    
        def replace_digits(match):
            number = match.group()
            return ' '.join(digit_map[d] for d in number) # Dùng cách này thay vì dùng replace là vì nó có thể thay dược nhiều số liên tiếp

        # Tìm tất cả các nhóm số trong văn bản và thay thế
        return re.sub(r'\d+', replace_digits, text.lower())

    def normalize_text(self, text):
        text = self.convert_number(text)
        for pattern, repl in self.compiled_replacements:
            text = pattern.sub(repl, text)
        return text


    def generate(self, text, language=None, speaker_path=None):
        if len(text) < 2:
            return None, "Text quá ngắn"
        # elif len(text) > 255:
        #     return None, "Text quá dài"
        
        language = language or "vi"
        speaker_path = speaker_path or _voiceDefault
        
        try:
            log_info(f"Generating audio for text: {text}")
            if language not in self.config.languages:
                return None, f"🛑 Language '{language}' not supported"
            
            log_info("Starting to generate audio...")
            t0 = time.time()
            
            # Lấy embedding từ giọng mẫu
            log_info("Getting speaker embedding...")
            gpt_cond_latent, speaker_embedding = self.model.get_conditioning_latents(
                audio_path=speaker_path,
                gpt_cond_len=30,
                gpt_cond_chunk_len=4,
                max_ref_length=60,
            )

            # Xử lý dấu câu cho tiếng Việt hoặc đa ngôn ngữ
            log_info("Normalizing text...")
            text = re.sub(r"([^\x00-\x7F]|\w)(\.|\。|\?)", r"\1 \2\2", text)

            if language == "vi":
                text = self.normalize_text(text)
                log_info(f"Text format: {text}")

            # Sinh audio từ văn bản
            log_info("Generating audio...")
            out = self.model.inference(
                text,
                language,
                gpt_cond_latent,
                speaker_embedding,
                repetition_penalty=5.0,
                temperature=0.75,
                enable_text_splitting=True,
            )

            # Trả về dạng `BytesIO` buffer
            buffer = io.BytesIO()
            torchaudio.save(buffer, torch.tensor(out["wav"]).unsqueeze(0), 24000, format="wav")
            buffer.seek(0)
            buffer = buffer.read() 
            # with open("output.wav", "wb") as f:
            #     f.write(buffer)
            inference_time = round((time.time() - t0) * 1000)
            log_info(f"Audio generated in {inference_time} ms")
            return buffer, None  # ✅ Rõ ràng

        except Exception as e:
            print(f"Error: {str(e)}", flush=True)  # Thêm flush
            return None, str(e)
