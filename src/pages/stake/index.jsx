import { Box, Tab,  Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from 'prop-types';
import NFTStake from "./components/NFTStake";
import LPStake from "./components/LPStake";
import BootstrapTabs from "../../widgets/tabs/BootstrapTabs";
import { getUserListItems, getUserListItemsNum } from "../../clients/list";
import { apiPostGetNFTInfosByIDs } from "../../http/api";
import { getUserStakedTokenIDsByPage } from "../../clients/socialNFT";
import { useWeb3React } from "@web3-react/core";


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
            <Box sx={{ p: 3 }}>
                <Typography component={'div'}>{children}</Typography>
            </Box>
            )}
        </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


const StakePage = () => {
    const location = useLocation()
    const [value, setValue] = useState(0);
    const [nftInfos, setNftInfos] = useState([])
    const [nftInfo, setNftInfo] = useState({})
    const [stakedIDs, setStakedIDs] = useState([])
    const { account } = useWeb3React()
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onStakeSuccess = (selectedIds) => {
        const selectedSet = new Set(selectedIds)
        setNftInfo({})
        const nfts = nftInfos.map(nftInfo => {
            if (selectedSet.has(nftInfo.token_id)) {
                nftInfo.status = 2
            }
            return nftInfo
        })
        setNftInfos(nfts)
        setStakedIDs(prev => [...prev, ...selectedIds])
    }

    const onUnStakeSuccess = (stkIDs) => {
        const selectedSet = new Set(stkIDs)
        setNftInfo({})
        const nfts = nftInfos.map(nftInfo => {
            if (selectedSet.has(nftInfo.token_id)) {
                nftInfo.status = 1
            }
            return nftInfo
        })
        setNftInfos(nfts)
        setStakedIDs([])
    }

    const initialInfos = async () => {
        // get all nfts not listed with type
        // 闲置的和 staking的
        const pageSize = 100
        var index = 0
        var resp = []
        var res = await getUserStakedTokenIDsByPage(account, index, pageSize)
        resp.push(...res)
        while (res.length === 100) {
            index = pageSize * (index + 1)
            res = await getUserStakedTokenIDsByPage(account, index, pageSize)
            resp.push(...res)
        }
        console.log(resp)

        // get free
        const freeNFTs = resp.filter(nft => {
            return !nft.staking
        })
        console.log(freeNFTs)
        const freeIDs = freeNFTs.length > 0 ? freeNFTs.map(nft => nft.tokenId.toNumber()) : []
        console.log(freeIDs)

        // get nft infos from backend
        const freeNFTResp = freeNFTs.length > 0 ?  await apiPostGetNFTInfosByIDs(freeIDs) : []
        console.log(freeNFTResp)


        // staked nft 
        const stakeNFTs = resp.filter(nft => {
            return nft.staking
        })
        console.log(stakeNFTs)
        const stakedIDs = stakeNFTs.length > 0 ? stakeNFTs.map(nft => nft.tokenId.toNumber()) : []
        console.log(stakedIDs)
        setStakedIDs(stakedIDs)


        // all infos
        var nftInfos = []

        // 1 闲置 2 质押中 3 出售中
        if (freeNFTResp.code === 200 && freeNFTResp.result && freeNFTResp.result.length > 0) {
            nftInfos.push(...(freeNFTResp.result.map(nft => {
                return {
                    ...nft,
                    status: 1
                }
            })))
        }
        
        // 排序
        nftInfos = nftInfos.sort((a, b) => a.id < b.id)
        console.log(nftInfos)
        setNftInfos(nftInfos)
    }

    useEffect(() =>{
        initialInfos()
        if (location.state && location.state.nftInfo) {
            setNftInfo(location.state.nftInfo)
        }
    }, [location, account])
    
    return (
        <Box sx={{ width: '100%', backgroundColor: '#FFF'}}>
            <Box sx={{ pt: 3 }}>
                <BootstrapTabs value={value} onChange={handleChange}>
                    <Tab label="质押NFT" />
                    <Tab label="质押LP" />
                </BootstrapTabs>
            </Box>
            <TabPanel value={value} index={0}>
                <NFTStake nftInfos={nftInfos} nftInfo={nftInfo} stakedIDs={stakedIDs} onStakeSuccess={onStakeSuccess} onUnStakeSuccess={onUnStakeSuccess}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <LPStake />
            </TabPanel>
        </Box>
    )
}

export default StakePage