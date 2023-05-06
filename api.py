from flask import Flask
import os

app = Flask(__name__)

@app.route('/pretrainedModels', methods=['GET'])
def get_pretrained_models():
    folder = "models"
    subfolders = [f.name for f in os.scandir(folder) if f.is_dir()]
    return subfolders

@app.route('/generate', methods=['POST'])
def get_pretrained_models():
    name = "artist_name"


if __name__ == '__main__':
    app.run(port=5555)