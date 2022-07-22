import { Box } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import anime from 'animejs'
import AssetsCard from "./components/AssetsCard"
import MyNftCard from "./components/MyNftCard"
import NFT01Img from "../../assets/images/profile/template/nft01.png"
import NFT02Img from "../../assets/images/profile/template/nft02.png"
import NFT03Img from "../../assets/images/profile/template/nft03.png"
import MyVSDCard from "./components/MyVSDCard"


const MyAssetsPage = () => {
    const animationRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false)
    const [assetsDetail, setAssetsDetail] = useState({
        usdt: 1234.21,
        nft: 1223,
        vsd: 121.22,
        value: 123124.21,
        totalAssets: 2735
    })
    const [myNftInfos, setMyNftInfos] = useState({
        totalAmount: 10,
        stakeAmount: 10,
        totalPrice: 750,
        yesterdayGain: 150,
        latestNfts: [
            { image: NFT01Img, id: 1,},
            { image: NFT02Img, id: 2,},
            { image: NFT03Img, id: 3,},
        ]
    })
    const [myVsdInfos, setMyVsdInfos] = useState({
        vsdAmount: 11023.23,
        vsdPrice: 0.1,
        vsdTotalPrice: 1120.82,
        stakeRate: 100,
        lpToken: 230,
        vsdCanBeAcheived: 840
    })
    useEffect(() => {
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
    }

    const handleGainVSDClick = () => {
        // TODO: gain vsd
    }

    const handleLiquidManageClick = () => {
        // TODO: liquid manage
    }

    return (
        <Box sx={{ px: 2, backgroundColor: '#FFF', minHeight: 'calc(100vh - 56px)', pb: 5 }}>
            <Box sx={{ pt: 1.5 }}>
                <AssetsCard assetsDetail={assetsDetail}/> 
            </Box>
            <MyNftCard myNftInfos={myNftInfos} onNftClick={handleNftClick} onMoreClick={handleMoreNftClick} />
            <MyVSDCard myVsdInfos={myVsdInfos} onGainVsdClick={handleGainVSDClick} onLiquidManageClick={handleLiquidManageClick} />
        </Box>
    )
}

export default MyAssetsPage