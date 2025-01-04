import os

from django.conf import settings

from core.machineLearning.is_management_command import is_management_command

class TokenizerCache:
    _tokenizer = None
    _data_path = os.path.join(settings.BASE_DIR, "core/machineLearning/output.txt")

    @classmethod
    def get_tokenizer(cls):
        pass
    #     if is_management_command():
    #         return None  # Skip tokenizer loading during management commands
    #     from tf_keras.preprocessing.text import Tokenizer
    #     if cls._tokenizer is None:
    #         with open(cls._data_path, "r") as file:
    #             data = [line.strip() for line in file]
    #         tokenizer = Tokenizer(num_words=5000)
    #         tokenizer.fit_on_texts(data)
    #         cls._tokenizer = tokenizer
    #     return cls._tokenizer
