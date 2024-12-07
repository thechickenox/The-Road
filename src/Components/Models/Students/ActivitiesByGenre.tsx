import React, { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import cover1 from '../../../assets/images/cover1.png';
import { Link, useParams } from "react-router-dom";
import Loader from "../shared/Loader";
import { Activity } from "../../../Services/Interfaces/Interfaces";
import * as activitiesService from '../../../Services/Api/ActivitiesService';
const activitiesInfoDefault: Activity[] = [
    {
        _id: '2544590422454322',
        title: 'HTML Basics',
        genre: 'HTML',
        description: '',
        questions: [
            {
                name: '',
                options: [
                    {
                        title: '',
                        valid: true,
                        index: 0
                    }
                ]
            }
        ],
        bannerImg: cover1,
    }
];

const languages = [
    {
        title: 'JavaScript',
        quantity: 30
    }
];

export default function ActivitiesByGenre() {
    const [activitiesInfo, setActivitiesInfo] = useState<Activity[]>(activitiesInfoDefault);
    const [limit, setLimit] = useState(6);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const { activityGenre } = useParams();

    function expandLimit() {
        if (limit === 6) {
            setLimit(languages.length);
        } else {
            setLimit(6);
        }
    }

    async function fetchActivities() {
        setIsLoading(true);
        const res = await activitiesService.fetchActivities();
        setActivitiesInfo(res.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchActivities();
    }, []);

    const filteredActivities = useMemo(() => {
        if (activityGenre) {
            return activitiesInfo.filter((actividad) => actividad.genre === activityGenre);
        }
        return activitiesInfo;
    }, [activitiesInfo]);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            marginTop: {xs: '25px', sm:'25px'}
        }}>
            <Stack width='100%' flexDirection='row' alignItems='center' justifyContent='space-between' mb='28px'>
                <Typography sx={{
                    fontFamily: 'Bebas neue',
                    fontSize: {xs:'32px',sm:'42px'},
                    color: '#307071',
                    fontWeight: 'bold'
                }}>
                    Actividades de { activityGenre }
                </Typography>
            </Stack>
            {isLoading ? (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%'
                }}>
                    <Loader />
                </Box>
            ) : (
                <Box sx={{ display: isSmallScreen ? 'block' : 'none' }}>
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={1.5}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                grid: {
                                    rows: 2,
                                },
                            },
                        }}
                    >
                        {filteredActivities.map((card, index) => (
                            <SwiperSlide key={index}>
                                <Link to={`/estudiantes/actividad/${card._id}`}>
                                    <Box sx={{
                                        paddingBottom: '24px',
                                        px: { xs: '0px', sm: '10px' }, 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '20px',
                                        borderRadius: '8px',
                                        background: 'white',
                                        width: '100%',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    }}>
                                        <Box sx={{
                                            width: '100%',
                                            height: '150px',
                                            borderRadius: '8px 8px 0 0',
                                            background: `url(${card.bannerImg})`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            position: 'relative',
                                        }} />
                                        <Stack flexDirection='column' alignItems='center'>
                                            <Typography sx={{
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }}>{card.title}</Typography>
                                            <Stack alignItems='center' justifyContent='center' flexDirection='row' gap='10px' sx={{
                                                color: 'black',
                                                opacity: '0.7',
                                            }}>
                                                <Typography sx={{
                                                    fontSize: '14px',
                                                    fontWeight: '400',
                                                }}>{card.genre}</Typography>
                                                <Box sx={{
                                                    width: '4px',
                                                    height: '4px',
                                                    background: 'black',
                                                    opacity: '0.7',
                                                    borderRadius: '50%'
                                                }} />
                                                <Typography sx={{
                                                    fontSize: '14px',
                                                    fontWeight: '400'
                                                }}>{card.questions.length} Preguntas</Typography>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            )}
            {!isLoading && (
                <Stack sx={{
                    display: { xs: 'none', sm: 'flex' },
                    flexDirection: 'row',
                    gap: '32px',
                    flexWrap: 'wrap',
                    mt: '24px',
                    mb: '32px',
                    justifyContent: 'center',
                }}>
                    {filteredActivities.map((card, index) => (
                        <Link key={index} to={`/estudiantes/actividad/${card._id}`}>
                            <Box sx={{
                                p: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: {sm:'10px',md:'20px'},
                                borderRadius: '8px',
                                background: 'white',
                                width: {sm:'180px',md:'370px'},
                                flexDirection: { sm:'column',md:'row'}
                            }}>
                                <Box sx={{
                                    width: {sm:'100%',md:'140px'},
                                    height: '82px',
                                    borderRadius: '8px',
                                    background: `url(${card.bannerImg})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    position: 'relative',
                                }} />
                                <Stack flexDirection='column' sx={{
                                    mb: '10px'
                                }}>
                                    <Typography sx={{
                                        textAlign: 'center',
                                        fontSize: {sm:'14px',md:'16px'},
                                        fontWeight: 'bold'
                                    }}>{card.title}</Typography>
                                    <Stack alignItems='center' justifyContent='flex-start' flexDirection='row' gap='10px' sx={{
                                        color: 'black',
                                        opacity: '0.7',
                                        mt: '5px'
                                    }}>
                                        <Typography sx={{
                                            fontSize: {sm:'12px',md:'14px'},
                                            fontWeight: '400',
                                        }}>{card.genre}</Typography>
                                        <Box sx={{
                                            width: '4px',
                                            height: '4px',
                                            background: 'black',
                                            opacity: '0.7',
                                            borderRadius: '50%'
                                        }} />
                                        <Typography sx={{
                                            fontSize: {sm:'12px',md:'14px'},
                                            fontWeight: '400'
                                        }}>{card.questions.length} Preguntas</Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Link>
                    ))}
                </Stack>
            )}
        </Box>
    );
}