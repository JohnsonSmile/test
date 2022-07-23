import { Avatar, Box, Dialog, Typography } from "@mui/material"
import QRCode from 'qrcode.react';


const InviteCardDialog = (props) => {
    const { avatar, url, isOpen, setIsOpen } = props
    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <Dialog
            onClose={handleClose}
            open={isOpen}
        >
            <Box sx={{cursor: 'pointer' }}
                        id="invite-card-render" >
                <Box sx={{
                        border: '1px solid #333', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        backgroundColor: '#FFF', px: 2}}>
                    <Box sx={{pt: 3}}>
                        <Avatar sx={{ width: 64, height: 64 }}/>
                    </Box>
                    <Box sx={{ pt: 3 }}>
                        <Typography component={'span'} sx={{color:'#0797FF', fontSize: 12}}>船中八策</Typography>
                        <Typography component={'span'} sx={{color:'InfoText', fontSize: 12}}>诚邀您加入AAA社区Value Bank项目</Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Typography sx={{color:'InfoText', fontSize: 14, textAlign: 'center'}}>邀请码</Typography>
                        <Typography sx={{color:'#0797FF', fontSize: 14, textAlign: 'center'}}>12JOIH</Typography>
                        <Typography sx={{color:'InfoText', fontSize: 14, mt: 2, textAlign: 'center'}}>打造Web3 社交即挖矿 + 推广联盟 + 高收益理财</Typography>
                        <Typography sx={{color:'InfoText', fontSize: 14, mt: 2, textAlign: 'center'}}>公平公正公开，链上合约和数据透明</Typography>
                        <Typography sx={{color:'InfoText', fontSize: 14, mt: 2, textAlign: 'center'}}>算法价格稳定，价值投资长期(3,3)共赢</Typography>
                    </Box>
                    <Box sx={{ m: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            {/* <Box>
                                <CardMedia 
                                component={'img'}
                                sx={{
                                    height: 45,
                                    width: 45
                                }}
                                image={'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500'} />
                                <Typography sx={{color:'InfoText', fontSize: 12}}>AAA社区</Typography>
                            </Box> */}
                            <Box>
                                <Typography sx={{color:'InfoText', fontSize: 12, textAlign: 'left'}}>元宇宙财富共赢纲领</Typography>
                                <Typography sx={{color:'InfoText', fontSize: 12, textAlign: 'left'}}>技术极客和伟大梦想的Web3社区</Typography>
                                <Typography sx={{color:'#0797FF', fontSize: 12, textAlign: 'left'}}>{url}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ width: 80 }}>
                            <Typography sx={{color:'InfoText', fontSize: 12,}}>二维码参与:</Typography>
                            <QRCode value={url} size={60} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}


export default InviteCardDialog