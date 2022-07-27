import { Box, CardMedia, InputAdornment, MenuItem, TextField, Typography } from "@mui/material"
import { styled } from "@mui/styles";
import { useState } from "react"
import NFTImage from "../../assets/images/nftlist/nft.png"



const nftTypes = [
    { label: '全部', value: 0 },
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

const BootstrapTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        fontSize: '14px',
    },
    '& .MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
    },
}));


const NFTListingPage = () => {
    const [currentType, setCurrentType] = useState(0)
    const [currentNumber, setCurrentNumber] = useState(0)
    const [currentPrice, setCurrentPrice] = useState(0)
    const [saleTime, setSaleTime] = useState('')

    const handleTypeChange = (e) => {
        setCurrentType(e.target.value)
    }

    const handleNumberChange = (e) => {
        setCurrentNumber(e.target.value)
    }

    const handlePriceChange = (e) => {
        setCurrentPrice(e.target.value)
    }

    const handleSaleTimeChange = (e) => {
        console.log(e.target.value)
        setSaleTime(e.target.value)
    }

    const handleListingClick = () => {
        // TODO: listing item
        console.log('listing item')
    }

    return (
        <Box sx={{backgroundColor: '#FFF'}}>
            <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 3 }}>
                <Box component={'label'} for="listing-type-select" sx={{fontSize: '14px', fontWeight: 600}}>NFT类型</Box>
                <BootstrapTextField
                    id="listing-type-select"
                    select
                    value={currentType}
                    onChange={handleTypeChange}
                    fullWidth
                    >
                    {nftTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value} sx={{ display: 'flex', flexDirection: 'row',}}>
                            <CardMedia component="img" image={NFTImage} sx={{ width: 25, height: 25 }}/>
                            <Typography component={'span'} sx={{ color: '#333', fontSize: '14px', ml: 0.5}}>
                                {type.label}
                            </Typography>
                        </MenuItem>
                    ))}
                </BootstrapTextField>
            </Box>
            <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 3 }}>
                <Box component={'label'} for="listing-number-select" sx={{fontSize: '14px', fontWeight: 600}}>NFT编号</Box>
                <BootstrapTextField
                    id="listing-number-select"
                    select
                    value={currentNumber}
                    onChange={handleNumberChange}
                    fullWidth
                    SelectProps={{
                        renderValue: (selected) => {
                            console.log(selected)
                            if (selected === 0) {
                              return (<Typography component={'span'} sx={{ color: '#7E8186', fontSize: '14px', ml: 0.5}}>
                                    请选择你的NFT编号
                                </Typography>)
                            }
                            return (<Typography component={'span'} sx={{ color: '#333', fontSize: '14px', ml: 0.5}}>
                                        {selected}
                                    </Typography>)
                        },
                        MenuProps: {
                            sx: {
                                maxHeight: '280px'
                            }
                        }
                    }}
                    >
                    {nftIDs.map((id) => (
                        <MenuItem key={id} value={id} sx={{ display: 'flex', flexDirection: 'row',}}>
                            <Typography component={'span'} sx={{ color: '#333', fontSize: '14px', ml: 0.5}}>
                                {id}
                            </Typography>
                        </MenuItem>
                    ))}
                </BootstrapTextField>
            </Box>
            <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 3 }}>
                <Box component={'label'} for="listing-price" sx={{fontSize: '14px', fontWeight: 600}}>卖出价格</Box>
                <BootstrapTextField
                    id="listing-price"
                    type={'number'}
                    value={currentPrice}
                    onChange={handlePriceChange}
                    fullWidth
                    placeholder="输入卖出价格"
                    >
                </BootstrapTextField>
            </Box>
            <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 3 }}>
                <Box component={'label'} for="listing-time" sx={{fontSize: '14px', fontWeight: 600}}>出售时间</Box>
                <BootstrapTextField
                    id="listing-time"
                    type={'time'}
                    value={saleTime}
                    onChange={handleSaleTimeChange}
                    fullWidth
                    placeholder="设置出售时间"
                    >
                </BootstrapTextField>
            </Box>
            <Box sx={{ mx: 2, mt: 5, lineHeight: '56px', color: '#FFF', fontWeight: 600, backgroundColor: '#4263EB', borderRadius: '12px', cursor: 'pointer'}}
                onClick={handleListingClick}>
                上架出售
            </Box>
        </Box>
    )
}

export default NFTListingPage