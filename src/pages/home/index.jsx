import {Box} from '@mui/material';
import { UserInfo } from "./components/UserInfo";
import Features from "./components/Features";
import GlobalData from "./components/GlobalData";


// FIXME: should be set
const features = [
    {
        image: '',
        title: 'NFT铸造',
        isReady: true
    },
    {
        image: '',
        title: 'NFT市场',
        isReady: true
    },
    {
        image: '',
        title: '代币交易',
        isReady: true
    },
    {
        image: '',
        title: '每日签到',
        isReady: true
    },
    {
        image: '',
        title: '个人中心',
        isReady: true
    },
    {
        image: '',
        title: '邀请推广',
        isReady: true
    },
    {
        image: '',
        title: '我的资产',
        isReady: true
    },
    {
        image: '',
        title: '聊天应用',
        isReady: true
    },
    {
        image: '',
        title: '排行榜',
        isReady: false
    },
    {
        image: '',
        title: '资产和成',
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

const HomePage = (props) => {
    return (
        <>
            <Box>
                <UserInfo />
                <Box sx={{
                    backgroundColor: '#eee', 
                    borderRadius: '30px 30px 0 0',
                    overflow: 'hidden'
                }}>
                    <Features features={features} informations={informations} />
                    <GlobalData socialData={socialData} vsdData={vsdData} vsdUsdtData={vsdUsdtData} />
                </Box>
            </Box>
        </>
    )
}

export default HomePage