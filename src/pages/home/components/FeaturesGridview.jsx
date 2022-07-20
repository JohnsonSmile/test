import { Box, CardMedia, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const FeaturesGridView = (props) => {
    const { features } = props
    const navigate = useNavigate()
    const handleFeatureClick = (feature) => {
        navigate(feature.url)
    }

    return (

        <Grid container columns={15} sx={{
            px: 2,
            py: 1,
        }}>
        {features.map((feature, index) => (
            <Grid item xs={3} key={index}>
                <Box sx={{
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 1,
                    cursor: 'pointer'
                    }}
                    onClick={() => { handleFeatureClick(feature) }}
                    >
                    <CardMedia 
                        component={'img'}
                        sx={{
                            height: 48,
                            width: 48,
                            borderRadius: '50%'
                        }}
                        image={feature.image ? feature.image :'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500'} />
                </Box>
                <Typography variant={'subtitle2'} color='InfoText' sx={{mt: 1}} >{feature.title}</Typography>
                <Typography style={{ color: feature.isReady ? 'transparent' :'red', fontSize: '10px'}} >{'即将上线'}</Typography>
            </Grid>
        ))}
        </Grid>
    )
}
export default FeaturesGridView