import os
from django.conf import settings
from core.machineLearning.is_management_command import is_management_command

class ModelCache:
    _model = None
    _model_path = os.path.join(settings.BASE_DIR, "core/machineLearning/model.h5")

    @classmethod
    def get_model(cls):
        if is_management_command():
            return None  # Skip model loading during management commands
        from tf_keras.models import load_model
        from tf_keras.preprocessing.text import Tokenizer
        if cls._model is None:
            cls._model = load_model(cls._model_path)
        return cls._model


