import { Box, Card, CardMedia, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import DiamondNFTImage from "../../assets/images/mynft/diamond_nft.png"
import GoldNFTImage from "../../assets/images/mynft/gold_nft.png"
import SilverNFTImage from "../../assets/images/mynft/silver_nft.png"
import CopperNFTImage from "../../assets/images/mynft/copper_nft.png"
import { useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { getUserOwn, getUserOwnNum } from "../../clients/valuebleNFT"
import { useDispatch, useSelector } from "react-redux"
import { asyncSetMyNft, getMyNft } from "../../redux/reducers/page"



const MyNFTPage = () => {

    const navigate = useNavigate()
    const { account } = useWeb3React()
    // const [copperNftInfos, setCopperNftInfos] = useState([])
    // const [silverNftInfos, setSilverNftInfos] = useState([])
    // const [goldNftInfos, setGoldNftInfos] = useState([])
    // const [diamondNftInfos, setDiamondNftInfos] = useState([])
    const mynftState = useSelector(getMyNft)
    const dispatch = useDispatch()
    const handleDetailClick = (quality) => {
        navigate('/mynft/list', {
            state: {
                type: quality,
                status: 0
            }
        })
    }
    const initialInfos = async (account) => {
        // get all nfts not listed with type
        const amount = await getUserOwnNum(account)
        const pageSize = 100
        var index = 0
        var resp = []
        var res = await getUserOwn(account, index, pageSize)
        resp.push(...res)
        while (resp.length === amount) {
            index = pageSize * (index + 1)
            res = await getUserOwn(account, index, pageSize)
            resp.push(...res)
        }
        console.log(resp)
        const tokenInfos = resp.map(res => {
            return {
                token_id: res.tokenId.toNumber(),
                quality: res.tokenQuality.toNumber(),
                isStaked: res.isStaked,
            }
        })
        console.log(tokenInfos)

        const copperInfos = tokenInfos.filter(nft => {
            return nft.quality === 1
        })
        console.log("copperInfos", copperInfos)
        const silverInfos = tokenInfos.filter(nft => {
            return nft.quality === 2
        })
        console.log("silverInfos", silverInfos)
        const goldInfos = tokenInfos.filter(nft => {
            return nft.quality === 3
        })
        console.log("goldInfos", goldInfos)
        const diamondInfos = tokenInfos.filter(nft => {
            return nft.quality === 4
        })
        console.log("diamondInfos", diamondInfos)
        dispatch(asyncSetMyNft({
            copperNftInfos: copperInfos,
            silverNftInfos: silverInfos,
            goldNftInfos: goldInfos,
            diamondNftInfos: diamondInfos,
        }))

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
                    <Typography sx={{mt: 0.5, color: '#333', fontSize: '16px', fontWeight: 700 }} >??? {mynftState.copperNftInfos.length}???</Typography>
                    <Box sx={{ cursor: 'pointer', color: '#7E8186', fontSize: '12px'}}>{'???????????? >'}</Box>
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
                    <Typography sx={{mt: 0.5, color: '#333', fontSize: '16px', fontWeight: 700 }} >??? {mynftState.silverNftInfos.length}???</Typography>
                    <Box sx={{ cursor: 'pointer', color: '#7E8186', fontSize: '12px'}}>{'???????????? >'}</Box>
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
                    <Typography sx={{mt: 0.5, color: '#333', fontSize: '16px', fontWeight: 700 }} >??? {mynftState.goldNftInfos.length}???</Typography>
                    <Box sx={{ cursor: 'pointer', color: '#7E8186', fontSize: '12px'}}>{'???????????? >'}</Box>
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
                    <Typography sx={{mt: 0.5, color: '#333', fontSize: '16px', fontWeight: 700 }} >??? {mynftState.diamondNftInfos.length}???</Typography>
                    <Box sx={{ cursor: 'pointer', color: '#7E8186', fontSize: '12px'}}>{'???????????? >'}</Box>
                </Card>
            </Grid>
        </Grid>
    )
}

export default MyNFTPage