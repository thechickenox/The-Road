import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import *  as roadsService from '../../Services/Api/RoadsService'
import { RoadData } from "../../Services/Interfaces/Interfaces";
import { Link, useNavigate, useParams } from 'react-router-dom';
import img1 from '../../assets/images/amazoncover.png'
import Loader from "../../Components/Models/shared/Loader";
import { Stack } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function IndividualRoads() {
    const [roads, setRoad] = useState<RoadData>();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Esto te llevará a la página anterior
    };

    const { routeId } = useParams();
    const getRoad = async () => {
        try {
            setIsLoading(false);
            const data = await roadsService.fetchRoadById(routeId!);
            if (!data) {
                throw new Error('Road not found')
            }
            setRoad(data.data);
            setIsLoading(true);
        } catch (error) {
            console.error('Error fetching roads:', error);
        }
    };
    useEffect(() => {
        getRoad();
    }, []);
    return (
        <Box position={'relative'}>
            <Box onClick={handleGoBack} sx={{
                position: 'absolute',
                top: 20,
                left: 50,
                background: '#82C6C1',
                zIndex: 100,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                cursor: 'pointer'
            }}>
                <ArrowBackIcon sx={{
                    color: '#fff'
                }}></ArrowBackIcon>
            </Box>
            {!isLoading ? (
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
                <>
                    <Box sx={{
                        height: '300px',
                        width: '100%',
                        background: `url(${roads!.img})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        position: 'relative',
                    }}></Box>
                    <Box sx={{
                        paddingInline: '42px',
                        mt: '32px',
                        width: '100%',
                    }}>
                        <Stack sx={{
                            paddingBottom: '18px',
                            borderBottom: '2px solid white',
                        }} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Box sx={{
                            }}>
                                <Typography fontSize={'32px'}>{roads?.title}</Typography>
                                <Typography fontSize={'16px'}>{roads?.fullDescription}</Typography>
                            </Box>
                        </Stack>
                        <Stack>
                            <Box sx={{
                                marginTop: '16px',
                                marginBottom: '16px',
                            }}>
                                <Typography fontSize={'26px'}>Actividades</Typography>
                            </Box>
                            <Stack sx={{
                                flexDirection: 'row',
                                gap: '32px',
                                flexWrap: 'wrap',
                                mt: '24px',
                                mb: '32px',
                                justifyContent: 'flex-start',
                            }}>
                                {roads!.activityDetails.map((card: any, index: any) => {
                                    return (
                                        <Link key={index} to={`/estudiantes/actividad/${card._id}`}>
                                            <Box sx={{
                                                p: '10px',
                                                paddingRight: '38px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                gap: '20px',
                                                borderRadius: '8px',
                                                background: 'white'
                                            }} >
                                                <Box sx={{
                                                    width: '104px',
                                                    height: '82px',
                                                    borderRadius: '8px',
                                                    background: `url(${card.bannerImg})`,
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    position: 'relative',
                                                }}>
                                                </Box>
                                                <Stack flexDirection={'column'}>
                                                    <Typography sx={{
                                                        fontSize: '16px',
                                                        fontWeight: 'bold'
                                                    }}>{card.title}</Typography>
                                                    <Stack alignItems={'center'} justifyContent={'flex-start'} flexDirection={'row'} gap={'10px'} sx={{
                                                        color: 'black',
                                                        opacity: '0.7',
                                                    }}>
                                                        <Typography sx={{
                                                            fontSize: '14px',
                                                            fontWeight: '400',
                                                        }}>{card.language}</Typography>
                                                        <Box sx={{
                                                            width: '4px',
                                                            height: '4px',
                                                            background: 'black',
                                                            opacity: '0.7',
                                                            borderRadius: '50%'
                                                        }}></Box>
                                                        <Typography sx={{
                                                            fontSize: '14px',
                                                            fontWeight: '400'
                                                        }}>{card.questions.length} Preguntas</Typography>
                                                    </Stack>
                                                    <Stack alignItems={'center'} justifyContent={'flex-start'} flexDirection={'row'} gap={'10px'} sx={{
                                                        color: 'black',
                                                        opacity: '0.4',
                                                    }}>
                                                        <Typography sx={{
                                                            fontSize: '14px',
                                                            fontWeight: '900',
                                                        }}>
                                                            {card.punctuation}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        </Link>
                                    )
                                })
                                }
                            </Stack>
                        </Stack>
                    </Box>
                </>
            }
        </Box>
    )
}