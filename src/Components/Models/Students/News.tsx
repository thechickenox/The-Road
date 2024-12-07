import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import news1 from '../../../assets/images/news1.png';
import news2 from '../../../assets/images/news2.png';
import news3 from '../../../assets/images/news3.png';

export default function News() {
    return (
        <Box sx={{
            width: '100%',
            display: { xs: 'block', sm: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px'
        }}>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <Swiper
                    spaceBetween={16}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                >
                    <SwiperSlide>
                        <Box sx={{
                            backgroundImage: `url(${news1})`,
                            height: '203px',
                            width: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center left',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '16px'
                        }}></Box>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Box sx={{
                            backgroundImage: `url(${news2})`,
                            height: '203px',
                            width: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '16px'
                        }}></Box>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Box sx={{
                            backgroundImage: `url(${news3})`,
                            height: '203px',
                            width: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '16px'
                        }}></Box>
                    </SwiperSlide>
                </Swiper>
            </Box>
            <Box sx={{
                display: { xs: 'none', sm: 'flex' },
                gap: '32px',
                width: '100%',
                justifyContent: 'space-between'
            }}>
                <Box sx={{
                    backgroundImage: `url(${news1})`,
                    height: '203px',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '16px'
                }}></Box>
                <Box sx={{
                    backgroundImage: `url(${news2})`,
                    height: '203px',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '16px'
                }}></Box>
                <Box sx={{
                    backgroundImage: `url(${news3})`,
                    height: '203px',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '16px'
                }}></Box>
            </Box>
        </Box>
    );
}
