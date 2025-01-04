import os
from tf_keras.preprocessing.text import Tokenizer
from django.conf import settings

class TokenizerCache:
    _tokenizer = None
    _data_path = os.path.join(settings.BASE_DIR, "core/machineLearning/output.txt")

    @classmethod
    def get_tokenizer(cls):
        if cls._tokenizer is None:
            with open(cls._data_path, "r") as file:
                data = [line.strip() for line in file]
            tokenizer = Tokenizer(num_words=5000)
            tokenizer.fit_on_texts(data)
            cls._tokenizer = tokenizer
        return cls._tokenizer
