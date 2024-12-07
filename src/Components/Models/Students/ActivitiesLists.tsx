import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import expand from '../../../assets/icons/expand.png';
import cover1 from '../../../assets/images/cover1.png';
import { Link } from "react-router-dom";
import * as activitiesService from '../../../Services/Api/ActivitiesService';
import Loader from "../shared/Loader";
import { Activity } from "../../../Services/Interfaces/Interfaces";

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

interface GeneroCantidad {
    genero: string;
    cantidad: number;
}

export default function ActivitiesList() {
    const [activitiesInfo, setActivitiesInfo] = useState<Activity[]>(activitiesInfoDefault);
    const [limit, setLimit] = useState(1);
    const [genres, setGenres] = useState<GeneroCantidad[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    function contarActividadesPorGenero(actividades: Activity[]): GeneroCantidad[] {
        const conteoPorGenero: Record<string, number> = {};

        actividades.forEach((actividad) => {
            const genero = actividad.genre;

            if (!conteoPorGenero[genero]) {
                conteoPorGenero[genero] = 0;
            }

            conteoPorGenero[genero]++;
        });

        const resultado: GeneroCantidad[] = Object.keys(conteoPorGenero).map((genero) => ({
            genero: genero,
            cantidad: conteoPorGenero[genero],
        }));

        setGenres(resultado);
        return resultado;
    }

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
        await contarActividadesPorGenero(res.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchActivities();
    }, []);

    const filteredActivities = useMemo(() => {
        if (selectedGenre) {
            return activitiesInfo.filter((actividad) => actividad.genre === selectedGenre);
        }
        return activitiesInfo;
    }, [activitiesInfo, selectedGenre]);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            mb: '32px'
        }}>
            <Stack width='100%' flexDirection='row' alignItems='center' justifyContent='space-between' mb='28px'>
                <Typography sx={{
                    fontFamily: 'Bebas neue',
                    fontSize: { xs: '32px', sm: '42px' },
                    color: '#307071',
                    fontWeight: 'bold'
                }}>
                    Actividades
                </Typography>
            </Stack>
            <Stack
                alignItems='center'
                justifyContent='center'
                flexDirection='row'
                sx={{
                    px: { xs: '0', sm: '60px' },
                    flexWrap: 'wrap',
                    gap: '16px',
                    width: '100%',
                    mb:'12px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        flexWrap: 'wrap'
                    }}
                >
                    <Button
                        onClick={() => setSelectedGenre(null)}
                        sx={{
                            border: '1px solid #49437B',
                            borderRadius: '24px',
                            py: '4px',
                            px: '12px',
                            cursor: 'pointer',
                            ":hover": {
                                color: 'white',
                                backgroundColor: '#49437B'
                            },
                            backgroundColor: selectedGenre === null ? '#49437B' : 'transparent',
                            color: selectedGenre === null ? 'white' : 'inherit'
                        }}
                    >
                        Mostrar todo
                    </Button>
                    {genres.slice(0, limit).map((genre, index) => (
                        <Stack
                            key={index}
                            flexDirection='row'
                            gap='6px'
                            alignItems='center'
                            sx={{
                                border: '1px solid #49437B',
                                borderRadius: '24px',
                                py: '4px',
                                px: '12px',
                                cursor: 'pointer',
                                ":hover": {
                                    color: 'white',
                                    backgroundColor: '#49437B'
                                },
                                backgroundColor: selectedGenre === genre.genero ? '#49437B' : 'transparent',
                                color: selectedGenre === genre.genero ? 'white' : 'inherit'
                            }}
                            onClick={() => setSelectedGenre(genre.genero)}
                        >
                            <Typography sx={{
                                fontSize: { sx: '10px', sm: '12px', md: '14px' }
                            }}>{genre.genero}</Typography>
                            <Box sx={{
                                px: '10px',
                                py: '3px',
                                background: '#49437B',
                                borderRadius: '18px',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}>
                                {genre.cantidad}
                            </Box>
                        </Stack>
                    ))}
                </Box>
                <Box>
                    <Button
                        sx={{
                            color: 'black',
                            opacity: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            borderRadius: '20px',
                        }}
                        onClick={expandLimit}
                    >
                        Expand
                        <img src={expand} alt="expand" width='12px' height='14px' />
                    </Button>
                </Box>
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
                        centeredSlidesBounds={true}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1.5,
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
                                gap: { sm: '10px', md: '20px' },
                                borderRadius: '8px',
                                background: 'white',
                                width: { sm: '180px', md: '370px' },
                                flexDirection: { sm: 'column', md: 'row' }
                            }}>
                                <Box sx={{
                                    width: { sm: '100%', md: '100px' },
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
                                        fontSize: { sm: '14px', md: '16px' },
                                        fontWeight: 'bold',
                                        textAlign: { xs: 'center', sm: 'center', md: 'left' }
                                    }}>{card.title}</Typography>
                                    <Stack alignItems='center' flexDirection='row' gap='10px' sx={{
                                        color: 'black',
                                        opacity: '0.7',
                                        mt: '5px',
                                        justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' },
                                    }}>
                                        <Typography sx={{
                                            fontSize: { sm: '12px', md: '14px' },
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
                                            fontSize: { sm: '12px', md: '14px' },
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