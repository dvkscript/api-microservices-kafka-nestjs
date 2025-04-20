import os
import torch
from transformers import pipeline
import warnings
import gc
import io 
import base64
import json
import sys
import subprocess
import soundfile as sf
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_NAME = os.path.join(BASE_DIR, "whisper-large-v3-turbo")



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

# Tắt cảnh báo FutureWarning
warnings.filterwarnings("ignore", category=FutureWarning)
device = 0 if torch.cuda.is_available() else "cpu"

class SpeechToText:
    def __init__(self):
        self.compiled_replacements = []  
        self.model = None

    def load_model(self):
        log_info("Loading STT model...")
        
        self.model = pipeline(
            task="automatic-speech-recognition",
            model=MODEL_NAME,
            device=device,
        )

        log_info("Model loaded successfully.")

    def unload_model(self):
        log_info("Unloading STT model...")
        try:
            if self.model:
                del self.model
                self.model = None
            self.compiled_replacements = []

            if torch.cuda.is_available():
                torch.cuda.empty_cache()

            log_info("STT model unloaded successfully.")
        except Exception as e:
            log_error(f"Failed to unload STT model: {str(e)}")

    def generate(self, file_base64, format = None, language = None, task= None):
        language = language or "vi"
        task = task or "transcribe"
        format = format or "wav"

        try:
            # Sinh Text từ audio
            log_info("Generating text...")

            audio_bytes = base64.b64decode(file_base64)
             # Chuyển đổi base64 audio -> mono WAV 16kHz qua ffmpeg (stream)
            process = subprocess.run(
                [
                    "ffmpeg", "-i", "pipe:0",
                    "-ac", "1",               # mono
                    "-ar", "16000",          # 16kHz
                    "-f", format,
                    "pipe:1"
                ],
                input=audio_bytes,
                stdout=subprocess.PIPE,
                stderr=subprocess.DEVNULL
            )

            wav_bytes = process.stdout
            buffer = io.BytesIO(wav_bytes)

             # Convert từ WAV (BytesIO) → numpy array
            audio_array, samplerate = sf.read(buffer)

            if len(audio_array.shape) == 2:
                audio_array = audio_array.mean(axis=1)  # convert stereo to mono

            # Ensure it's float32
            audio_array = audio_array.astype(np.float32)


            text = self.model(
                inputs=audio_array,
                batch_size=8, 
                return_timestamps=True,
                generate_kwargs={"language": language, "task": task}
            )
            return text, None

        except Exception as e:
            print(f"Error: {str(e)}", flush=True)  # Thêm flush
            return None, str(e)