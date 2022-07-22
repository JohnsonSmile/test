import { Box } from "@mui/material"
import CarouselView from "./CarouselView";
import FeaturesGridView from "./FeaturesGridview";
import NotificationBar from "./NotificationBar";



const Features = (props) => {
    const { features, informations } = props
    return (
        <>
            <Box>
                {/* notification bar */}
                {/* <NotificationBar /> */}
                {/* features grid view */}
                <FeaturesGridView features={features} />
                {/* Carousel for infomations from backend */}
                <CarouselView informations={informations}/>
            </Box>
        </>
    )
}

export default Features