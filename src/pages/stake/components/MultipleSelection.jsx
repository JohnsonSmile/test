import { useState } from 'react';
import { Typography, Checkbox, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetSelectedIDs, getSelectedIDs } from '../../../redux/reducers/page';


const BootstrapSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        fontSize: '14px',
        height: '48px',
        border: '1px solid #F2F2F2'
    },
    '& .MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
    },
}));


const MultipleSelection = (props) => {
    const { nftIDs, onNFTSelected } = props;
    const selectedIDs = useSelector(getSelectedIDs)
    const dispatch = useDispatch()
    const [allSelected, setAllSelected] = useState(false)

    const handleChange = (event) => {
        const {target: { value },} = event;
        const nfts = typeof value === 'string' ? value.split(',') : value
        dispatch(asyncSetSelectedIDs(nfts))
        onNFTSelected(nfts)
    };

    const handleAllClick = () => {
        setAllSelected(prev => {
            if (prev) {
                dispatch(asyncSetSelectedIDs([]))
                onNFTSelected([])
            } else {
                dispatch(asyncSetSelectedIDs(nftIDs))
                onNFTSelected(nftIDs)
            }
            return !prev
        })
    }

    return (
        <BootstrapSelect
            multiple
            value={selectedIDs}
            onChange={handleChange}
            renderValue={(selected) => {
                console.log(props.nftIDs)
                if (nftIDs.length === 0 || selected.length === 0 || selectedIDs.length === 0) {
                    return '请选择'
                }
                if (selected.length === nftIDs.length) {
                    setAllSelected(true)
                    return '全部'
                } else {
                    setAllSelected(false)
                }
                if (selected.length > 5) {
                    return '多个'
                }
                return '#' + selected.join(', #')
            }}
            sx={{pr: 2}}
            MenuProps= {{sx: { maxHeight: '280px' }}}
            fullWidth
        >
            <MenuItem sx={{ color: '#333' }} onClick={handleAllClick}>
                <Checkbox checked={allSelected} />
                <Typography variant='inherit'  sx={{ color: '#333' }} >全部</Typography>
            </MenuItem>
            {nftIDs.map((id) => (
                <MenuItem key={id} value={id} sx={{ color: '#333' }}>
                    <Checkbox checked={selectedIDs.indexOf(id) > -1 } />
                    <Typography variant='inherit'  sx={{ color: '#333' }} >#{id}</Typography>
                </MenuItem>
            ))}
        </BootstrapSelect>
    );
}

export default MultipleSelection
