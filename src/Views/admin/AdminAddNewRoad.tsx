import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Stack, Checkbox, FormControlLabel } from '@mui/material';
import { RoadData } from '../../Services/Interfaces/Interfaces';
import * as activityService from '../../Services/Api/ActivitiesService';
import * as roadService from '../../Services/Api/RoadsService';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from "../../Services/Auth/FirebaseAuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';

const CreateRoads: React.FC = () => {
    const navigate = useNavigate();
    const [activities, setActivities] = useState<any[]>([]);
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
    const { routeId } = useParams();
    const [formData, setFormData] = useState<RoadData>({
        title: '',
        easyDescription: '',
        fullDescription: '',
        activities: [],
        duration: '',
        punctuation: 0,
        img: '',
        activityDetails: [],
    });
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageUpload = (file: File) => {
        setImageUpload(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const uploadFile = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (!file) return resolve('');
            const imageRef = ref(storage, `images/${file.name + v4()}`);
            uploadBytes(imageRef, file)
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            resolve(url);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>, activityId: string) => {
        if (event.target.checked) {
            setSelectedActivities([...selectedActivities, activityId]);
        } else {
            setSelectedActivities(selectedActivities.filter(id => id !== activityId));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingSubmit(true)
        const imageUrl = imageUpload ? await uploadFile(imageUpload) : formData.img;

        const finalData = {
            ...formData,
            img: imageUrl,
            activities: selectedActivities,
        };

        let res;
        if (routeId) {
            res = await roadService.updateRoadById(finalData);
            if (res.status === 200) {
                Swal.fire({
                    title: 'Ruta Actualizada Correctamente'
                });
            } else {
                Swal.fire({
                    title: 'Hubo un error al Actualizar la actividad'
                });
            }
        } else {
            res = await roadService.createRoad(finalData);
            if (res.status === 200) {
                Swal.fire({
                    title: 'Ruta Creada Correctamente'
                });
            } else {
                Swal.fire({
                    title: 'Hubo un error al Crear la Ruta'
                });
            }
        }
        setIsLoadingSubmit(false)
        navigate('/administrador/rutas');
        return res;
    };

    const fetchActivities = async () => {
        const res = await activityService.fetchActivities();
        setActivities(res.data);
        return res;
    };

    const getRoadById = async (id: any) => {
        const res = await roadService.fetchRoadById(id);
        setFormData(res.data);
        setSelectedActivities(res.data.activities);
        setImagePreview(res.data.img);
        return res;
    };

    const handleGoBack = () => {
        navigate(-1); // Esto te llevará a la página anterior
    };
    const markSelectedActivity = (card: any) => {
        const isSelected = selectedActivities.includes(card._id);
        return isSelected;
    }
    useEffect(() => {
        fetchActivities();
    }, []);

    useEffect(() => {
        if (routeId) {
            getRoadById(routeId);
        }
    }, [routeId]);

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '32px',
            paddingInline: { xs: '16px', sm: '24px', md: '48px' }
        }}>
            <Box sx={{
                background: '#fff',
                padding: { xs: '16px', sm: '24px' },
                borderRadius: '10px',
                width: '100%',
                maxWidth: '800px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box onClick={handleGoBack} sx={{
                        background: '#82C6C1',
                        width: '40px',
                        zIndex: 100,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px',
                        cursor: 'pointer'
                    }}>
                        <ArrowBackIcon sx={{
                            color: '#fff',
                            fontSize: { xs: '20px', sm: '24px' }
                        }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontSize: { xs: '20px', sm: '24px', md: '28px' } }}>Formulario de Rutas</Typography>
                    <TextField
                        name="title"
                        label="Título"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                    />
                    <TextField
                        name="easyDescription"
                        label="Descripción Fácil"
                        value={formData.easyDescription}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                        sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                    />
                    <TextField
                        name="fullDescription"
                        label="Descripción Completa"
                        value={formData.fullDescription}
                        onChange={handleChange}
                        multiline
                        rows={6}
                        fullWidth
                        sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                    />
                    <TextField
                        name="duration"
                        label="Duración"
                        value={formData.duration}
                        onChange={handleChange}
                        fullWidth
                        sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                    />
                    <Box>
                        <input
                            type="file"
                            id={`upload-img`}
                            className="upload-image"
                            onChange={(e) => handleImageUpload(e.target.files![0])}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor={`upload-img`} className="upload-image-button" style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            backgroundColor: '#82C6C1',
                            color: '#fff',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>Subir imagen</label>
                    </Box>
                    {imagePreview && (
                        <Box sx={{ marginTop: 2, textAlign: 'center', opacity: .6 }}>
                            <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', sm: '14px' } }}>Vista previa de la imagen:</Typography>
                            <img src={imagePreview} alt="Vista previa" style={{ maxWidth: '100%', height: 'auto', width: '100%' }} />
                        </Box>
                    )}
                    <Stack>
                        <Box sx={{
                            marginTop: '16px',
                            marginBottom: '16px',
                        }}>
                            <Typography sx={{
                                fontSize: { xs: '18px', sm: '20px', md: '26px' },
                                fontWeight: 'bold'
                            }}>Actividades</Typography>
                        </Box>
                        <Stack sx={{
                            flexDirection: 'row',
                            gap: '16px',
                            flexWrap: 'wrap',
                            mt: '24px',
                            mb: '32px',
                            justifyContent: 'center',
                        }}>
                            {activities.map((card: any, index: any) => (
                                <Box sx={{
                                    p: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    gap: {xs:'10px', md:'16px'},
                                    borderRadius: '8px',
                                    background: 'white',
                                    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
                                }} key={index}>
                                    <Box sx={{
                                        width: { xs: '60px', md: '80px' },
                                        height: { xs: 'auto', md: '60px' },
                                        borderRadius: '8px'
                                    }}>
                                        <img src={card.bannerImg} alt={card.title} width={'100%'} height={'100%'} />
                                    </Box>
                                    <Stack flexDirection={'column'}>
                                        <Typography sx={{
                                            fontSize: { xs: '14px', sm: '16px' },
                                            fontWeight: 'bold'
                                        }}>{card.title}</Typography>
                                        <Stack alignItems={'center'} justifyContent={'flex-start'} flexDirection={'row'} gap={'8px'} sx={{
                                            color: 'black',
                                            opacity: '0.7',
                                        }}>
                                            <Typography sx={{
                                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                fontWeight: '400',
                                            }}>{card.genre}</Typography>
                                            <Box sx={{
                                                display: {xs: 'none', md:'inline-flex'},
                                                width: '4px',
                                                height: '4px',
                                                background: 'black',
                                                opacity: '0.7',
                                                borderRadius: '50%'
                                            }}></Box>
                                            <Typography sx={{
                                                display: {xs: 'none', md:'inline-flex'},
                                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                fontWeight: '400',
                                            }}>{card.questions.length} Preguntas</Typography>
                                        </Stack>
                                    </Stack>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={markSelectedActivity(card)}
                                                onChange={(e) => handleActivityChange(e, card._id)}
                                                name={card.title}
                                            />
                                        }
                                        label=""
                                        sx={{ m: 0 }} // Establece el margen izquierdo en 0
                                    />
                                </Box>
                            ))}
                        </Stack>
                    </Stack>
                    <Button type="submit" variant="contained" color="primary" sx={{ fontSize: { xs: '12px', sm: '14px' } }} disabled={isLoadingSubmit}>
                        Enviar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateRoads;