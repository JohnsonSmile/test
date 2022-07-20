import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"



const LPStake = () => {

    const [count, setCount] = useState(1)

    const handleCountChange = (c) => {
        if (c.target.value) {
            setCount(Number(c.target.value))
        } else {
            setCount('')
        }
    }

    const handleStakeClick = () => {
        // TODO: stake lp
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', px: 5}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, width: '100%'}}>
                <Typography component={'span'} id="type-select-label" sx={{ mr: 1, color: '#333'}}>质押数量:</Typography>
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
                <Button variant='outlined'>全部</Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'space-between', alignItems: 'center', mt: 2, width: '100%' }}>
                <Typography component={'div'} sx={{ color: '#333'}}>拥有LP数量:</Typography>
                <Typography component={'div'} sx={{ color: '#333'}}>1234.12</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'space-between', alignItems: 'center', mt: 2, width: '100%' }}>
                <Typography component={'div'} sx={{ color: '#333'}}>年化收益率:</Typography>
                <Typography component={'div'} sx={{ color: '#333'}}>1234.12%</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', alignItems: 'center', mt: 2, py: 1, width: '100%' }}>
                <Button variant='contained' size="large" sx={{minWidth: 105}} onClick={handleStakeClick}>质押</Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'space-between', alignItems: 'center', mt: 2, width: '100%' }}>
                <Typography component={'div'} sx={{ color: '#333'}}>已质押LP数量:</Typography>
                <Typography component={'div'} sx={{ color: '#333'}}>1234.12</Typography>
            </Box>
        </Box>
    )
}

export default LPStake