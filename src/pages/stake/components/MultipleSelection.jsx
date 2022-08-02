import { useState } from 'react';
import { Typography, Checkbox, MenuItem } from '@mui/material';
import BootstrapTextField from "../../../widgets/textfield/BootstrapTextField"


const MultipleSelection = (props) => {
    const { nftIDs, onNFTSelected, selectedIDs } = props;
    const [selectedNumbers, setSelectedNumbers] = useState(selectedIDs);
    const [allSelected, setAllSelected] = useState(false)

    const handleChange = (event) => {
        const {target: { value },} = event;
        const nfts = typeof value === 'string' ? value.split(',') : value
        setSelectedNumbers(nfts);
        onNFTSelected(nfts)
    };

    const handleAllClick = () => {
        setAllSelected(prev => {
            if (prev) {
                setSelectedNumbers([])
                onNFTSelected([])
            } else {
                setSelectedNumbers(nftIDs)
                onNFTSelected(nftIDs)
            }
            return !prev
        })
    }

    return (
        <BootstrapTextField
            select
            value={selectedNumbers}
            onChange={handleChange}
            SelectProps={{
                multiple: true,
                renderValue: (selected) => {
                    if (selected.length === nftIDs.length) {
                        setAllSelected(true)
                        return '全部'
                    } else {
                        setAllSelected(false)
                    }
                    if (selected.length > 5) {
                        return '多个'
                    }
                    if (selected.length === 0) {
                        return '请选择'
                    }
                    return '#' + selected.join(', #')
                },
                sx: {
                    pr: 2
                },
                MenuProps: {
                    sx: {
                        maxHeight: '280px'
                    }
                }
            }}
            fullWidth
        >
            <MenuItem sx={{ color: '#333' }} onClick={handleAllClick}>
                <Checkbox checked={allSelected} />
                <Typography variant='inherit'  sx={{ color: '#333' }} >全部</Typography>
            </MenuItem>
            {nftIDs.map((id) => (
                <MenuItem key={id} value={id} sx={{ color: '#333' }}>
                    <Checkbox checked={selectedNumbers.indexOf(id) > -1 } />
                    <Typography variant='inherit'  sx={{ color: '#333' }} >#{id}</Typography>
                </MenuItem>
            ))}
        </BootstrapTextField>
    );
}

export default MultipleSelection
