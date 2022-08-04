import { Box, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const FeaturesGridView = (props) => {
    const { features } = props
    const navigate = useNavigate()
    const handleFeatureClick = (feature) => {
        if (feature.isReady) {
            navigate(feature.url)
        } else {
            toast.warn("暂未开放相关功能...")
        }
    }

    return (

        <Grid container columns={15} sx={{
            px: 2,
            py: 1,
            backgroundColor: '#4263EB'
        }}>
        {features.map((feature, index) => (
            <Grid item xs={3} key={index} sx={{
                opacity: feature.isReady ? 1 : 0.5}}>
                <Box sx={{
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 1,
                    cursor: 'pointer',
                    }}
                    onClick={() => { handleFeatureClick(feature) }}
                    >
                    <Box sx={{ width: 40, height: 40, backgroundColor: '#FFF', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {feature.image}
                    </Box>
                </Box>
                <Typography sx={{mt: 0.5, fontSize: 12, fontWeight: 500}} >{feature.title}</Typography>
            </Grid>
        ))}
        </Grid>
    )
}
export default FeaturesGridView