import { Avatar, Box, Typography } from "@mui/material"
import QRCode from 'qrcode.react';
import DownloadIcon from '@mui/icons-material/Download';
import { useEffect, useState } from "react";
import domtoimage from 'dom-to-image';
import InviteCardDialog from "./components/InviteCardDialog";


const InvitePage = () => {
    
    const [url, setUrl] = useState('http://www.aaagroup.io?share=12JOIH')
    const [cardHeight, setCardHeight] = useState(0)
    const [cardWidth, setCardWidth] = useState(0)
    const [open, setOpen] = useState(false)

    const handleDownloadClick = () => {
        setOpen(true)
        setTimeout(() => {
            console.log('get download')
            const node = document.querySelector('#invite-card-render')
            console.log(node)
            domtoimage.toJpeg(node, {style: {dispay: 'block'}}).then((dataUrl) => {
              var link = document.createElement('a')
              link.download = 'share.jpeg'
              link.href = dataUrl
              console.log(dataUrl)
              link.click()
            })
        }, 500);
    }
    useEffect(() => {
        const height = document.querySelector("#invite-card").clientHeight;
        const width = document.querySelector("#invite-card").clientWidth;
        console.log('height', height);
        setCardHeight(height)
        setCardWidth(width)
    }, [])
    
    return (
        <Box sx={{px: 2, backgroundColor: '#FFF'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', pt: 4}}>
                <Box sx={{flex: 1}}>
                    <Typography sx={{color:'InfoText', fontSize: 14}}>已推广有效账户</Typography>
                    <Typography sx={{color:'#0797FF', fontSize: 14}}>24</Typography>
                </Box>
                <Box>
                    <Avatar sx={{ width: 64, height: 64 }}/>
                </Box>
                <Box sx={{flex: 1}}>
                    <Typography sx={{color:'InfoText', fontSize: 14}}>累计推广收入</Typography>
                    <Typography sx={{color:'#0797FF', fontSize: 14}}>12340.123 VS</Typography>
                </Box>
            </Box>
            <Box sx={{mt: 2}}>
                <Typography sx={{color:'InfoText', fontSize: 14}}>我的邀请码</Typography>
                <Typography sx={{color:'#0797FF', fontSize: 14}}>12JOIH</Typography>
            </Box>
            <Box sx={{mt: 2}}>
                <Typography sx={{color:'InfoText', fontSize: 14}}>我的邀请连接</Typography>
                <Typography sx={{color:'#0797FF', fontSize: 14, mt: 1}}>http://www.aaagroup.io?share=12JOIH</Typography>
            </Box>
            <Box sx={{mt: 2}}>
                <Typography sx={{color:'InfoText', fontSize: 14}}>我的专属推广海报</Typography>
            </Box>
            <Box sx={{mt: 2, height: cardHeight * 0.5, width: cardWidth * 0.5, cursor: 'pointer', mx: 'auto' }} >
                <Box sx={{
                    border: '1px solid #333', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    position: 'absolute',
                    transform: `scale(0.5)`,
                    transformOrigin: 'top left',
                    backgroundColor: '#FFF'}}
                    id="invite-card">
                    <Box sx={{pt: 4}}>
                        <Avatar sx={{ width: 64, height: 64 }}/>
                    </Box>
                    <Box sx={{ pt: 3 }}>
                        <Typography component={'span'} sx={{color:'#0797FF', fontSize: 12}}>船中八策</Typography>
                        <Typography component={'span'} sx={{color:'InfoText', fontSize: 12}}>诚邀您加入AAA社区Value Bank项目</Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Typography sx={{color:'InfoText', fontSize: 14}}>邀请码</Typography>
                        <Typography sx={{color:'#0797FF', fontSize: 14}}>12JOIH</Typography>
                        <Typography sx={{color:'InfoText', fontSize: 14, mt: 2}}>打造Web3 社交即挖矿 + 推广联盟 + 高收益理财</Typography>
                        <Typography sx={{color:'InfoText', fontSize: 14, mt: 2}}>公平公正公开，链上合约和数据透明</Typography>
                        <Typography sx={{color:'InfoText', fontSize: 14, mt: 2}}>算法价格稳定，价值投资长期(3,3)共赢</Typography>
                    </Box>
                    <Box sx={{ m: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <Box sx={{ flex: 1, pl: 2, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
                        <Box sx={{ width: 80, pr: 2 }}>
                            <Typography sx={{color:'InfoText', fontSize: 12,}}>二维码参与:</Typography>
                            <QRCode value={url} size={60} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}} onClick={handleDownloadClick}>
                <DownloadIcon />
                <Typography sx={{color:'#0797FF', fontSize: 14}}>我的专属推广海报</Typography>
            </Box>
            <Box sx={{ mt: 3, px: 2}}>
                <Box sx={{
                    border: '1px solid #333', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    py: 2,
                    px: 2,
                    textAlign: 'left'
                }}>
                    <Typography sx={{color:'InfoText', fontSize: 14}}>推广说明：</Typography>
                    <Typography sx={{color:'InfoText', fontSize: 12}}>1. 每个用户有一个专属的邀请码，用户连接钱包需要绑定邀请码才能激活账户。</Typography>
                    <Typography sx={{color:'InfoText', fontSize: 12}}>2. 其他用户通过自身推广链接和或推广海报二维码连接钱包成功将自动绑定推广人邀请码。无须前者手动输入邀请码。</Typography>
                    <Typography sx={{color:'InfoText', fontSize: 12}}>3. 邀请收益多少与直推有效用户数量、一级/二级/三级推广的用户NFT质押获得的VSD收益、以及伞下全部用户的理财收益相关。详细规则请查看推广收益计算文档。</Typography>
                    <Typography sx={{color:'InfoText', fontSize: 12}}>4. 邀请关系一旦建立，不可更改绑定。</Typography>
                    <Typography sx={{color:'InfoText', fontSize: 12}}>5. 激活账户后，被邀请人购买或铸造NFT后，视作有效账户。</Typography>
                    <Typography sx={{color:'InfoText', fontSize: 12}}>6. 主账户生成的子账户不具有单独的邀请码，子账户激活后绑定主账号的上级推广人，主账户或子账户有效账户不重复计算，最多为一个，但计算上级收益是为主子账户产出VSD数量加总。</Typography>
                </Box>
            </Box>
            <InviteCardDialog url={url} isOpen={open} setIsOpen={setOpen} />
        </Box>
    )
}

export default InvitePage