# Lyric generator

Made by: Ole Løkken, Mathias Myrold(VVF8792) & Håvard Tysland(XRJ9349)

## Content

- [Scraping](#scraping)
- [Model](#model)
- [Preprocessing of lyrics](#preprocessing-of-lyrics)
- [Lyric generation](#lyric-generation)
- [User Interface](#user-interface-and-API)
- [Running the application](#running-the-application)

## Scraping

Scraping the lyrics is an important part of the project, as this is what the models will be trained on. The scraping is done through [lyricsgenius](https://lyricsgenius.readthedocs.io/en/master/) which is a Python client for the [Genius.com API](https://docs.genius.com/).

Initially, a self-made scraper was coded by the team, but because of common web scraping issues like getting IP-blocked a library like lyricsgenius was used.

## Preprocessing of lyrics

The lyrics available through Genius.com requires some preprocessing to work with. For example, there are alot of instances of irrelevant text like above a verse to show what verse it is or who is singing it. An example from the song "Shape of You" by Ed Sheeran:

`[Verse 1]`<br>
A club isn't the best place to find a lover<br>
So the bar is where I go (Mm)<br>

or from the song "DNA." by Kendrick Lamar:

`[Bridge: Kendrick Lamar & Geraldo Rivera]`<br>
I-I got loyalty, got royalty inside my DNA<br>
This is why I say that hip hop has done<br>
more damage to young African Americans<br>

To handle this all words that start with '[' and end with ']' has been removed as part of the preprocessing proccess.

Other things that has been done is removing reocurring sentences like `"You might also like"` and removing lines like this: <br><br>
`633ContributorsTranslationsРусскийTürkçeEspañolPolskiItalianoDeutschFrançaisAzərbaycanca / آذربايجانGod’s Plan Lyrics[Intro]`<br><br>
which usually just shows the contributors and translations of a song. All preprocessing can also be viewed in the `preprocess` function under `scraper.py`.

## Model

## Lyric Generation

Lyric is generated by the user selecting an artist, a starting phrase(prompt) and the max length of the lyrics to be generated. The prompt is tokenized and put as input into the generate() method. The total output lyrics is then decoded and presented in the UI. The lyric generation has a lot of parameters that can be finetuned and customized to the desire of the user. This includes getting multiple variations of a lyric from the prompt, avoiding repetitive lyrics, adjusting the randomnness of the generated lyrics. The end result of the parameters will also have an impact of the speed of which the lyric generation is done.

## User Interface and API

The UI is written in TypeScript with [React](https://react.dev/) using prebuilt components from [Material UI](https://mui.com/). The API is created using the framework [Flask](https://flask.palletsprojects.com/en/2.3.x/) in Python. In the UI the user has the options of choosing artist or groups that already have a trained model or genererate a new one by entering a new artist name. When choosing an already trained model the system will after a while display a lyric from that artist/group. When submitting a new artist/group the system will start scraping songs from the Genius API, storing the lyrics as a .txt file and use that lyric to train a new model. The UI also has an input field for a start phrase for the song and a slider to adjust how many words the song should contain.

## Running the application

1. Install neccesary dependencies (`npm install` in client folder and `pip/pip3 install -ro requirements.txt` in root folder ).
2. To run the lyric generating API run `python3 api.py` in the root of the project.
3. To run the frontend navigate to the client folder and run `npm start`.

Before runnning the application you can also also download the pre-trained models from [this link](https://share.internxt.com/d/sh/folder/4726d0ca9afb5d13d461/54c9cf90f09febabded569daf89837be8db51cd2eb6214c58837af70c8dca049). After downloading them the models should be put in a folder named "models" in the root of the project.
