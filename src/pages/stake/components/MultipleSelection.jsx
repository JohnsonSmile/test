import { useState } from 'react';
import { Typography, Checkbox, Select, MenuItem } from '@mui/material';


const MultipleSelection = (props) => {
    const { nftIDs, onNFTSelected } = props;
    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const {target: { value },} = event;
        const nfts = typeof value === 'string' ? value.split(',') : value
        setPersonName(nfts);
        onNFTSelected(nfts)
    };

    return (
        <Select
            multiple
            value={personName}
            onChange={handleChange}
            renderValue={(selected) => selected.join(', ')}
            sx={{ width: 140, height: 40, color: '#333' }}
        >
            {nftIDs.map((id) => (
                <MenuItem key={id} value={id} sx={{ color: '#333' }}>
                    <Checkbox checked={personName.indexOf(id) > -1} />
                    <Typography variant='inherit'  sx={{ color: '#333' }} >#{id}</Typography>
                </MenuItem>
            ))}
        </Select>
    );
}

export default MultipleSelection
