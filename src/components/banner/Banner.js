import React from 'react'
import { Container, Typography } from '@mui/material';
import Carousel from './Carousel';
const Banner = () => {
    const bannerStyle = {
        backgroundImage: "url(./banner2.jpg)",
    }
    const bannerContentStyle = {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 5,
        justifyContent: "space-around",
    }
    const taglineStyle = {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    }


    return (
        <>
            <div className="banner" style={bannerStyle}>
                <Container className='banner-content' sx={bannerContentStyle}>
                   
                        <div className="tagline" style={taglineStyle}>
                            <Typography variant="h2"
                                style={{
                                    fontWeight: "bold",
                                    marginBottom: 15,
                                    fontFamily: "Montserrat",
                                }}>
                                Crypto Tracker
                            </Typography>
                            <Typography variant="subtitle2"
                                style={{
                                    color: "darkgrey",
                                    textTransform: "capitalize",
                                    fontFamily: "Montserrat",
                                }}>
                                Get all the Info regarding your favorite Crypto Currency
                            </Typography>
                        </div>

               

                    <Carousel />
                </Container>
            </div>
        </>
    )
}

export default Banner