import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../../../utils/utils';
// import {
//     getTotalPrice,
//     getUserStakedNum,
//     getBalance,
//     getUserStakedTokenIDsByPage,
//     getAllStakedNum,
//     getTotalSupply,
//     getAllStakedTokenIDs,
//     isStake,
//     safeMint
// } from '../../../clients/socialNFT';

const SocialNFTBoard = (props) => {
    const { socialData } = props;
    const navigate = useNavigate()
    const handleBuildNFTClick = async () => {
        // TODO: if user logged in
        // const totalPrice = await getTotalPrice(10)
        // console.log('totalPrice', totalPrice)
        // const userStakeNum = await getUserStakedNum('0xB3eF1C9718F3EAFaeb6fd7Ac63E8f43493101Ded')
        // console.log('userStakeNum', userStakeNum)
        // const balance = await getBalance('0xB3eF1C9718F3EAFaeb6fd7Ac63E8f43493101Ded')
        // console.log('balance', balance)
        // const allStakeNum = await getAllStakedNum()
        // console.log('allStakeNum', allStakeNum)
        // const totalSupply = await getTotalSupply()
        // console.log('totalSupply', totalSupply)
        // const isStakeValue = await isStake(1)
        // console.log('isStakeValue', isStakeValue)
        // await safeMint(1)
        navigate('/build')

    }
    return (
        <Card sx={{ minWidth: 275, pb: 2, boxShadow: '0px 0px 10px rgba(66, 61, 247, 0.08)', borderRadius: '20px', mt: 2 }}>
            <Box>
                <Typography component={'div'} sx={{ fontSize: 16, fontWeight: 700, m: 1.5 }} color="text.primary" gutterBottom>
                    Social NFT
                </Typography>
                <Divider sx={{ opacity: 0.5 }} />
                <Grid container columns={6} sx={{
                    px: 2,
                    py: 1,
                    mt: 2,
                }}>
                    <Grid item xs={3} >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 1,
                            gap: 1
                        }}>
                            <Typography sx={{ fontSize: 12, color: '#000', opacity: 0.5 }} >总市值</Typography>
                            <Typography sx={{ fontSize: 16, color: '#000', fontWeight: 700 }}>{formatNumber(socialData.totalPrice.toFixed(2))} USDT</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3} >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 1,
                            gap: 1
                        }}>
                            <Typography sx={{ fontSize: 12, color: '#000', opacity: 0.5 }} >地板价</Typography>
                            <Typography sx={{ fontSize: 16, color: '#000', fontWeight: 700 }}>{formatNumber(socialData.floorPrice.toFixed(2))} USDT</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3} >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 1,
                            gap: 1
                        }}>
                            <Typography sx={{ fontSize: 12, color: '#000', opacity: 0.5 }} >流通量/总量</Typography>
                            <Typography sx={{ fontSize: 16, color: '#000', fontWeight: 700 }}>{formatNumber(socialData.transferAmount)}/{formatNumber(socialData.totalAmount)}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3} >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 1,
                            gap: 1
                        }}>
                            <Typography sx={{ fontSize: 12, color: '#000', opacity: 0.5 }} >24H交易量</Typography>
                            <Typography sx={{ fontSize: 16, color: '#000', fontWeight: 700 }}>{formatNumber(socialData.transferPrice.toFixed(2))} USDT</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ display: 'flex', px: 2, gap: 1.5 }}>
                <Box onClick={handleBuildNFTClick} sx={{
                    flex: 1, background: '#4263EB', borderRadius: '20px', height: '56px', lineHeight: '56px', color: '#FFF',
                    fontSize: 16, fontWeight: 600, boxSizing: 'border-box', cursor: 'pointer'
                }}>铸造NFT</Box>
                <Box sx={{ flex: 1, background: '#ECF0FF', borderRadius: '20px', height: '56px', lineHeight: '56px', color: '#4263EB', fontSize: 16, fontWeight: 600, boxSizing: 'border-box', cursor: 'pointer' }}>交易NFT</Box>
            </Box>
        </Card>
    );
}


export default SocialNFTBoard