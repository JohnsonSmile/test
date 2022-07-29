import { Box, CardMedia, Fade, Grid, Typography } from "@mui/material"
import { ReactComponent as ArrowIcon } from "../../../assets/icon/mynft/arrow.svg"
import DiamondNFTImage from "../../../assets/images/mynft/diamond_nft.png"
import GoldNFTImage from "../../../assets/images/mynft/gold_nft.png"
import SilverNFTImage from "../../../assets/images/mynft/silver_nft.png"
import CopperNFTImage from "../../../assets/images/mynft/copper_nft.png"

const NFTImages = [CopperNFTImage, SilverNFTImage, GoldNFTImage, DiamondNFTImage]

const TypeSelect = (props) => {
    const {title, type, setType, types, open, onTypeChange, onSelectClick } = props

    const handleTypeChange = (v) => {
        if (type === v) {
            setType(0)
            onTypeChange(0)
            return
        }
        setType(v)
        onTypeChange(v)
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                ml: 2, mr: 1, height: '48px', border: '1px solid #F2F2F2', borderRadius: '30px', cursor: 'pointer'}}
                onClick={onSelectClick}>
                <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#333' }}>{title} {types[type].label}</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 0.5, transform: open ? '' :'rotate(180deg)'}}>
                    <ArrowIcon />
                </Box>
            </Box>
            <Box sx={{position: 'relative', zIndex: 1, display: open ? 'block' : 'none'}}>
                <Fade in={open}>
                    <Box sx={{ position: 'absolute', width: 'calc(100vw - 30px)', height: 'calc(100vh - 106px)', top: '15px', mx: '15px'}}>
                        <Box sx={{backgroundColor: '#FFF', borderRadius: '20px', boxShadow: '0px 6px 20px rgba(20, 24, 28, 0.1)'}}>
                            <Grid container columns={12} sx={{ p: 2 }}>
                                {types.filter(value => value.value !== 0).map(t => {
                                    return <Grid key={t.value} item xs={6} sx={{ p: 0.5 }}>
                                        <Box>
                                            <Box sx={{ cursor: 'pointer', border: type === t.value ? '1px solid rgba(66, 99, 235, 0.5)' : '1px solid #F2F2F2', borderRadius: '20px', height: '50px', lineHeight: '50px',
                                                display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 0.5,
                                                background: type === t.value ? 'rgba(66, 99, 235, 0.06)' : '#FFF', boxShadow: '0px 10px 50px rgba(242, 242, 242, 0.6)'}}
                                                onClick={() => handleTypeChange(t.value)}>
                                                <CardMedia component={"img"} src={NFTImages[t.value - 1]} sx={{ width: '30px', height: '30px', mr: 0.5 }} />
                                                <Box sx={{ color: '#333', fontSize: '16px', fontWeight: 700 }}>{ t.label }</Box>
                                            </Box>
                                        </Box>
                                    </Grid>})
                                }
                            </Grid>
                        </Box>
                    </Box>
                </Fade>
            </Box>
            
        </Box>
    )
}

export default TypeSelect