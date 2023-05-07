import { Autocomplete, AutocompleteChangeReason, TextField } from '@mui/material';
import { SyntheticEvent, useEffect } from "react";
import useSWR from 'swr';



interface Props {
    models: string[];
    setModels: React.Dispatch<React.SetStateAction<string[]>>;
    handleAutocompleteChange: (event: SyntheticEvent<Element, Event>, value: string | null, reason: AutocompleteChangeReason) => void;
    isLoading: boolean;
}

const CustomAutocomplete = ({ models, setModels, handleAutocompleteChange, isLoading }: Props) => {
    const { data, error } = useSWR('http://localhost:5555/pretrainedModels', url =>
        fetch(url).then(res => res.json())
    );

    useEffect(() => {
        if (data) {
            setModels(data);
        }
    }, [data, setModels])

    if (!data) {
        return <Autocomplete
            loading={true}
            options={models}
            multiple={false}
            sx={{
                width: 300, backgroundColor: "white",
                marginBottom: "20px"
            }}
            onChange={handleAutocompleteChange}
            renderInput={(params) => <TextField {...params}
                sx={{ "& .MuiInputBase-root": { fontSize: 16 } }}
            />}
        />
    }

    return (
        <Autocomplete
            disabled={isLoading}
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
    )
}

export default CustomAutocomplete;