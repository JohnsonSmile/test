import { Box, Card, Divider, Typography } from "@mui/material"
import { ellipsisAccount } from "../../utils/utils"
import {ReactComponent as NodataIcon} from '../../assets/icon/profile/nodata.svg'

const promotionInfos = [
    // { 
    //     address: '0x123124124123123123dg',
    //     gain: 121.22
    // },
    // { 
    //     address: '0x99003124124123123123',
    //     gain: 99.22
    // },
    // { 
    //     address: '0xedd231241241231231hg',
    //     gain: 111
    // }
]
const PromotionRecordPage = () => {
    return (
        <Box sx={{ px: 2, backgroundColor: '#FFF', minHeight: 'calc(100vh - 56px)'}}>
            <Box sx={{ pt: 1.5 , mb: 4, }}>
                {promotionInfos && promotionInfos.length >0 && <Card sx={{ boxShadow: '0px 0px 10px rgba(66, 61, 247, 0.08)', borderRadius: '12px' }}> 
                    <Box sx={{ display: 'flex', flexDirection: 'row', py: 2 }}>
                        <Box sx={{flex:1, fontSize: 16, fontWeight: 600}}>地址</Box>
                        <Box sx={{flex:1, fontSize: 16, fontWeight: 600}}>累计收益</Box>
                    </Box>
                    {promotionInfos.map(info => {
                        return <Box>
                            <Divider sx={{ opacity: 0.5 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'row', py: 2 }}>
                                <Box sx={{flex:1, fontSize: 16, fontWeight: 600, color: '#0797FF'}}>{ ellipsisAccount(info.address) }</Box>
                                <Box sx={{flex:1, fontSize: 16, fontWeight: 600}}>
                                    <Box component={'span'} sx={{fontSize: 16, fontWeight: 600, mr: 0.5}}>{ info.gain }</Box>
                                    <Box component={'span'} sx={{fontSize: 12, fontWeight: 400}}>VSD</Box>
                                </Box>
                            </Box>
                        </Box>
                    })}
                </Card>}
                {(!promotionInfos || promotionInfos.length === 0) && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', mt: '50%'}}>
                    <NodataIcon />
                    <Typography sx={{color: '#4263EB', opacity: 0.5}}>暂无记录</Typography>
                </Box>}
            </Box>
        </Box>
    )
}

export default PromotionRecordPage