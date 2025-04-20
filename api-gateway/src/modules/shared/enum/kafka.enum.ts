export enum KafkaTopic {
    UPLOAD_FILE_CREATE = 'upload.file.create',
    TTS_VOICE_CREATE = 'tts.voice.create',
    STT_TEXT_CREATE = 'stt.text.create',
}

export enum KafkaStep {
    INIT = 'init',
    GENERATE_FILE = 'generate_file',
    UPLOAD_FILE = 'upload_file',
    SAVE_TO_DB = 'save_to_db',
    MESSAGE = 'message'
  }
  