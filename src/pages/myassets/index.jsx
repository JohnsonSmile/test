import { Box } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import anime from 'animejs'
import AssetsCard from "./components/AssetsCard"
import MyNftCard from "./components/MyNftCard"
import DiamondNFTImage from "../../assets/images/mynft/diamond_nft.png"
import GoldNFTImage from "../../assets/images/mynft/gold_nft.png"
import SilverNFTImage from "../../assets/images/mynft/silver_nft.png"
import CopperNFTImage from "../../assets/images/mynft/copper_nft.png"
import MyVSDCard from "./components/MyVSDCard"
import { useNavigate } from "react-router-dom"
import { getUsdtBalance } from "../../clients/usdt"
import { useWeb3React } from "@web3-react/core"
import { getVSDBalance } from "../../clients/vsd"
import { getValueBalance } from "../../clients/value"
import { ethers } from "ethers"
import { getUserOwn, getUserOwnNum } from "../../clients/valuebleNFT"
import { getUserListItems, getUserListItemsNum } from "../../clients/list"
import { useDispatch, useSelector } from "react-redux"
import { asyncSetAssetsDetail, asyncSetMyNftInfos, asyncSetMyVsdInfos, getAssetsDetail, getMyNftInfos, getMyVsdInfos } from "../../redux/reducers/page"
import { toast } from "react-toastify"
import { getUserStakedNum } from "../../clients/mine"

const NFTImages = [CopperNFTImage, SilverNFTImage, GoldNFTImage, DiamondNFTImage]

const MyAssetsPage = () => {
    const animationRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false)
    const { account } = useWeb3React()
    const dispatch = useDispatch()
    const assetsDetail = useSelector(getAssetsDetail)
    const myNftInfos = useSelector(getMyNftInfos)
    const myVsdInfos = useSelector(getMyVsdInfos)
    const navigate = useNavigate()
    const initialAnime = () => {
        if (animationRef.current == null) {
            animationRef.current = anime({
                targets: '.wave-top ellipse',
                easing: 'easeInOutSine',
                duration: 3000,
                loop: true,
                direction: 'reverse',
                ry: [
                    { value: "150" },
                    { value: "172"},
                ],
                rx:[
                    { value: "280" },
                    { value: "318" },
                ]
            })
        }
        if (!isAnimating) {
            animationRef.current.restart()
            setIsAnimating(true)
        }
    }

    const initialInfos = async () => {
        // get my usdt balances
        const usdtBalance = await getUsdtBalance(account)
        // get my vsd balances
        const vsdBalance = await getVSDBalance(account)
        // get my value balances
        const valueBalance = await getValueBalance(account)
        // get my nft count
        const nftNum = await getUserOwnNum(account)

        const usdtBArray = ethers.utils.formatEther(usdtBalance).split('.')
        const usdtBaStr = (usdtBArray.length === 2) 
            ? usdtBArray[0] + '.' + usdtBArray[1].slice(0, 2)
            : usdtBArray[0]
        const vsdBArray = ethers.utils.formatEther(vsdBalance).split('.')
        const vsdBaStr = (vsdBArray.length === 2) 
            ? vsdBArray[0] + '.' + vsdBArray[1].slice(0, 2)
            : vsdBArray[0]
        const valueBArray = ethers.utils.formatEther(valueBalance).split('.')
        const valueBaStr = (valueBArray.length === 2) 
            ? valueBArray[0] + '.' + valueBArray[1].slice(0, 2)
            : valueBArray[0]
        dispatch(asyncSetAssetsDetail({
            usdt: usdtBaStr,
            vsd: vsdBaStr,
            value: valueBaStr,
            totalAssets: 0, // 算法？？？
            nft: nftNum
        }))
        // get my staked nft count
        const stakedNum = await getUserStakedNum(account)
        console.log(stakedNum)
        // get market price
        const amount = await getUserListItemsNum(account)
        const pageSize = 100
        var index = 0
        var resp = []
        var res = await getUserListItems(account, index, pageSize)
        resp.push(...res)
        while (resp.length === amount) {
            index = pageSize * (index + 1)
            res = await getUserListItemsNum(account, index, pageSize)
            resp.push(...res)
        }
        console.log(resp)
        var price = ethers.BigNumber.from(0)
        resp.forEach(nft => {
            price = price.add(nft.listItem.price)
        });
        // plus unlist floor price ,let's say 0.1 ether
        price = price.add(ethers.utils.parseEther(((nftNum - amount) * 0.1).toString()))
        console.log(price)
        const etherPrice = ethers.utils.formatEther(price).split('.')
        console.log(etherPrice)
        const totalPrice = (etherPrice.length === 2) 
            ? etherPrice[0] + '.' + etherPrice[1].slice(0, 2) + ' USDT'
            : etherPrice[0] + ' USDT'
        console.log(totalPrice)
        // get yesterday gain
        // get four nft 
        const nftInfos = await getUserOwn(account, 0, 4)
        console.log(nftInfos)
        var latestNfts = nftInfos.map(nftInfo => {
            return {
                image: NFTImages[nftInfo.tokenQuality - 1],
                id: nftInfo.tokenId
            }
        })
        dispatch(asyncSetMyNftInfos({
            totalAmount: nftNum,
            stakeAmount: stakedNum,
            totalPrice,
            yesterdayGain: '未知',
            latestNfts,
        }))
        // get vsd price
        // get vsd total price
        // get lp token
        // get vsd can be collected
        dispatch(asyncSetMyVsdInfos({
            vsdAmount: ethers.utils.formatEther(vsdBalance),
            vsdPrice: 0.1, // 从哪里获得
            vsdTotalPrice: 1120.82,
            stakeRate: 100,
            lpToken: 230,
            vsdCanBeAcheived: 840
        }))
    }
    useEffect(() => {

        initialAnime()
        initialInfos()
        return (() => {
            if (animationRef.current) {
                anime.remove('.wave-top ellipse')
            }
        })
    }, [])

    const handleNftClick = (id) => {
        // TODO: to detail page??
        console.log(id)
    }

    const handleMoreNftClick = () => {
        // TODO: to my nft list page
        navigate('/mynft/list')
    }

    const handleGainVSDClick = () => {
        // TODO: gain vsd
        toast.info('即将上线,敬请期待...')
    }

    const handleLiquidManageClick = () => {
        // TODO: liquid manage
        toast.info('即将上线,敬请期待...')
    }

    // TODO: if user already login
    const handleBuildClick = () => {
        navigate('/build')
    }

    const handleBuyClick = () => {
        navigate('/market')
    }

    return (
        <Box sx={{ px: 2, backgroundColor: '#FFF', minHeight: 'calc(100vh - 56px)', pb: 5 }}>
            <Box sx={{ pt: 1.5 }}>
                <AssetsCard assetsDetail={assetsDetail}/> 
            </Box>
            <MyNftCard 
                myNftInfos={myNftInfos} 
                onNftClick={handleNftClick} 
                onMoreClick={handleMoreNftClick} 
                onBuildClick={handleBuildClick}
                onBuyClick={handleBuyClick} />
            <MyVSDCard myVsdInfos={myVsdInfos} onGainVsdClick={handleGainVSDClick} onLiquidManageClick={handleLiquidManageClick} />
        </Box>
    )
}

export default MyAssetsPage