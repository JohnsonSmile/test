import { Box,  Fade, Grid, Typography } from "@mui/material"
import { ReactComponent as ArrowIcon } from "../../../assets/icon/mynft/arrow.svg"


const AlphaSelect = (props) => {
    const {title, alpha,  setAlpha, alphaes, open, onAlphaChange, onSelectClick } = props

    const handleAlphaChange = (v) => {
        setAlpha(v)
        onAlphaChange(v)
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                ml: 1, mr: 2, height: '48px', border: '1px solid #F2F2F2', borderRadius: '30px', cursor: 'pointer'}}
                onClick={onSelectClick}>
                <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#333' }}>{title} {alphaes[alpha].label}</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 0.5, transform: open ? '' :'rotate(180deg)'}}>
                    <ArrowIcon />
                </Box>
            </Box>
            <Box sx={{position: 'relative', zIndex: 2, display: open ? 'block' : 'none'}}>
                <Fade in={open}>
                    <Box sx={{ position: 'absolute', width: 'calc(100vw - 30px)', height: 'calc(100vh - 106px)', right: 0, top: '15px', mx: '15px'}}>
                        <Box sx={{backgroundColor: '#FFF', borderRadius: '20px', boxShadow: '0px 6px 20px rgba(20, 24, 28, 0.1)'}}>
                            <Grid container columns={12} sx={{ pb: 1.5 }}>
                                {alphaes.map(s => {
                                    return <Grid item xs={12}>
                                        <Box key={s.value}>
                                            <Box sx={{ cursor: 'pointer', mx: 1, mt: 1.5, height: '45px', lineHeight: '45px',
                                                display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 0.5}}
                                                onClick={() => handleAlphaChange(s.value)}>
                                                <Box sx={{ color: alpha === s.value ? '#4263EB' : '#333', fontSize: '16px', fontWeight: 700 }}>{ s.label }</Box>
                                            </Box>
                                        </Box>
                                    </Grid>})
                                }
                            </Grid>
                        </Box>
                    </Box>
                </Fade>
            </Box>
            
        </Box>
    )
}

export default AlphaSelect