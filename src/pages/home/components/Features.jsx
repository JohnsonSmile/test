import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import CarouselView from "./CarouselView";
import FeaturesGridView from "./FeaturesGridview";
import NotificationBar from "./NotificationBar";



const useStyles = makeStyles({
    'features-container': {
        backgroundColor: '#FFF',
    },
    'features-notibanner': {

    }
})

const Features = (props) => {
    const { features, informations } = props
    const classes = useStyles()
    return (
        <>
            <Box className={classes['features-container']} sx={{ py: 1 }}>
                {/* notification bar */}
                <NotificationBar />
                {/* features grid view */}
                <FeaturesGridView features={features} />
                {/* Carousel for infomations from backend */}
                <CarouselView informations={informations}/>
            </Box>
        </>
    )
}

export default Features