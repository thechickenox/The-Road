import { Box, Button, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import Loader from "../shared/Loader"
import * as activitiesService from '../../../Services/Api/ActivitiesService';
import * as genreService from '../../../Services/Api/GenresService';
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Virtual } from "swiper/modules"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Activity } from "../../../Services/Interfaces/Interfaces"
interface GeneroCantidad {
    genero: string;
    cantidad: number;
}
export default function GenresList() {
    const [genres, setGenres] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true);
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
    async function fetchActivities() {
        setIsLoading(true);
        const res = await activitiesService.fetchActivities();
        const genresRes = await genreService.fetchGenres();
        setGenres(genresRes.data);
        const generosActuales = await contarActividadesPorGenero(res.data);
        const filteredGenres = genresRes.data.filter((g2: any) =>
            generosActuales.some(g1 => g1.genero === g2.title)
        );
        setGenres(filteredGenres);
        setIsLoading(false);
    }
    useEffect(() => {
        
        fetchActivities();
        
    }, [])
    return (
        <>
            <Box>
                <Stack width={'100%'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} mb={'28px'}>
                    <Typography sx={{
                        fontFamily: 'Bebas neue',
                        fontSize: {xs:'32px',sm:'42px'},
                        color: '#307071',
                        fontWeight: 'bold'
                    }}>
                        Generos
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
                ) :
                    <Stack sx={{
                        flexDirection: 'row',
                        gap: '32px',
                        flexWrap: 'wrap',
                        mt: '24px',
                        mb: '12px',
                        justifyContent: 'center',
                        width: '85vw'
                    }}>
                        <Swiper modules={[Navigation, Pagination, Virtual]}
                            slidesPerView={2}
                            spaceBetween={20}
                            centeredSlidesBounds={true}
                            breakpoints={{
                                400: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                600: {
                                    slidesPerView: 3.2,
                                    spaceBetween: 20,
                                },
                                900: {
                                    slidesPerView: 5,
                                    spaceBetween: 30,
                                },
                                1200: {
                                    slidesPerView: 5,
                                    spaceBetween: 40,
                                },
                            }}
                            navigation
                            virtual
                            pagination={{ clickable: true }}>

                            {genres!.map((card: any, index: any) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <Link key={index} to={`/estudiantes/generos/${card.title}`}>
                                            <Box sx={{
                                                px: '10px',
                                                py: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                gap: '10px',
                                                borderRadius: '8px',
                                                background: 'white',
                                                mb: '45px',
                                            }} key={index}>
                                                <Box sx={{
                                                    width: '90px',
                                                    height: '90px',
                                                    background: `url(${card!.bannerImg})`,
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    borderRadius: '19px'
                                                }}></Box>
                                                <Typography sx={{
                                                    textAlign: 'center'
                                                }}>{card.title}</Typography>
                                            </Box>
                                        </Link>
                                    </SwiperSlide>
                                )
                            })
                            }
                        </Swiper>
                    </Stack>
                }
            </Box>
        </>
    )
}