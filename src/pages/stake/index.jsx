import { Box, Tab,  Typography } from "@mui/material"
import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import NFTStake from "./components/NFTStake";
import BootstrapTabs from "../../widgets/tabs/BootstrapTabs";
import { getUserOwn, getUserOwnNum } from "../../clients/valuebleNFT";
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
        const amount = await getUserOwnNum(account)
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
                isStaked: res.isStaked
            }
        })
        console.log(tokenInfos)

        // get free
        const freeNFTs = tokenInfos.filter(nft => {
            return !nft.isStaked
        })


        // get staked nfts
        const stakedNFTs = tokenInfos.filter(nft => {
            return nft.isStaked
        })

        // listed nft info
        const listedNFTs = []

        // all infos
        var nftInfos = []

        // 1 闲置 2 质押中 3 出售中
        if (freeNFTs.length > 0) {
            nftInfos.push(...(freeNFTs.map(nft => {
                return {
                    ...nft,
                    status: 1
                }
            })))
        }
        if (stakedNFTs.length > 0) {
            nftInfos.push(...(stakedNFTs.map(nft => {
                return {
                    ...nft,
                    status: 2
                }
            })))
        }
        if (listedNFTs.length > 0) {
            nftInfos.push(...(listedNFTs.map(nft => {
                return {
                    ...nft,
                    status: 3
                }
            })))
        }
        // 排序
        nftInfos = nftInfos.sort((a, b) => b.id - a.id)
        console.log(nftInfos)
        dispatch(asyncSetNftInfos(nftInfos))
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