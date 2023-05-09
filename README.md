# Lyric generator

Made by: Ole Løkken, Mathias Myrold & Håvard Tysland(XRJ9349)

## Content

- [Scraping](#scraping)
- [Model](#model)
- [Preprocessing of lyrics](#preprocessing-of-lyrics)
- [Lyric generation](#lyric-generation)
- [Frontend](#frontend)

## Scraping

Scraping the lyrics is an important part of the project, as this is what the models will be trained on. The scraping is done through [lyricsgenius](https://lyricsgenius.readthedocs.io/en/master/) which is a Python client for the [Genius.com API](https://docs.genius.com/).

Initially, a self-made scraper was coded by the team, but because of common web scraping issues like getting IP-blocked a library like lyricsgenius was used.

## Preprocessing of lyrics

The lyrics available through Genius.com requires some preprocessing to work with. For example, there are alot of instances of non-relevant text like above a verse to show what verse it is or who is singing it. An example from the song "Shape of You" by Ed Sheeran:

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
`
633ContributorsTranslationsРусскийTürkçeEspañolPolskiItalianoDeutschFrançaisAzərbaycanca / آذربايجانGod’s Plan Lyrics[Intro]
`<br><br>
which usually just shows the contributors and translations of a song. All preprocessing can also be viewed in the ``preprocess`` function under ``scraper.py``.

## Model

## Lyric Generation

## Frontend

The frontend is created with React using prebuilt components from Materiaul UI.
