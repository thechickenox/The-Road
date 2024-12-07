import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import { RoadData } from "../../../Services/Interfaces/Interfaces";
import * as roadsService from '../../../Services/Api/RoadsService';
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function BestRoutes({title}: any) {
    const [roads, setRoads] = useState<RoadData[]>([]);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const getRoads = async () => {
        try {
            const data = await roadsService.fetchRoads();
            setRoads(data.data);
        } catch (error) {
            console.error('Error fetching roads:', error);
        }
    };

    useEffect(() => {
        getRoads();
    }, []);

    return (
        <Box sx={{
            width: '100%'
        }}>
            <Stack
                width='100%'
                flexDirection='row'
                alignItems='center'
                justifyContent='space-between'
                mb='28px'
            >
                <Typography sx={{
                    fontFamily: 'Bebas neue',
                    fontSize: { xs: '24px', sm: '32px' },
                    color: '#307071',
                    fontWeight: 'bold'
                }}>
                    {title ? title : 'Las mejores Rutas'}
                </Typography>
            </Stack>
            <Box sx={{
                width: '85vw'
            }}>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={isSmallScreen ? 10 : 20}
                    slidesPerView={1}
                    initialSlide={2}
                    centeredSlides={true}
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
                            slidesPerView: 2.2,
                            spaceBetween: 30,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    navigation
                >
                    {roads.slice(0, 6).map((card, index) => (
                        <SwiperSlide key={index}>
                            <Link to={`/estudiantes/rutas/${card._id}`}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderRadius: '8px',
                                    background: 'white',
                                    gap:'16px',
                                    mx: 'auto',
                                    p: '12px'
                                }}>
                                    <Box sx={{
                                        width: '40%',
                                        height: { xs: '85px', sm: '90px', md: '100px' },
                                        borderRadius: '8px',
                                        background: `url(${card.img})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover'
                                    }} />
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        width: '60%',
                                    }}>
                                        <Box sx={{
                                            height: 'fit-content',
                                        }}>
                                            <Typography sx={{
                                                fontSize: { xs: '14px', sm: '16px', md: '18px' },
                                                fontWeight: 'bold',
                                                mb: '8px',
                                                textAlign: 'left',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                {card.title}
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: { xs: '11px', sm: '13px', md: '15px' },
                                                fontWeight: '400',
                                                textAlign: 'left',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                width: '80%'
                                            }}>
                                                {card.easyDescription}
                                            </Typography>

                                        </Box>
                                        <Typography sx={{
                                            fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                            opacity: '.6',
                                            fontWeight: '400',
                                            mt: 'auto',
                                            textAlign: 'left',
                                            height: 'fit-content'
                                        }}>
                                            {card.activities.length} Actividades
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
}