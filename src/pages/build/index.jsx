import { Box, CardMedia, InputBase, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import BoxImg from '../../assets/build/box.png'
import { contracts } from "../../clients/contracts"
import { getTotalSupply, safeMint } from "../../clients/valuebleNFT"
import { getUsdtAllowance, getUsdtBalance, usdtApprove } from "../../clients/usdt"
import { getValueAllowance, getValueBalance, valueApprove } from "../../clients/value"
import { getVSDAllowance, getVSDBalance, VSDApprove } from "../../clients/vsd"
import BuildDialog from "./components/BuildDialog"
import { ethers } from "ethers";
import { getFormatBigNumber } from "../../utils"
import { asyncSetLoading } from "../../redux/reducers/status"
import { useDispatch, useSelector } from "react-redux"
import PayOptionDialog from "./components/PayOptionDialog"
import { asyncSetBuildAmount, getBuildAmount } from "../../redux/reducers/page"


const countBtns = [
    {
        title: 'X3',
        value: 3,
    }, {
        title: 'X10',
        value: 10,
    }, {
        title: 'X30',
        value: 30,
    }, {
        title: 'X50',
        value: 50,
    }, {
        title: 'X100',
        value: 100,
    },
]
const createData = (name, rate, gain) => {
    return { name, rate, gain };
}

const rows = [
    createData('铜', '68%', '6VSD'),
    createData('银', '23%', '12.5VSD'),
    createData('金', '7%', '25VSD'),
    createData('钻', '2%', '50VSD'),
];

const BuildPage = () => {
    const { account } = useWeb3React()
    const count = useSelector(getBuildAmount)
    const [buildCount, setBuildCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [payDialogOpen, setPayDialogOpen] = useState(false)
    const dispatch = useDispatch()
    // TODO: should be got from contract mint 
    // result of build: eg: {gold:10, sliver: 1, copper: 0, diamond: 1}
    const [result, setResult] = useState(null)
    const handleCountChange = (e) => {
        if (e.target.value) {
            dispatch(asyncSetBuildAmount(Number(e.target.value)))
        } else {
            dispatch(asyncSetBuildAmount(''))
        }
    }
    const handleCountBtnClick = (btn) => {
        dispatch(asyncSetBuildAmount(Number(btn.value)))
    }
    const handleBuildBtnClick = () => {
        if (!count) {
            toast.error('数量不能为空!')
            return
        }
        setPayDialogOpen(true)
    }

    // ===============contract apis================
    const getTotalSupplyCount = async () => {
        try {
            const res = await getTotalSupply()
            setBuildCount(res + 231)
        } catch (e) {
            console.log(e)
        }
    }
    const onPaySelected = (price, type) => {
        console.log(price)
        console.log(type)
        // call contract to build nft.
        if (price && type) {
            buildNFT(price, type) 
        }
    }
    const buildNFT = async (priceInfo, type) => {
        dispatch(asyncSetLoading(true, "铸造NFT", "正在铸造NFT"))
        try {
            if (priceInfo.totalUsdtPrice.gt(ethers.BigNumber.from(0))) {
                dispatch(asyncSetLoading(true, "铸造NFT", "查看USDT余额..."))
                // get balance
                const usdtBalance = await getUsdtBalance(account)
                console.log('usdtBalance===', getFormatBigNumber(usdtBalance))
                if (usdtBalance.lt(priceInfo.totalUsdtPrice)) {
                    dispatch(asyncSetLoading(false, "铸造NFT", "", 0, "USDT余额不足"))
                    return
                }
                // get approved usdt
                dispatch(asyncSetLoading(true, "铸造NFT", "获取USDT授权..."))
                var usdtApproved
                try {
                    usdtApproved = await getUsdtAllowance(account, contracts.valuebleNFT)
                } catch (err) {
                    console.log(err)
                }
                console.log(getFormatBigNumber(usdtApproved))
                if (usdtApproved.lt(priceInfo.totalUsdtPrice)) {
                    // approve usdt
                    // const approveUsdtResp = await usdtApprove(contracts.socialNFT, priceInfo.totalUsdtPrice)
                    // approve all usdt
                    const approveUsdtResp = await usdtApprove(contracts.valuebleNFT, usdtBalance)
                    console.log(approveUsdtResp)
                    if (!approveUsdtResp || !approveUsdtResp.success) {
                        dispatch(asyncSetLoading(false, "铸造NFT", "", 0, "获取USDT授权失败!"))
                        return
                    }
                }
            }
            if (priceInfo.totalValuePrice.gt(ethers.BigNumber.from(0))) {
                dispatch(asyncSetLoading(true, "铸造NFT", "查看Value余额..."))
                // get balance
                const valueBalance = await getValueBalance(account)
                console.log('valueBalance===', getFormatBigNumber(valueBalance))
                if (valueBalance.lt(priceInfo.totalValuePrice)) {
                    dispatch(asyncSetLoading(false, "铸造NFT", "", 0, "Value余额不足"))
                    return
                }
                dispatch(asyncSetLoading(true, "铸造NFT", "获取Value授权..."))
                // get approved value
                const valueApproved = await getValueAllowance(account, contracts.valuebleNFT)
                console.log(getFormatBigNumber(valueApproved))
                if (valueApproved.lt(priceInfo.totalValuePrice)) {
                    // approve value
                    // const approveValueResp = await valueApprove(contracts.socialNFT, priceInfo.totalValuePrice)
                    // approve all 
                    const approveValueResp = await valueApprove(contracts.valuebleNFT, valueBalance)
                    console.log(approveValueResp)
                    if (!approveValueResp || !approveValueResp.success) {
                        dispatch(asyncSetLoading(false, "铸造NFT", "", 0, "获取Value授权失败!"))
                        return
                    }
                }
            }
            if (priceInfo.totalVsdPrice.gt(ethers.BigNumber.from(0))) {
                dispatch(asyncSetLoading(true, "铸造NFT", "查看VSD余额..."))
                // get balance
                const vsdBalance = await getVSDBalance(account)
                console.log('vsdBalance===', getFormatBigNumber(vsdBalance))
                if (vsdBalance.lt(priceInfo.totalVsdPrice)) {
                    dispatch(asyncSetLoading(false, "铸造NFT", "", 0, "VSD余额不足"))
                    return
                }
                dispatch(asyncSetLoading(true, "铸造NFT", "获取VSD授权..."))
                // get approved vsd
                const vsdApproved = await getVSDAllowance(account, contracts.ValuebleNFT)
                console.log(getFormatBigNumber(vsdApproved))
                if (vsdApproved.lt(priceInfo.totalVsdPrice)) {
                    // // approved vsd
                    // const approveVsdResp = await VSDApprove(contracts.socialNFT, priceInfo.totalVsdPrice)
                    // approve all 
                    const approveVsdResp = await VSDApprove(contracts.valuebleNFT, vsdBalance)
                    console.log(approveVsdResp)
                    if (!approveVsdResp || !approveVsdResp.success) {
                        dispatch(asyncSetLoading(false, "铸造NFT", "", 0, "获取VSD授权失败!"))
                        return
                    }
                }

            }
            dispatch(asyncSetLoading(true, "铸造NFT", "Mint NFT..."))
            console.log('safe mint')
            // safe mint, 是否build并质押
            const res = await safeMint(count, type, false)
            if (res.success) {
                console.log(res)
                const cropper = res.nftInfos.filter(nftInfo => nftInfo.tokenQuality.toNumber() === 1).length
                const silver = res.nftInfos.filter(nftInfo => nftInfo.tokenQuality.toNumber() === 2).length
                const gold = res.nftInfos.filter(nftInfo => nftInfo.tokenQuality.toNumber() === 3).length
                const diamond = res.nftInfos.filter(nftInfo => nftInfo.tokenQuality.toNumber() === 4).length
                const result = { gold, silver, cropper, diamond }
                dispatch(asyncSetLoading(false, "", "", 0, "", "", true))
                // update build amount 
                getTotalSupplyCount()
                console.log(result)
                setResult(result)
                setOpen(true)
            } else {
                dispatch(asyncSetLoading(false, "铸造NFT",  "", 0, "铸造NFT失败"))
            }
            console.log(res)
        } catch (e) {
            console.log(e)
            dispatch(asyncSetLoading(false, "铸造NFT",  "", 0, "铸造NFT失败"))
        }
    }


    useEffect(() => {
        if (count) {
            dispatch(asyncSetLoading(false, "", "", 0, "", "", true))
            // 1. get now build count
            getTotalSupplyCount()
            // getPrice(count)
            // const usdt = price.usdt * count
            // const v6 = price.v6 *count
            // setTotalPrice(`${usdt} USDT + ${v6} V6`)
        }
    }, [count])

    return (
        <>
            <Box sx={{ backgroundColor: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant={'inherit'} sx={{ color: '#7E8186', fontSize: '14px' }}>已经铸造的总数:{buildCount}</Typography>
                <Box>
                    <CardMedia
                        component={'img'}
                        sx={{
                            width: 180,
                            py: 3
                        }}
                        image={BoxImg} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <InputBase type="number"
                        placeholder="输入铸造数量"
                        value={count}
                        onChange={handleCountChange}
                        sx={{
                            width: '180px',
                            textAlign: 'center',
                            fontSize: '14px',
                            height: '40px',
                            borderRadius: '20px',
                            backgroundColor: '#F2F2F5',
                            px: 2.5,
                            pt: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                    {countBtns.map(btn => {
                        return <Box key={btn.value} sx={{
                            borderRadius: '20px',
                            backgroundColor: '#F2F2F5',
                            px: 2,
                            py: 1,
                            cursor: 'pointer',
                            color: '#7E8186',
                            fontSize: '16px'
                        }} onClick={() => { handleCountBtnClick(btn) }}>{btn.title}</Box>
                    })}
                </Box>
                {/* <Box>
                    <Typography variant={'inherit'} sx={{ mt: 2, color: '#7E8186', fontSize: '14px' }} >消耗:{totalPrice}</Typography>
                </Box> */}
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Box sx={{ background: '#4263EB', borderRadius: '20px', height: '56px', lineHeight: '56px', mx: 3, cursor: 'pointer', fontSize: '16px', fontWeight: 600, color: '#FFF' }}
                        onClick={handleBuildBtnClick}>铸造</Box>
                </Box>
                <Box sx={{ mt: 4, width: '100%' }}>
                    <Box sx={{ px: 3, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant={'inherit'} sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186' }} >规则:</Typography>
                        <Typography variant={'inherit'} sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186' }} >1. 前2000个铸造的NFT,消耗50USDT+5V6或者65USDT</Typography>
                        <Typography variant={'inherit'} sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186' }} >2. 前2001~4000个铸造的NFT,消耗40USDT+10V6或者70USDT</Typography>
                        <Typography variant={'inherit'} sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186' }} >3. 4001个后,消耗750VSD</Typography>
                    </Box>
                </Box>
                <Box sx={{ my: 4, borderRadius: '12px', border: '1px solid #EDEEF2' }}>
                    <Table sx={{ minWidth: 'calc(100vw - 60px)' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ borderRight: '1px solid #EDEEF2' }}>品质</TableCell>
                                <TableCell align="center" sx={{ borderRight: '1px solid #EDEEF2' }}>概率</TableCell>
                                <TableCell align="center">VSD日产出</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 } }}
                                >
                                    <TableCell align="center" sx={{ borderRight: '1px solid #EDEEF2' }}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center" sx={{ borderRight: '1px solid #EDEEF2' }}>{row.rate}</TableCell>
                                    <TableCell align="center">{row.gain}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <BuildDialog isOpen={open} setIsOpen={setOpen} result={result} setResult={setResult} />
                <PayOptionDialog isOpen={payDialogOpen} setIsOpen={setPayDialogOpen} onPaySelected={onPaySelected}/>
            </Box>
        </>
    )
}

export default BuildPage