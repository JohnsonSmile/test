import { Box, Tab,  Typography } from "@mui/material"
import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import NFTStake from "./components/NFTStake";
import LPStake from "./components/LPStake";
import BootstrapTabs from "../../widgets/tabs/BootstrapTabs";
import { apiPostGetNFTInfosByIDs } from "../../http/api";
import { getUserStakedTokenIDsByPage } from "../../clients/socialNFT";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { asyncSetNftInfos } from "../../redux/reducers/page";


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
    const [value, setValue] = useState(0);
    const { account } = useWeb3React()
    const dispatch = useDispatch()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

        // get nft infos from backend
        const stakedIDs = stakeNFTs.length > 0 ? stakeNFTs.map(nft => nft.tokenId.toNumber()) : []
        console.log(stakedIDs)
        const stakeNFTResp = stakeNFTs.length > 0 ?  await apiPostGetNFTInfosByIDs(stakedIDs) : []
        console.log(stakeNFTResp)


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
        if (stakeNFTResp.code === 200 && stakeNFTResp.result && stakeNFTResp.result.length > 0) {
            nftInfos.push(...(stakeNFTResp.result.map(nft => {
                return {
                    ...nft,
                    status: 2
                }
            })))
        }
        
        // 排序
        nftInfos = nftInfos.sort((a, b) => a.id - b.id)
        dispatch(asyncSetNftInfos(nftInfos))
        console.log(nftInfos)
    }

    useEffect(() =>{
        initialInfos()
    }, [account])
    
    return (
        <Box sx={{ width: '100%', backgroundColor: '#FFF'}}>
            <Box sx={{ pt: 3 }}>
                <BootstrapTabs value={value} onChange={handleChange}>
                    <Tab label="质押NFT" />
                    <Tab label="质押LP" />
                </BootstrapTabs>
            </Box>
            <TabPanel value={value} index={0}>
                <NFTStake />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box sx={{ color: '#333', mt: 4 }}>
                    即将上线, 敬请期待...
                </Box>
                {/* <LPStake /> */}
            </TabPanel>
        </Box>
    )
}

export default StakePage