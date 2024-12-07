import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../Services/Auth/FirebaseAuthProvider";

import * as activityService from '../../Services/Api/ActivitiesService'
import * as genresService from '../../Services/Api/GenresService'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
interface Option {
    text: string;
    correct?: boolean;
    order?: number;
}

interface Question {
    type: 'options' | 'order' | 'image-options';
    title?: string;
    options?: Option[];
    description?: string;
    image?: string;
}

const CreateActivity: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [genre, setGenre] = useState<string>('');
    const [genresList, setGenresList] = useState<any[]>([]);
    const [activityTitle, setActivityTitle] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [imageUpload, setImageUpload] = useState<any>(null);
    const [bannerImageUpload, setBannerImageUpload] = useState<any>(null);
    const [bannerImagePreview, setBannerImagePreview] = useState<any>(null);
    const handleBannerImageUpload = (file: File) => {
        setBannerImageUpload(file);
        setBannerImagePreview(URL.createObjectURL(file));
    };
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Esto te llevará a la página anterior
    };
    const uploadBannerFile = (file: File): Promise<string> => {
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
    const addQuestion = () => {
        setQuestions([...questions, { type: 'options', options: [{ text: 'Opción 1', correct: false }] }]);
    };
    const handleChange = (e: SelectChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setGenre(value as string);
    };
    const handleTypeChange = (index: number, newType: 'options' | 'order' | 'image-options') => {
        const newQuestions = [...questions];
        newQuestions[index].type = newType;
        if (newType === 'options' || newType === 'image-options') {
            newQuestions[index].options = [{ text: 'Opción 1', correct: false }];
        } else if (newType === 'order') {
            newQuestions[index].options = [{ text: 'Opción 1', order: 1 }];
        } else {
            delete newQuestions[index].options;
        }
        setQuestions(newQuestions);
    };

    const addOption = (index: number) => {
        const newQuestions = [...questions];
        newQuestions[index].options!.push({ text: `Opción ${newQuestions[index].options!.length + 1}`, order: newQuestions[index].options!.length + 1, correct: false });
        setQuestions(newQuestions);
    };

    const toggleCorrectness = (qIndex: number, oIndex: number) => {
        const newQuestions = [...questions];
        const option = newQuestions[qIndex].options![oIndex];
        option.correct = !option.correct;
        setQuestions(newQuestions);
    };

    const handleOptionTextChange = (qIndex: number, oIndex: number, newText: string) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options![oIndex].text = newText;
        setQuestions(newQuestions);
    };

    const handleOrderChange = (qIndex: number, oIndex: number, newOrder: number) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options![oIndex].order = newOrder;
        setQuestions(newQuestions);
    };

    const handleTitleChange = (index: number, newTitle: string) => {
        const newQuestions = [...questions];
        newQuestions[index].title = newTitle;
        setQuestions(newQuestions);
    };

    const handleDescriptionChange = (index: number, newDescription: string) => {
        const newQuestions = [...questions];
        newQuestions[index].description = newDescription;
        setQuestions(newQuestions);
    };

    const handleImageUpload = (index: number, file: File) => {
        setImageUpload((prev: any) => ({ ...prev, [index]: file }));
    };
    const onCreateActivity = async (body: any) => {
        const response = await activityService.createActivity(body)
        return response;
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedQuestions = await Promise.all(questions.map(async (question, index) => {
            if (question.type === 'image-options' && imageUpload[index]) {
                const imageUrl = await uploadFile(imageUpload[index]!);
                return { ...question, image: imageUrl };
            }
            return question;
        }));
        const bannerImg = await uploadBannerFile(bannerImageUpload!);
        const activityData = {
            title: activityTitle,
            genre: genre,
            description: activityDescription,
            questions: updatedQuestions,
            bannerImg: bannerImg
        };
        const res = await onCreateActivity(activityData);
        if (res.status === 200) {
            Swal.fire({
                title: 'Actividad Creada Correctamente'
            })
        } else {
            Swal.fire({
                title: 'Hubo un error al Actualizar tu actividad'
            })
        }
        handleGoBack();
        return res;
    };
    async function fetchGenres() {
        const res = await genresService.fetchGenres();
        setGenresList(res.data);
    }
    useEffect(() => {
        fetchGenres();
    }, [])

    // Dentro del return
    return (
        <Box sx={{ marginTop: '32px' }} className="activity-container">
            <div className="activity-header">
                <TextField
                    id="activityTitle"
                    label="Título"
                    value={activityTitle}
                    onChange={(e) => setActivityTitle(e.target.value)}
                    placeholder="Título de la Actividad"
                    fullWidth
                />
                <FormControl fullWidth sx={{ marginTop: '16px' }}>
                    <InputLabel id="genre-select-label">Género</InputLabel>
                    <Select
                        labelId="genre-select-label"
                        id="genre-select"
                        value={genre}
                        label="Género"
                        onChange={handleChange}
                    >
                        {genresList.map((genre) => (
                            <MenuItem key={genre.title} value={genre.title}>{genre.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ marginTop: '16px', width: '100%'}}>
                    <Typography variant="subtitle1">Descripción</Typography>
                    <Typography variant="body2" color="textSecondary">{activityDescription.length}/150</Typography>
                    <TextField
                        id="activityDescription"
                        value={activityDescription}
                        onChange={(e) => setActivityDescription(e.target.value)}
                        placeholder="Descripción de la actividad"
                        maxRows={4}
                        multiline
                        fullWidth
                        sx={{
                            width: '100%',
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '16px', width: '100%' }}>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Subir imagen
                        <input
                            type="file"
                            id="upload-banner-img"
                            hidden
                            onChange={(e) => handleBannerImageUpload(e.target.files![0])}
                        />
                    </Button>
                    <Box sx={{ height: {xs:'80px',sm:'200px',md:'250px'}, width: {xs:'200px',sm:'400px',md:'500px'}, opacity: 0.5, background: `url(${bannerImagePreview})`, backgroundPosition: 'center', backgroundSize: 'cover', position: 'relative', border: '2px dashed #c9c9c9' }} />
                </Box>
            </div>
            {questions.map((question, index) => (
                <Box key={index} sx={{ marginTop: '32px' }} className="question-card">
                    <Box sx={{ marginBottom: '16px' }}>
                        <TextField
                            id={`question-title-${index}`}
                            label="Título"
                            value={question.title || ''}
                            onChange={(e) => handleTitleChange(index, e.target.value)}
                            placeholder="Título"
                            fullWidth
                        />
                        <FormControl fullWidth sx={{ marginTop: '16px' }}>
                            <InputLabel id={`question-type-label-${index}`}>Tipo de pregunta</InputLabel>
                            <Select
                                labelId={`question-type-label-${index}`}
                                id={`question-type-select-${index}`}
                                value={question.type}
                                label="Tipo"
                                onChange={(e) => handleTypeChange(index, e.target.value as 'options' | 'image-options')}
                            >
                                <MenuItem value="options">Opciones</MenuItem>
                                <MenuItem value="image-options">Con Imagen</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ marginBottom: '16px' }}>
                        <Typography variant="subtitle1">Descripción</Typography>
                        <Typography variant="body2" color="textSecondary">{question.description?.length || 0}/150</Typography>
                        <TextField
                            id={`question-description-${index}`}
                            value={question.description || ''}
                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                            placeholder="Descripción"
                            maxRows={4}
                            multiline
                            fullWidth
                        />
                    </Box>
                    {question.type === 'options' && (
                        <Box>
                            <Typography variant="subtitle1">Opciones</Typography>
                            {question.options?.map((option, idx) => (
                                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                    <Box
                                        sx={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            border: '1px solid',
                                            marginRight: '8px',
                                            cursor: 'pointer',
                                            backgroundColor: option.correct ? 'green' : 'red',
                                        }}
                                        onClick={() => toggleCorrectness(index, idx)}
                                    />
                                    <TextField
                                        id={`option-text-${index}-${idx}`}
                                        value={option.text}
                                        onChange={(e) => handleOptionTextChange(index, idx, e.target.value)}
                                        fullWidth
                                    />
                                </Box>
                            ))}
                            <Button variant="outlined" onClick={() => addOption(index)}>Nueva opción +</Button>
                        </Box>
                    )}
                    {question.type === 'order' && (
                        <Box>
                            <Typography variant="subtitle1">Opciones</Typography>
                            {question.options?.map((option, idx) => (
                                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                    <TextField
                                        id={`option-text-${index}-${idx}`}
                                        value={option.text}
                                        onChange={(e) => handleOptionTextChange(index, idx, e.target.value)}
                                        fullWidth
                                        sx={{ marginRight: '8px' }}
                                    />
                                    <TextField
                                        type="number"
                                        value={option.order}
                                        onChange={(e) => handleOrderChange(index, idx, parseInt(e.target.value))}
                                        placeholder="1"
                                        fullWidth
                                    />
                                </Box>
                            ))}
                            <Button variant="outlined" onClick={() => addOption(index)}>Nueva opción +</Button>
                        </Box>
                    )}
                    {question.type === 'image-options' && (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ marginBottom: '16px' }}>
                                <Typography variant="subtitle1">Opciones</Typography>
                                {question.options?.map((option, idx) => (
                                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                        <Box
                                            sx={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                border: '1px solid',
                                                marginRight: '8px',
                                                cursor: 'pointer',
                                                backgroundColor: option.correct ? 'green' : 'red',
                                            }}
                                            onClick={() => toggleCorrectness(index, idx)}
                                        />
                                        <TextField
                                            id={`option-text-${index}-${idx}`}
                                            value={option.text}
                                            onChange={(e) => handleOptionTextChange(index, idx, e.target.value)}
                                            fullWidth
                                        />
                                    </Box>
                                ))}
                                <Button variant="outlined" onClick={() => addOption(index)}>Nueva opción +</Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box sx={{ height: '200px', width: '200px', border: '1px solid #ddd', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {imageUpload[index] && <img src={URL.createObjectURL(imageUpload[index])} alt="Vista previa de la imagen" style={{ maxHeight: '100%', maxWidth: '100%' }} />}
                                </Box>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{ marginTop: '16px' }}
                                >
                                    Subir imagen
                                    <input
                                        type="file"
                                        id={`upload-${index}`}
                                        hidden
                                        onChange={(e) => handleImageUpload(index, e.target.files![0])}
                                    />
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                <Button variant="outlined" onClick={addQuestion}>Nueva pregunta +</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Enviar</Button>
            </Box>
        </Box>
    );
};

export default CreateActivity;
