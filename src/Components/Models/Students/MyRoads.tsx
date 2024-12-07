import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import img1 from '../../../assets/images/amazoncover.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import *  as roadsService from '../../../Services/Api/RoadsService'
// Import Swiper styles
import 'swiper/css';
import { RoadData } from "../../../Services/Interfaces/Interfaces";
import { Link, useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from "swiper/modules";

const cardsInfo = [
    {
        _id: 'holas',
        title: 'AWS Course',
        easyDescription: 'Must-do list for interview prep',
        activities: [1, 0, 2, 4, 5, 5],
        duration: '2',
        img: img1,
        punctuation: 4,
    },
    {
        _id: 'holas',
        title: 'HTML Road',
        easyDescription: 'Must-do list for interview prep',
        activities: [1, 0, 2, 4, 5, 5],
        duration: '2',
        img: img1,
        punctuation: 4,
    },
    {
        _id: 'holas',
        title: 'HTML Road',
        easyDescription: 'Must-do list for interview prep',
        activities: [1, 0, 2, 4, 5, 5],
        duration: '2',
        img: img1,
        punctuation: 4,
    },
    {
        _id: 'holas',
        title: 'HTML Road',
        easyDescription: 'Must-do list for interview prep',
        activities: [1, 0, 2, 4, 5, 5],
        duration: '2',
        img: img1,
        punctuation: 4,
    },
    {
        _id: 'holas',
        title: 'HTML Road',
        easyDescription: 'Must-do list for interview prep',
        activities: [1, 0, 2, 4, 5, 5],
        duration: '2',
        img: img1,
        punctuation: 4,
    },
    {
        _id: 'holas',
        title: 'HTML Road',
        easyDescription: 'Must-do list for interview prep',
        activities: [1, 0, 2, 4, 5, 5],
        duration: '2',
        img: img1,
        punctuation: 4,
    },
    {
        _id: 'holas',
        title: 'HTML Road',
        easyDescription: 'Must-do list for interview prep',
        activities: [1, 0, 2, 4, 5, 5],
        duration: '2',
        img: img1,
        punctuation: 4,
    },
    {
        _id: 'holas',
        title: 'HTML Road',
        easyDescription: 'Must-do list for interview prep',
        activities: [1, 0, 2, 4, 5, 5],
        duration: '2',
        img: img1,
        punctuation: 4,
    },
    {
        _id: 'holas',
        title: 'HTML Road',
        easyDescription: 'Must-do list for interview prep',
        activities: [1, 0, 2, 4, 5, 5],
        duration: '2',
        img: img1,
        punctuation: 4,
    },
    {
        _id: 'holas',
        title: 'HTML Road',
        easyDescription: 'Must-do list for interview prep',
        activities: [1, 0, 2, 4, 5, 5],
        duration: '2',
        img: img1,
        punctuation: 4,
    },
]
export default function MyRoads() {
    const navigate = useNavigate();
    const [roads, setRoads] = useState<RoadData[]>([]);
    const getRoads = async () => {
        try {
            const data = await roadsService.fetchRoads();
            setRoads(data.data);
        } catch (error) {
            console.error('Error fetching roads:', error);
        }
    };
    function redirectTo(route: string) {
        navigate(route);
    }
    useEffect(() => {
        getRoads();
    }, []);
    return (
        <Box>
            <Stack width={'100%'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} mb={'28px'}>
                <Typography sx={{
                    fontFamily: 'Bebas neue',
                    fontSize: { xs: '32px', sm: '42px' },
                    color: '#307071',
                    fontWeight: 'bold'
                }}>
                    Mis Rutas
                </Typography>
            </Stack>
            <Box sx={{
                width: '86vw'
            }}>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    centeredSlidesBounds={true}
                    breakpoints={{
                        400: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        600: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        900: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {roads.slice(0, 6).map((card, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Box onClick={() => { redirectTo(`${card._id}`) }} sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    gap: '0'
                                }}>
                                    <Box sx={{
                                        height: '180px',
                                        width: '100%',
                                        borderRadius: '10px 10px 0 0',
                                        background: `url(${card.img})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        position: 'relative',
                                    }}>
                                    </Box>
                                    <Box sx={{
                                        background: 'white',
                                        borderRadius: '0 0 10px 10px',
                                        height: '125px',
                                        width: '100%',
                                    }}>
                                        <Stack sx={{
                                            height: '100%',
                                            py: '16px',
                                            paddingInline: '16px',
                                            alignItems: 'center',
                                        }}>
                                            <Typography sx={{
                                                whiteSpace: 'wrap',
                                                cursor: 'pointer',
                                                fontSize: '16px',
                                                fontFamily: 'Montserrat',
                                                marginBottom: '10px',
                                                textAlign: 'center',
                                                fontWeight: 'bold'
                                            }}>{card.title}</Typography>
                                            <Typography sx={{
                                                whiteSpace: 'wrap',
                                                fontSize: '14px'
                                            }}>{card.easyDescription}</Typography>
                                            <Typography>{card.punctuation}</Typography>
                                        </Stack>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        )
                    })
                    }
                </Swiper>
            </Box>
        </Box>
    );
}