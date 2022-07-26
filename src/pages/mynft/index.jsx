import { Box, Card, CardMedia, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import NFTCardImage from "../../assets/images/mynft/nftcard.png"

const nftInfos = [
    {
        image: NFTCardImage,
        amount: 1234,
        type: 1,
        title: '铜'
    },{
        image: NFTCardImage,
        amount: 1234,
        type: 2,
        title: '银'
    },{
        image: NFTCardImage,
        amount: 1234,
        type: 3,
        title: '金'
    },{
        image: NFTCardImage,
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
                        gap: 0.5
                    }}>
                    <CardMedia 
                        component={'img'}
                        sx={{
                            display: 'inline-block',
                            objectFit: 'cover',
                            height: {xs: 170, sm: 180},
                            width: {xs: 170, sm:180},
                        }}
                        image={nftinfo.image } />
                    <Typography sx={{mt: 0.5, color: '#333', fontSize: '16px', fontWeight: 700 }} >{nftinfo.title} {nftinfo.amount}个</Typography>
                    <Box sx={{ cursor: 'pointer', color: '#7E8186', fontSize: '12px'}} onClick={() => { handleDetailClick(nftinfo) }}>{'查看详情 >'}</Box>
                </Card>
            </Grid>
        ))}
        </Grid>
    )
}

export default MyNFTPage