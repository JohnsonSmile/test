import {Box} from '@mui/material';
import { UserInfo } from "./components/UserInfo";
import Features from "./components/Features";
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import SocialNFTBoard from './components/SocialNFTBoard';
import VSDBoard from './components/VSDBoard';
import VSDUSDTBoard from './components/VSDUSDTBoard';
import { ReactComponent as NFTBuildIcon } from "../../assets/icon/home/nft.svg"
import { ReactComponent as NFTMarketIcon } from "../../assets/icon/home/market.svg"
import { ReactComponent as LPTradeIcon } from "../../assets/icon/home/lptrade.svg"
import { ReactComponent as SignIcon } from "../../assets/icon/home/sign.svg"
import { ReactComponent as ProfileIcon } from "../../assets/icon/home/profile.svg"
import { ReactComponent as PromotionIcon } from "../../assets/icon/home/promotion.svg"
import { ReactComponent as AssetsIcon } from "../../assets/icon/home/assets.svg"
import { ReactComponent as ChatIcon } from "../../assets/icon/home/chat.svg"
import { ReactComponent as RankIcon } from "../../assets/icon/home/rank.svg"
import { ReactComponent as CompoundIcon } from "../../assets/icon/home/compound.svg"
import { getUserOwn, getUserOwnNum  } from '../../clients/valuebleNFT';
import { setTokenURI } from '../../redux/reducers/contracts';
import { useDispatch, useSelector } from 'react-redux';
import { apiPostGetUserInfo } from '../../http';
import { getSigInfo } from '../../redux/reducers/wallet';
import { getAvatar, getUserInfo, getUserName } from '../../redux/reducers/user';
import { asyncSetHome, getHome } from '../../redux/reducers/page';


// FIXME: should be set
const features = [
    {
        image: <NFTBuildIcon />,
        title: 'NFT铸造',
        url: '/build',
        isReady: true
    },
    {
        image: <NFTMarketIcon />,
        title: 'NFT市场',
        url: '/market',
        isReady: false
    },
    {
        image: <LPTradeIcon />,
        title: '代币交易',
        url: '/lpmarket',
        isReady: false
    },
    {
        image: <SignIcon />,
        title: '每日签到',
        url: '/sign',
        isReady: true
    },
    {
        image: <ProfileIcon />,
        title: '个人中心',
        url: '/profile',
        isReady: true
    },
    {
        image: <PromotionIcon />,
        title: '邀请推广',
        url: '/invite',
        isReady: true
    },
    {
        image: <AssetsIcon />,
        title: '我的资产',
        url: '/myassets',
        isReady: true
    },
    {
        image: <ChatIcon />,
        title: '聊天应用',
        url: '/',
        isReady: false
    },
    {
        image: <RankIcon />,
        title: '排行榜',
        url: '/',
        isReady: false
    },
    {
        image: <CompoundIcon />,
        title: '资产合成',
        url: '/',
        isReady: false
    },
]

// FIXME: should be got from backend
const informations = [
    {
        image: '',
        route: ''
    },
    {
        image: '',
        route: ''
    },
    {
        image: '',
        route: ''
    }
]

// FIXME: should be got from backend
const socialData = {
    totalPrice: 1606892.32,
    floorPrice: 50.00,
    transferAmount: 2000,
    totalAmount: 20000,
    transferPrice: 45110.15
}

// FIXME: should be got from backend
const vsdData = {
    totalPrice: 1606892.32,
    singlePrice: 0.31,
    changeRateCent: 12.1,
    usdtEndorsement: 23000000.12
}

// FIXME: should be got from backend
const vsdUsdtData = {
    tokenTotalAmount: 3023001190,
    annualizedReturnRateCent: 401.68,
    usdtInPool: 1390123.10,
    usdtEndorsement: 23000000.12
}


const HomePage = () => {
    const { account } = useWeb3React()
    const accountInfo = useSelector(getHome)
    const signInfo = useSelector(getSigInfo)
    const userInfo = useSelector(getUserInfo)
    const avatar = useSelector(getAvatar)
    const userName = useSelector(getUserName)
    const dispatch = useDispatch()
    const initialContractGlobalInfo = async () => {
            // initial contract global consts
            // TODO: make this properly
            // const resp = await getBaseURI()
            // TODO: just use this to dev
            const tokenURI = 'https://qjgw0y2t09.execute-api.us-east-1.amazonaws.com/metadata?index='
            dispatch(setTokenURI(tokenURI))
            var amount = 0
            // get user own num
            amount = await getUserOwnNum(account)
            console.log(amount)
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
            const cropper = tokenInfos.filter(token => token.quality === 1).length
            const silver = tokenInfos.filter(token => token.quality === 2).length
            const gold = tokenInfos.filter(token => token.quality === 3).length
            const diamond = tokenInfos.filter(token => token.quality === 4).length
            // TODO:gain tody got from backend

            const gain = cropper * 6 + silver * 12.5 + gold * 25 + diamond * 50
            
            // get user info
            if (signInfo && signInfo[account]) {
                const res = await apiPostGetUserInfo(account, signInfo[account], "hello")
                console.log("res", res)
                if (res.code === 200 && res.result) {
                    const accInfo = JSON.parse(JSON.stringify(accountInfo))
                    dispatch(asyncSetHome({
                        ...accInfo,
                        ...res.result.userInfo,
                        isSigned: res.result.isSigned,
                        promotionCount: res.result.promotionCount,
                        nftAmount: amount ? amount : 0,
                        yesterdayGain: gain
                    }))
                } else {
                    dispatch(asyncSetHome({
                        account: '',
                        userName: '',
                        avatar: '',
                        yesterdayGain: 0,
                        isSigned: false,
                        nftAmount: 0,
                        promotionCount: 0,
                        invitationCode: '',
                        inviter: ''
                    }))
                }
            }
    }

    useEffect(() => {
        if (account) {
            if (account === userInfo.account) {
                const accInfo = JSON.parse(JSON.stringify(accountInfo))
                dispatch(asyncSetHome({
                    ...accInfo,...userInfo,
                }))
            }
            // TODO:initial contract infos
            initialContractGlobalInfo()
        } else {
            dispatch(asyncSetHome({
                account: '',
                userName: '',
                avatar: '',
                yesterdayGain: 0,
                isSigned: false,
                nftAmount: 0,
                promotionCount: 0,
                invitationCode: '',
                inviter: ''
            }))
        }
    }, [account, userInfo])
    return (
        <>
            <Box sx={{ backgroundColor: '#FFF', mb: 4}}>
                <UserInfo accountInfo={accountInfo} avatar={avatar} userName={userName ? userName : 'AAA'} />
                <Features features={features} informations={informations} />
                <Box sx={{
                    backgroundColor: '#FFF', 
                    borderRadius: '30px 30px 0 0',
                    overflow: 'hidden',
                    px: 2
                }}>
                    <SocialNFTBoard socialData={socialData} />
                    <VSDBoard vsdData={vsdData} />
                    <VSDUSDTBoard vsdUsdtData={vsdUsdtData} />
                </Box>
            </Box>
        </>
    )
}

export default HomePage