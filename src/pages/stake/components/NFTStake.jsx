import { Box, Button, Card, CardMedia, Chip, MenuItem, Select, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import MultipleSelection from "./MultipleSelection"

const nftTypes = [
    { label: '铜', value: 1 },
    { label: '银', value: 2 },
    { label: '金', value: 3 },
    { label: '钻', value: 4 }
]

const nftIDs = [
    1100,
    1101,
    1102,
    1103,
    1104,
    11005,
    1106,
    11052,
    11051,
    11009,
];

const NFTStake = () => {

    const [selectedType, setSelectedType] = useState(1)
    const [selectedIDs, setSelectedIDs] = useState([])
    const navigate = useNavigate()
    const handleTypeChange = (e) => {
        setSelectedType(e.target.value)
    }

    const onNFTSelected = (selectedNFTIDs) => {
        setSelectedIDs(selectedNFTIDs)
    }

    const handleStakeClick = () => {
        // TODO: stake selected nfts
    }

    const handleStakeRecordClick = () => {
        navigate('/mynft/list', { 
            state: {
                type: 1
            }
        })
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', px: 6}}>
            <Box>
                <Card sx={{
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 180,
                    width: 150,
                    }}>
                    <CardMedia 
                        component={'img'}
                        sx={{
                            display: 'inline-block',
                            objectFit: 'cover',
                            height: 180,
                            width: 150,
                        }}
                        image={'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500'} />
                </Card>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography component={'span'} id="type-select-label" sx={{ mr: 1, color: '#333'}}>NFT类型:</Typography>
                <Select
                    labelId="type-select-label"
                    value={selectedType}
                    onChange={handleTypeChange}
                    sx={{minWidth: 140, height: 40}}
                    >
                        {nftTypes.map(type => {
                            return <MenuItem key={type.value} value={type.value} sx={{color: '#333', minWidth: 140}}>{ type.label }</MenuItem>
                        })}
                </Select>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography component={'span'} sx={{ mr: 1, color: '#333'}}>NFT编号:</Typography>
                <MultipleSelection nftIDs={nftIDs} onNFTSelected={onNFTSelected} />
            </Box>
            <Typography component={'div'} sx={{ color: '#333', alignSelf: 'flex-start', mt: 2, px: 1 }}>已选择编号:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignSelf: 'flex-start', gap: 0.5, px: 1, mt: 2 }}>
              {selectedIDs.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'space-between', alignItems: 'center', mt: 2, width: '100%' }}>
                <Typography component={'div'} sx={{ color: '#333'}}>每日产出:</Typography>
                <Typography component={'div'} sx={{ color: '#333'}}>12VSD</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'space-between', alignItems: 'center', mt: 2, py: 1, width: '100%' }}>
                <Button variant='contained' size="large" sx={{minWidth: 105}} onClick={handleStakeClick}>质押</Button>
                <Button variant='outlined' size="large" sx={{minWidth: 105}}  onClick={handleStakeRecordClick}>质押记录</Button>
            </Box>
        </Box>
    )
}

export default NFTStake