import { TextField } from "@mui/material";

interface Props {
    startPhrase: string;
    setStartPhrase: React.Dispatch<React.SetStateAction<string>>;
}

export default function CustomTextField({ startPhrase, setStartPhrase }: Props) {

    const handleStartPhraseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const startPhrase = event.target.value;
        setStartPhrase(startPhrase);
    }

    return (
        <TextField
            value={startPhrase}
            placeholder="Start phrase"
            variant="outlined"
            size="medium"
            sx={{
                width: 300,
                backgroundColor: "white",
                marginBottom: "20px"
            }}
            onChange={handleStartPhraseChange}
            inputProps={{
                maxLength: 50 // set the maximum length of the input
            }}
        />

    )
}
