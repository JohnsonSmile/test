import { Box } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import BootstrapTextField from "../../../widgets/textfield/BootstrapTextField"



const LPStake = () => {

    const [count, setCount] = useState(1)
    const navigate = useNavigate()
    const handleCountChange = (c) => {
        if (c.target.value) {
            setCount(Number(c.target.value))
        } else {
            setCount('')
        }
    }

    const handleStakeClick = () => {
        // TODO: stake lp
    }

    const handleSignClick = () => {
        navigate('/sign')
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', px: 1}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, width: '100%' }}>
                <Box component={'label'} forid="staking-type-select" sx={{fontSize: '14px', fontWeight: 600, color: '#333'}}>质押数量</Box>
                <BootstrapTextField type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={count}
                    onChange={handleCountChange}
                    placeholder="输入质押数量"
                    fullWidth
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 2, width: '100%' }}>
                <Box component={'label'} sx={{fontSize: '14px', fontWeight: 600, color: '#333'}}>当前钱包VSD-USDT LP数量</Box>
                <Box sx={{ lineHeight: '48px', backgroundColor: '#F5F5F7', width: '100%', borderRadius: '12px', color: '#333', fontSize: '14px', textAlign: 'left', px: 2, boxSizing: 'border-box'}}>1234.12</Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 2, width: '100%' }}>
                <Box component={'label'} sx={{fontSize: '14px', fontWeight: 600, color: '#333'}}>点前年化收益率</Box>
                <Box sx={{ lineHeight: '48px', backgroundColor: '#F5F5F7', width: '100%', borderRadius: '12px', color: '#333', fontSize: '14px', textAlign: 'left', px: 2, boxSizing: 'border-box'}}>1234.12%</Box>
            </Box>
            <Box sx={{ mx: 2, mt: 4, backgroundColor: '#4263EB', borderRadius: '12px', lineHeight: '44px', color: '#FFF', cursor: 'pointer', width: '100%' }} onClick={handleStakeClick}>质押</Box>
            <Box sx={{ mt: 2, py: 1, width: '100%' }}>
                <Box sx={{ border: '1px solid #EDEEF2', borderRadius: '12px', px: 2, py: 2 }} >
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%'}}>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ fontSize: '12px', color: '#7E8186' }}>已质押VSD-USDT LP</Box>
                            <Box sx={{ fontSize: '16px', color: '#333', fontWeight: 700, mt: 0.5, minHeight: '72px', lineHeight: '72px'}}>1522</Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ fontSize: '12px', color: '#7E8186' }}>待提取收益</Box>
                            <Box sx={{ minHeight: '72px' }}>
                                <Box sx={{ fontSize: '16px', color: '#333', fontWeight: 700, mt: 0.5 }}>1522.32 VSD</Box>                            
                                <Box sx={{ fontSize: '16px', color: '#333', fontWeight: 700 }}>+</Box>
                                <Box sx={{ fontSize: '16px', color: '#333', fontWeight: 700 }}>1522.32 SVSD</Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mt: 2, gap: 1}}>
                        <Box sx={{ flex: 1, fontSize: '12px', color: '#fff', backgroundColor: '#4263EB', borderRadius: '12px', lineHeight: '44px', fontWeight: 600, cursor: 'pointer'}}>
                            解除质押并提取收益
                        </Box>
                        <Box sx={{ flex: 1, fontSize: '12px', color: '#4263EB', backgroundColor: '#ECF0FF', borderRadius: '12px', lineHeight: '44px', fontWeight: 600, cursor: 'pointer'}}>
                            只提取收益
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mt: 1.5, py: 1, width: '100%' }}>
                <Box sx={{ border: '1px solid #EDEEF2', borderRadius: '12px', px: 2, py: 2 }} >
                    <Box sx={{ fontSize: '12px', color: '#333', textAlign: 'left', fontWeight: 500 }}>规则：</Box>
                    <Box sx={{ fontSize: '12px', color: '#333', textAlign: 'left', fontWeight: 500, pt: 0.5 }}>① 申请提取收益三天后到账</Box>
                    <Box sx={{ fontSize: '12px', color: '#333', textAlign: 'left', fontWeight: 500, pt: 0.5 }}> ② 需要每日登录签到，否则当日无收益。</Box>
                    <Box sx={{ fontSize: '12px', color: '#4263EB', textAlign: 'left', pt: 1, cursor: 'pointer'}} onClick={handleSignClick}>{'您今日还未签到，去签到->'}</Box>
                </Box>
            </Box>
            <Box sx={{ mt: 1.5, py: 1, width: '100%' }}>
                <Box sx={{ border: '1px solid #EDEEF2', borderRadius: '12px', px: 2, py: 2 }} >
                    <Box sx={{ fontSize: '12px', color: '#333', textAlign: 'left', fontWeight: 500 }}>其他信息:</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', pt: 1, width: '100%' }}>
                        <Box sx={{ fontSize: '12px', color: '#7E8186', fontWeight: 500 }}>我的提取收益</Box>
                        <Box sx={{ fontSize: '12px', color: '#333', fontWeight: 500 }}>1234.12 VSD+1234.12 SVSD</Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', pt: 1, width: '100%' }}>
                        <Box sx={{ fontSize: '12px', color: '#7E8186', fontWeight: 500 }}>我的历史已提取收益</Box>
                        <Box sx={{ fontSize: '12px', color: '#333', fontWeight: 500 }}>1234.12 VSD+1234.12 SVSD</Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', pt: 1, width: '100%' }}>
                        <Box sx={{ fontSize: '12px', color: '#7E8186', fontWeight: 500 }}>所有用户已质押VSD-USDT LP</Box>
                        <Box sx={{ fontSize: '12px', color: '#333', fontWeight: 500 }}>123412312.22</Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default LPStake