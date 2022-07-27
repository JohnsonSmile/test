import { Avatar, Box, CardMedia, Typography } from "@mui/material"
import QRCode from 'qrcode.react';
import DownloadIcon from '@mui/icons-material/Download';
import { useEffect, useState } from "react";
import domtoimage from 'dom-to-image';
import InviteBgTopImage from "../../assets/images/invite/background_top.png";
import InviteBgBottomImage from "../../assets/images/invite/background_bottom.png";
import { ReactComponent as QRCodeIcon } from "../../assets/icon/invite/qrcode.svg";
import { ReactComponent as AppIcon } from "../../assets/icon/invite/app.svg"


const InvitePage = () => {
    
    const [url, setUrl] = useState('http://www.aaagroup.io?share=12JOIH')
    const [open, setOpen] = useState(false)

    const handleDownloadClick = () => {
        setOpen(true)
        setTimeout(() => {
            console.log('get download')
            const node = document.querySelector('#invite-card-render')
            console.log(node)
            domtoimage.toJpeg(node, {style: { backgroundColor: '#4263EB'}}).then((dataUrl) => {
              var link = document.createElement('a')
              link.download = 'share.jpeg'
              link.href = dataUrl
              console.log(dataUrl)
              link.click()
            })
        }, 500);
    }
    
    return (
        <Box sx={{px: 2, pb: 5, backgroundColor: 'transparent', position: 'relative'}}>
            <CardMedia component={"img"} image={InviteBgTopImage} sx={{ width: '100vw', height: '100vw', position: 'absolute', top: '-56px', left: 0, zIndex: 1 }} />
            <CardMedia component={"img"} image={InviteBgBottomImage} sx={{ width: '100vw', height: '100vw', position: 'absolute', bottom: 0, left: 0, zIndex: 1 }} />

            <Box id="invite-card-render" sx={{ pt: '40px' }}>
                <Box sx={{cursor: 'pointer', 
                        backgroundColor: '#FFF', 
                        borderRadius: '12px',
                        zIndex: 1, 
                        position: 'relative',
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',  px: 2 }} >
                    <Box sx={{ position: 'absolute', top: '-40px'}}>
                        <Avatar sx={{ width: 80, height: 80, border: '4px solid #FFF', borderRadius: '50%' }}/>
                    </Box>
                    <Box sx={{ pt: 8, display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{color:'#333', fontSize: '24px', fontWeight: 600}}>船中八策</Typography>
                        <Typography sx={{color:'#7E8186', fontSize: 12, mt: 1}}>诚邀您加入AAA社区Value Bank项目</Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Typography sx={{color:'#333', fontSize: '16px', fontWeight: 600, textAlign: 'center'}}>我的邀请码</Typography>
                        <Typography sx={{color:'#4263EB', fontSize: '24px', fontWeight: 600, textAlign: 'center', mt: 1}}>12JOIH</Typography>
                    </Box>
                    <Box sx={{ width: '120px', height: '120px', boxSizing: 'border-box', mt: 4, position: 'relative'}}>
                        <QRCodeIcon style={{width: '120px', height: '120px'}}/>
                        <Box sx={{ width: '90px', height: '90px', position: 'absolute', top: '60px', left: '60px', transform: 'translate(-50%, -50%)'}}>
                            <QRCode value={url} size={90} />
                        </Box>
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <AppIcon />
                    </Box>
                    <Box sx={{ mt: 1, fontSize: '12px' }}>
                        元宇宙财富共赢纲领
                    </Box>
                    <Box sx={{ mt: 0.5, mb: 6, fontSize: '12px' }}>
                        技术极客和伟大梦想构建的Web3社区
                    </Box>
                </Box>
            </Box>
            <Box sx={{display: 'flex', gap: 2, mt: 3, zIndex: 1, position: 'relative' }}>
                <Box sx={{ flex: 1, borderRadius: '12px', border: '1px solid #FFF', lineHeight: '44px', cursor: 'pointer', backgroundColor: '#FFF', color: '#4263EB', fontWeight: 600 }}
                    onClick={handleDownloadClick}>保存图片</Box>
                <Box sx={{ flex: 1, borderRadius: '12px', border: '1px solid #FFF', lineHeight: '44px', cursor: 'pointer', color: '#FFF', fontWeight: 600 }}>复制邀请码</Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 3, backgroundColor: '#FFF', borderRadius: '12px', py: 3, zIndex: 1, position: 'relative' }}>
                <Box sx={{flex: 1}}>
                    <Typography sx={{color:'#333', fontSize: '14px' }}>已推广有效账户</Typography>
                    <Typography sx={{color:'#4263EB', fontSize: '24px', fontWeight: 600, mt: 1 }}>24</Typography>
                </Box>
                <Box sx={{flex: 1}}>
                    <Typography sx={{color:'#333', fontSize: '14px' }}>累计推广收入</Typography>
                    <Typography sx={{color:'#4263EB', fontSize: '24px', fontWeight: 600, mt: 1 }}>12340.123 
                    <Box component={'span'} sx={{ fontSize: '14px', color: '#333' }}> VS</Box>
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ mt: 3, zIndex: 1, position: 'relative'} }>
                <Box sx={{
                    border: '1px solid #EDEEF2', 
                    borderRadius: '12px',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    py: 3,
                    px: 3,
                    backgroundColor: '#FFF',
                    textAlign: 'left'
                }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#333', lineHeight: '18px'}} >规则:</Typography>
                    <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186', mt: 1, lineHeight: '18px' }} >1. 每个用户有一个专属的邀请码，用户连接钱包需要绑定邀请码才能激活账户。</Typography>
                    <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186', mt: 1, lineHeight: '18px' }} >2. 其他用户通过自身推广链接和或推广海报二维码连接钱包成功将自动绑定推广人邀请码。无须前者手动输入邀请码。</Typography>
                    <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186', mt: 1, lineHeight: '18px' }} >3. 邀请收益多少与直推有效用户数量、一级/二级/三级推广的用户NFT质押获得的VSD收益、以及伞下全部用户的理财收益相关。详细规则请查看
                        <Box component={'span'} sx={{ color: '#4263EB', textDecoration: 'underline'}}>推广收益计算</Box>文档。</Typography>
                    <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186', mt: 1, lineHeight: '18px' }} >4. 邀请关系一旦建立，不可更改绑定。</Typography>
                    <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186', mt: 1, lineHeight: '18px' }} >5. 激活账户后，被邀请人购买或铸造NFT后，视作有效账户。</Typography>
                    <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186', mt: 1, lineHeight: '18px' }} >6. 主账户生成的子账户不具有单独的邀请码，子账户激活后绑定主账号的上级推广人，主账户或子账户有效账户不重复计算，最多为一个，但计算上级收益是为主子账户产出VSD数量加总。</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default InvitePage