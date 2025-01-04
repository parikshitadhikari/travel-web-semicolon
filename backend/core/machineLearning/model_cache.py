import os
from tf_keras.models import load_model
from django.conf import settings

class ModelCache:
    _model = None
    _model_path = os.path.join(settings.BASE_DIR, "core/machineLearning/model.h5")

    @classmethod
    def get_model(cls):
        if cls._model is None:
            cls._model = load_model(cls._model_path)
        return cls._model
