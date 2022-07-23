import { Box, CardMedia } from "@mui/material"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./CarouselView.css";


const CarouselView = (props) => {
    const { informations } = props
    return (
        <Box sx={{ px: 3, pb: 3, pt: 2, backgroundColor: '#4263EB', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
            <Box sx={{ borderRadius: '20px', overflow: 'hidden' }}>
                <Carousel autoPlay infiniteLoop 
                    showArrows={false} 
                    showStatus={false} 
                    showThumbs={false}
                    renderIndicator={(clickHandler,isSelected,index,label) => {
                        if (isSelected) {
                            return <Box sx={{ width: 16, height: 4, background: '#4263EB', borderRadius: 50, mx: 0.5 }} />
                        } else {
                            return <Box sx={{ width: 4, height: 4, background: '#D0D8F5', borderRadius: 50, mx: 0.5 }} />
                        }
                    }} >
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
        </Box>
    )
}

export default CarouselView