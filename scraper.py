import re

import lyricsgenius


class Scraper:
    def __init__(self, artist_name):
        self.artist_name = artist_name

    def scrape(self, max_songs=15):
        genius = lyricsgenius.Genius('l8-nnpE9RfPvXrIpXq1zhiO1SOdcwCD5m3sOUw9rZlrtWRY1f-9K4wD5tdWK2xN6')
        genius.timeout = 15
        artist = genius.search_artist(self.artist_name, max_songs=max_songs, sort='popularity')
        print(artist)
        songs = []
        for song in artist.songs:
            songs.append(self.preprocess(song.lyrics))
        return songs

    def preprocess(lyrics):
            song_lyrics =  re.sub(r'\[.*?\]', '', lyrics)
            song_lyrics_words = [word for word in song_lyrics.split() if not word.startswith('Contribut')]
            song_lyrics = ' '.join(song_lyrics_words)
            song_lyrics = song_lyrics.replace('You might also like', '')
            return song_lyrics
    
    def scrape_and_save(self, max_songs=15):
        songs = self.scrape(max_songs)
        with open(f'data/{self.artist_name}.txt', 'w') as file:
            for string in songs:
                file.write(string + '\n')
        return songs