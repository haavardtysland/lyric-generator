from flask import Flask, request
import os
from model import LyricsGenerator
from scraper import Scraper

app = Flask(__name__)

@app.route('/pretrainedModels', methods=['GET'])
def get_pretrained_models():
    folder = "models"
    subfolders = [f.name for f in os.scandir(folder) if f.is_dir()]
    return subfolders

@app.route('/generate', methods=['POST'])
def generate_text():
    json = request.json
    artist_name = json['artistName']
    start = json['start']
    max_length = int(json['maxLength'])
    data_path = f"data/{artist_name}.txt"
    if not os.path.exists(data_path):
        #Websocekt tells client that it is scraping
        scraper = Scraper(artist_name)
        scraper.scrape()
    #Websocket tells client it is training the model or loading a pretrained one
    generator = LyricsGenerator(artist_name)
    #And generating text
    return generator.generate_text(start, max_length)


if __name__ == '__main__':
    app.run(port=5555)