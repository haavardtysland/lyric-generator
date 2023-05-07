import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { FidgetSpinner } from 'react-loader-spinner';
import useSWR from 'swr';
import './App.css';
import CustomAutocomplete from './components/CustomAutocomplete';
import CustomTextField from './components/CustomTextField';
import LyricsPaper from './components/LyricsPaper';




const App = () => {
  const [models, setModels] = useState<string[]>([]);
  const [lyrics, setLyrics] = useState<string[]>([]);
  const [startPhrase, setStartPhrase] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [isLoadingLyrics, setIsLoadingLyrics] = useState<boolean>(false);
  const { data, error } = useSWR('http://localhost:5555/generate');

  const onGenerateClick = async () => {
    if (selectedModel !== '') {
      setIsLoadingLyrics(true);
      const response = await fetch('http://localhost:5555/generate', {
        method: 'POST',
        body: JSON.stringify({ artistName: selectedModel, start: startPhrase, maxLength: 450 }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const newData = await response.json();
      setLyrics(newData);
      //mutate('http://localhost:5555/generate', { data: [...data, newData] }, false);
      setIsLoadingLyrics(false);
    } else {
      console.log('No model selected')
    }
  }



  return (
    <div className="App" style={{ marginBottom: "20px" }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: 'Chilanka, cursive',
          fontWeight: 'bold',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          textAlign: 'center',
          marginTop: '50px',
        }}
      >
        Lyric Generator
      </Typography>
      <CustomAutocomplete models={models} setModels={setModels} setSelectedModel={setSelectedModel} isLoading={isLoadingLyrics} />
      <CustomTextField startPhrase={startPhrase} setStartPhrase={setStartPhrase} isLoading={isLoadingLyrics} />
      <Button
        disabled={selectedModel === '' || startPhrase === ''}
        variant="contained"

        sx={{
          fontFamily: 'Chilanka, cursive',
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          width: 300, height: 56, backgroundColor: "#A9D0F5", '&:hover': {
            backgroundColor: "#F0E68C",
          },
          '&:disabled': {
            backgroundColor: "#A9D0F5",
          },
          marginBottom: "20px"
        }}
        onClick={onGenerateClick}
      >
        Generate lyrics
      </Button>
      {!isLoadingLyrics ?
        <LyricsPaper lyrics={lyrics} />
        : <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={['#004e92 ', "#004e92", '#004e92 ']}
          backgroundColor="#A9D0F5"
        />}
    </div >
  );
}

export default App;
