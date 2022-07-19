import { Box, Button, Card, CardMedia, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import BoxImg from '../../assets/build/box.png'
import BuildDialog from "./components/BuildDialog"


// FIXME: price, should set properly
const price = {usdt: 200, v6: 10}

const countBtns = [
    {
        title: 'X3',
        value: 3,
    },{
        title: 'X10',
        value: 10,
    },{
        title: 'X30',
        value: 30,
    },{
        title: 'X50',
        value: 50,
    },{
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
    const [count, setCount] = useState(1)
    const [totalPrice, setTotalPrice] = useState('')
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
        // ...
        setOpen(true)
        const timer = setTimeout(function () {
            console.log('result changed')
            setResult({
                gold:10, sliver: 1, copper: 0, diamond: 1
            })
            clearTimeout(timer)
        }, 2000)
    }
    useEffect(() => {
        if (count) {
            const usdt = price.usdt * count
            const v6 = price.v6 *count
            setTotalPrice(`${usdt} USDT + ${v6} V6`)
        } else {
            setTotalPrice('数量不能为空')
        }
    }, [count])
    
    return (
        <>
            <Box sx={{ backgroundColor: '#EEE', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant={'inherit'} sx={{ py: 3 }}>已经铸造的总数:1234</Typography>
                <Box>
                    <CardMedia 
                        component={'img'}
                        sx={{
                            height: 160,
                        }}
                        image={BoxImg} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2}}>
                    <Typography variant={'inherit'} sx={{ mr: 1 }}>输入铸造数量:</Typography>
                    <TextField type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={count}
                        onChange={handleCountChange}
                        size={'small'}
                        sx={{ 
                            width: '80px',
                            textAlign: 'center'
                        }}
                    />
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', gap: 1, mt: 2}}>
                    {countBtns.map(btn => {
                        return <Button key={btn.value} variant='outlined' size={'small'} onClick={() => { handleCountBtnClick(btn) }}>{btn.title}</Button>
                    })}
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Button variant='contained' size='large' sx={{ width: 150 }} onClick={handleBuildBtnClick}>铸造</Button>
                </Box>
                <Box>
                    <Typography variant={'inherit'} sx={{mt:1}} >消耗:{totalPrice}</Typography>
                </Box>
                <Box sx={{ mt: 4, px: 3, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 0.5}}>
                    <Typography variant={'inherit'} >规则:</Typography>
                    <Typography variant={'inherit'} >1. 前1000个铸造的NFT,消耗200USDT+10V6</Typography>
                    <Typography variant={'inherit'} >2. 前1001~2000个铸造的NFT,消耗200USDT+30V6</Typography>
                    <Typography variant={'inherit'} >3. 2001个后,消耗1000VSD</Typography>
                </Box>
                <Card sx={{ px: 1, my: 4 }}>
                    <Table sx={{minWidth: 280}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>品质</TableCell>
                                <TableCell align="center">概率</TableCell>
                                <TableCell align="center">VSD日产出</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.rate}</TableCell>
                            <TableCell align="center">{row.gain}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Card>
                    <BuildDialog isOpen={open} setIsOpen={setOpen} result={result} setResult={setResult} />
            </Box>
        </>
    )
}

export default BuildPage