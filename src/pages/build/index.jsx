import { Box, CardMedia, InputBase, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import BoxImg from '../../assets/build/box.png'
import { contracts } from "../../clients/contracts"
import { getTotalPrice, getTotalSupply, safeMint } from "../../clients/socialNFT"
import { getUsdtAllowance, getUsdtBalance, usdtApprove } from "../../clients/usdt"
import { getValueAllowance, getValueBalance, valueApprove } from "../../clients/value"
import { getVSDAllowance, getVSDBalance, VSDApprove } from "../../clients/vsd"
import BuildDialog from "./components/BuildDialog"
import { ethers } from "ethers";
import { getFormatBigNumber } from "../../utils"


// FIXME: price, should set properly
const price = { usdt: 200, v6: 10 }

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
    createData('铜', '68%', '12VSD'),
    createData('银', '23%', '25VSD'),
    createData('金', '7%', '50VSD'),
    createData('钻', '2%', '100VSD'),
];

const BuildPage = () => {
    const { account } = useWeb3React()
    const [count, setCount] = useState(1)
    const [totalPrice, setTotalPrice] = useState('')
    const [priceInfo, setPriceInfo] = useState({})
    const [buildCount, setBuildCount] = useState(0)
    const [open, setOpen] = useState(false)
    // TODO: should be got from contract mint 
    // result of build: eg: {gold:10, sliver: 1, copper: 0, diamond: 1}
    const [result, setResult] = useState(null)
    const handleCountChange = (c) => {
        if (c.target.value) {
            setCount(Number(c.target.value))
        } else {
            setCount('')
        }
    }
    const handleCountBtnClick = (btn) => {
        setCount(btn.value)
    }
    const handleBuildBtnClick = () => {
        if (!count) {
            toast.error('数量不能为空!')
            return
        }
        // TODO: call contract to build nft.
        buildNFT()
        // ...
        // setOpen(true)
        // const timer = setTimeout(function () {
        //     console.log('result changed')
        //     setResult({
        //         gold:10, sliver: 1, copper: 0, diamond: 1
        //     })
        //     clearTimeout(timer)
        // }, 2000)
    }

    // ===============contract apis================
    const getTotalSupplyCount = async () => {
        try {
            const res = await getTotalSupply()
            setBuildCount(res)
        } catch (e) {
            console.log(e)
        }
    }
    const getPrice = async (count) => {
        try {
            const res = await getTotalPrice(count)
            setPriceInfo(res)
            const prices = []
            if (res.totalUsdtPrice.gt(ethers.BigNumber.from(0))) {
                prices.push(getFormatBigNumber(res.totalUsdtPrice) + ' USDT')
            }
            if (res.totalValuePrice.gt(ethers.BigNumber.from(0))) {
                prices.push(getFormatBigNumber(res.totalValuePrice) + ' V6')
            }
            if (res.totalVsdPrice.gt(ethers.BigNumber.from(0))) {
                prices.push(getFormatBigNumber(res.totalVsdPrice) + ' VSD')
            }
            const price = prices.join(' + ')
            setTotalPrice(price)
            // TODO: 
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }
    const buildNFT = async () => {
        try {
            if (priceInfo.totalUsdtPrice.gt(ethers.BigNumber.from(0))) {
                // get balance
                const usdtBalance = await getUsdtBalance(account)
                console.log('usdtBalance===', getFormatBigNumber(usdtBalance))
                if (usdtBalance.lt( priceInfo.totalUsdtPrice)) {
                    toast.warn('USDT 余额不足!')
                    return
                }
                // get approved usdt
                const usdtApproved = await getUsdtAllowance(account, contracts.usdt)
                console.log(getFormatBigNumber(usdtApproved))
                if (usdtApproved.lt(priceInfo.totalUsdtPrice)) {
                    // approve usdt
                    const approveUsdtResp = await usdtApprove(contracts.usdt, priceInfo.totalUsdtPrice)
                    console.log(approveUsdtResp)
                    if (!approveUsdtResp || !approveUsdtResp.success) {
                        toast.warn('获取USDT授权失败!')
                        return
                    }
                }
            }
            if (priceInfo.totalValuePrice.gt(ethers.BigNumber.from(0))) {
                // get balance
                const valueBalance = await getValueBalance(account)
                console.log('valueBalance===', getFormatBigNumber(valueBalance))
                if (valueBalance.lt(priceInfo.totalValuePrice)) {
                    toast.warn('V6 余额不足!')
                    return
                }
                // get approved value
                const valueApproved = await getValueAllowance(account, contracts.value)
                console.log(getFormatBigNumber(valueApproved))
                if (valueApproved.lt(priceInfo.totalValuePrice)) {
                    // approve value
                    const approveValueResp = await valueApprove(contracts.value, priceInfo.totalValuePrice)
                    console.log(approveValueResp)
                    if (!approveValueResp || !approveValueResp.success) {
                        toast.warn('获取Value授权失败!')
                        return
                    }
                }
            }
            if (priceInfo.totalVsdPrice.gt(ethers.BigNumber.from(0))) {
                // get balance
                const vsdBalance = await getVSDBalance(account)
                console.log('vsdBalance===', getFormatBigNumber(vsdBalance))
                if (vsdBalance.lt(priceInfo.totalVsdPrice)) {
                    toast.warn('VSD 余额不足!')
                    return
                }
                // get approved vsd
                const vsdApproved = await getVSDAllowance(account, contracts.vsd)
                console.log(getFormatBigNumber(vsdApproved))
                if (vsdApproved.lt(priceInfo.totalVsdPrice)) {
                    // approved vsd
                    const approveVsdResp = await VSDApprove(contracts.value, priceInfo.totalVsdPrice)
                    console.log(approveVsdResp)
                    if (!approveVsdResp || !approveVsdResp.success) {
                        toast.warn('获取VSD授权失败!')
                        return
                    }
                }
                
            }
            // safe mint
            const res = await safeMint(count)
            console.log(res)
        } catch (e) {
            console.log(e)
            toast.error("铸造失败，请稍后重试！")
        }
    }

    
    useEffect(() => {
        if (count) {
            getPrice(count)
            // const usdt = price.usdt * count
            // const v6 = price.v6 *count
            // setTotalPrice(`${usdt} USDT + ${v6} V6`)
        } else {
            setTotalPrice('数量不能为空')
        }
    }, [count])


    useEffect(() => {
        // 1. get now build count
        getTotalSupplyCount()
        // 2. get build default count 1 price
        getPrice(count ?? 1)

    }, [])

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
                <Box>
                    <Typography variant={'inherit'} sx={{ mt: 2, color: '#7E8186', fontSize: '14px' }} >消耗:{totalPrice}</Typography>
                </Box>
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Box sx={{ background: '#4263EB', borderRadius: '20px', height: '56px', lineHeight: '56px', mx: 3, cursor: 'pointer', fontSize: '16px', fontWeight: 600, color: '#FFF' }}
                        onClick={handleBuildBtnClick}>铸造</Box>
                </Box>
                <Box sx={{ mt: 4, width: '100%' }}>
                    <Box sx={{ px: 3, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant={'inherit'} sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186' }} >规则:</Typography>
                        <Typography variant={'inherit'} sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186' }} >1. 前1000个铸造的NFT,消耗200USDT+10V6</Typography>
                        <Typography variant={'inherit'} sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186' }} >2. 前1001~2000个铸造的NFT,消耗200USDT+30V6</Typography>
                        <Typography variant={'inherit'} sx={{ fontSize: '12px', fontWeight: 500, color: '#7E8186' }} >3. 2001个后,消耗1000VSD</Typography>
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
            </Box>
        </>
    )
}

export default BuildPage