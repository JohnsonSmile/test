import { Button, Card, CardMedia, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const nftInfos = [
    {
        image: 'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
        amount: 1234,
        type: 1,
        title: '铜'
    },{
        image: 'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
        amount: 1234,
        type: 2,
        title: '银'
    },{
        image: 'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
        amount: 1234,
        type: 3,
        title: '金'
    },{
        image: 'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
        amount: 1234,
        type: 4,
        title: '钻'
    },
]


const MyNFTPage = () => {

    const navigate = useNavigate()
    const handleDetailClick = (nftinfo) => {
        navigate(`/mynft/${nftinfo.type}`)
    }

    return (
        <Grid container columns={12} sx={{
            px: 2,
            py: 4,
            background: '#fff',
        }}>
        {nftInfos.map((nftinfo, index) => (
            <Grid item xs={6} key={index} sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2, py: 2}}>
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
                        image={nftinfo.image } />
                </Card>
                <Typography variant={'subtitle2'} color='InfoText' sx={{mt: 1}} >{nftinfo.title}{nftinfo.amount}个</Typography>
                <Button variant='contained' onClick={() => { handleDetailClick(nftinfo) }}>查看详情</Button>
            </Grid>
        ))}
        </Grid>
    )
}

export default MyNFTPage