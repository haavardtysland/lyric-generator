import { Autocomplete, AutocompleteChangeReason, Box, Button, Paper, TextField, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import './App.css';


const App = () => {
  const models = ['J. Cole', 'Kendrick Lamar', 'The Beatles'];
  const [selectedModel, setSelectedModel] = useState<string>('');

  const onGenerateClick = () => {
    if (selectedModel !== '') {
      console.log(selectedModel)
    } else {
      console.log('No model selected')
    }
  }

  const handleAutocompleteChange = (event: SyntheticEvent<Element, Event>, value: string | null, reason: AutocompleteChangeReason) => {
    console.log(reason);
    if (reason === 'selectOption' && value) {
      setSelectedModel(value)
    } else if (reason === 'clear') {
      setSelectedModel('');
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
      <Autocomplete
        disablePortal
        options={models}
        multiple={false}
        sx={{
          width: 300, backgroundColor: "white",
          marginBottom: "20px"
        }}
        onChange={handleAutocompleteChange}
        renderInput={(params) => <TextField {...params}
          sx={{ "& .MuiInputBase-root": { fontSize: 16 } }}
          placeholder="Artist" />}
      />

      <Button
        variant="contained"

        sx={{
          fontFamily: 'Chilanka, cursive',
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          width: 300, height: 56, backgroundColor: "#A9D0F5", '&:hover': {
            backgroundColor: "#F0E68C",
          },
          marginBottom: "20px"
        }}
        onClick={onGenerateClick}
      >
        Generate lyrics
      </Button>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          '& > :not(style)': {
            m: 1,
            width: '60%',
          },
        }}
      >
        <Paper sx={{
          backgroundColor: "#A9D0F5",
          padding: '2%',
        }} elevation={3}>
          <Typography variant="body1">This is where the lyrics will be, This is where the lyrics will beThis is where the lyrics will beThis is where the lyrics will beThis is where the lyrics will beThis is where the lyrics will beThis is where the lyrics will beThis is where the lyrics will beThis is where the lyrics will beThis is where the lyrics will beThis is where the lyrics will beThis is where the lyrics will beThis is where the lyrics will beThis is where the lyrics will be</Typography>
        </Paper>
      </Box>
    </div>
  );
}

export default App;
