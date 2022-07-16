import { Box, CardMedia } from "@mui/material"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


const CarouselView = (props) => {
    const { informations } = props
    return (
        <Box sx={{ px: 3, pb: 1, pt: 2}}>
            <Carousel autoPlay infiniteLoop showArrows={false} showStatus={false} showThumbs={false}>
            {informations.map((information, index) => (
                <CardMedia 
                    key={index}
                    component={'img'}
                    sx={{
                        height: 160,
                    }}
                    image={'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500'} />
                ))}
            </Carousel>
        </Box>
    )
}

export default CarouselView