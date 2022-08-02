import { Box, Card, CardMedia, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import DiamondNFTImage from "../../assets/images/mynft/diamond_nft.png"
import GoldNFTImage from "../../assets/images/mynft/gold_nft.png"
import SilverNFTImage from "../../assets/images/mynft/silver_nft.png"
import CopperNFTImage from "../../assets/images/mynft/copper_nft.png"
import { useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { getUserStakedTokenIDsByPage } from "../../clients/socialNFT"
import { apiPostGetNFTInfosByIDs } from "../../http/api"



const MyNFTPage = () => {

    const navigate = useNavigate()
    const { account } = useWeb3React()
    const [copperNftInfos, setCopperNftInfos] = useState([])
    const [silverNftInfos, setSilverNftInfos] = useState([])
    const [goldNftInfos, setGoldNftInfos] = useState([])
    const [diamondNftInfos, setDiamondNftInfos] = useState([])
    const handleDetailClick = (quality) => {
        navigate('/mynft/list', {
            state: {
                type: quality,
            }
        })
    }
    const initialInfos = async (account) => {
        // get all nfts not listed with type
        const pageSize = 100
        var index = 0
        var resp = []
        var res = await getUserStakedTokenIDsByPage(account, index, pageSize)
        resp.push(...res)
        while (res.length === 100) {
            index = pageSize * (index + 1)
            res = await getUserStakedTokenIDsByPage(account, index, pageSize)
            resp.push(...res)
        }
        console.log(resp)
        // resp = resp.filter(nft => {
        //     return !nft.staking
        // })
        const tokenIDS = resp.map(nft => nft.tokenId.toNumber())
        console.log(tokenIDS)

        // get nft infos from backend
        const nftInfoResp = await apiPostGetNFTInfosByIDs(tokenIDS)
        console.log(nftInfoResp)
        if (nftInfoResp.code === 200) {
            const copperInfos = nftInfoResp.result.filter(nft => {
                return nft.quality === 1
            })
            console.log("copperInfos", copperInfos)
            setCopperNftInfos(copperInfos)
            const silverInfos = nftInfoResp.result.filter(nft => {
                return nft.quality === 2
            })
            console.log("silverInfos", silverInfos)
            setSilverNftInfos(silverInfos)
            const goldInfos = nftInfoResp.result.filter(nft => {
                return nft.quality === 3
            })
            setGoldNftInfos(goldInfos)
            console.log("goldInfos", goldInfos)
            const diamondInfos = nftInfoResp.result.filter(nft => {
                return nft.quality === 4
            })
            setDiamondNftInfos(diamondInfos)
            console.log("diamondInfos", diamondInfos)
        }
    }
    useEffect(() => {
        if (account) {
            initialInfos(account)
        }
    }, [account])

    return (
        <Grid container columns={12} sx={{
            py: 4,
            background: '#fff',
        }}>
            <Grid item xs={6} sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2, py: 1}}>
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
                    }} onClick={() => { handleDetailClick(1) }}>
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
                                image={CopperNFTImage } />
                        </Box>
                    <Typography sx={{mt: 0.5, color: '#333', fontSize: '16px', fontWeight: 700 }} >铜 {copperNftInfos.length}个</Typography>
                    <Box sx={{ cursor: 'pointer', color: '#7E8186', fontSize: '12px'}}>{'查看详情 >'}</Box>
                </Card>
            </Grid>
            <Grid item xs={6} sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2, py: 1}}>
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
                    }} onClick={() => { handleDetailClick(2) }}>
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
                                image={SilverNFTImage } />
                        </Box>
                    <Typography sx={{mt: 0.5, color: '#333', fontSize: '16px', fontWeight: 700 }} >银 {silverNftInfos.length}个</Typography>
                    <Box sx={{ cursor: 'pointer', color: '#7E8186', fontSize: '12px'}}>{'查看详情 >'}</Box>
                </Card>
            </Grid>
            <Grid item xs={6} sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2, py: 1}}>
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
                    }} onClick={() => { handleDetailClick(3) }}>
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
                                image={ GoldNFTImage } />
                        </Box>
                    <Typography sx={{mt: 0.5, color: '#333', fontSize: '16px', fontWeight: 700 }} >金 {goldNftInfos.length}个</Typography>
                    <Box sx={{ cursor: 'pointer', color: '#7E8186', fontSize: '12px'}}>{'查看详情 >'}</Box>
                </Card>
            </Grid>
            <Grid item xs={6} sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2, py: 1}}>
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
                    }} onClick={() => { handleDetailClick(4) }}>
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
                                image={ DiamondNFTImage } />
                        </Box>
                    <Typography sx={{mt: 0.5, color: '#333', fontSize: '16px', fontWeight: 700 }} >钻 {diamondNftInfos.length}个</Typography>
                    <Box sx={{ cursor: 'pointer', color: '#7E8186', fontSize: '12px'}}>{'查看详情 >'}</Box>
                </Card>
            </Grid>
        </Grid>
    )
}

export default MyNFTPage