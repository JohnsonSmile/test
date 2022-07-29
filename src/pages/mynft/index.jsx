import { Box, Card, CardMedia, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import DiamondNFTImage from "../../assets/images/mynft/diamond_nft.png"
import GoldNFTImage from "../../assets/images/mynft/gold_nft.png"
import SilverNFTImage from "../../assets/images/mynft/silver_nft.png"
import CopperNFTImage from "../../assets/images/mynft/copper_nft.png"

const nftInfos = [
    {
        image: CopperNFTImage,
        amount: 1234,
        type: 1,
        title: '铜'
    },{
        image: SilverNFTImage,
        amount: 1234,
        type: 2,
        title: '银'
    },{
        image: GoldNFTImage,
        amount: 1234,
        type: 3,
        title: '金'
    },{
        image: DiamondNFTImage,
        amount: 1234,
        type: 4,
        title: '钻'
    },
]


const MyNFTPage = () => {

    const navigate = useNavigate()
    const handleDetailClick = (nftinfo) => {
        navigate('/mynft/list', {
            state: {
                type: nftinfo.type,
            }
        })
    }

    return (
        <Grid container columns={12} sx={{
            py: 4,
            background: '#fff',
        }}>
        {nftInfos.map((nftinfo, index) => (
            <Grid item xs={6} key={index} sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2, py: 1}}>
                <Card sx={{
                        display: "flex",
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        height: {xs: 240,sm:250},
                        width: {xs:170,sm:180},
                        border: '1px solid #F2F2F2',
                        boxShadow: '0px 10px 50px rgba(242, 242, 242, 0.6)', 
                        borderRadius: '20px',
                        gap: 0.5,
                        cursor: 'pointer'
                    }} onClick={() => { handleDetailClick(nftinfo) }}>
                        <Box sx={{ 
                            height: {xs: 170, sm: 180},
                            width: {xs: 170, sm:180},
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <CardMedia 
                                component={'img'}
                                sx={{
                                    display: 'inline-block',
                                    objectFit: 'cover',
                                    height: 120,
                                    width: 120,
                                }}
                                image={nftinfo.image } />
                        </Box>
                    <Typography sx={{mt: 0.5, color: '#333', fontSize: '16px', fontWeight: 700 }} >{nftinfo.title} {nftinfo.amount}个</Typography>
                    <Box sx={{ cursor: 'pointer', color: '#7E8186', fontSize: '12px'}}>{'查看详情 >'}</Box>
                </Card>
            </Grid>
        ))}
        </Grid>
    )
}

export default MyNFTPage