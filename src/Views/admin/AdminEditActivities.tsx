import React, { useEffect } from 'react';
import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
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
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

const EditActivity: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activity, setActivity] = useState<any>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [genre, setGenre] = useState<string>('');
    const [genresList, setGenresList] = useState<any[]>([]);
    const [activityTitle, setActivityTitle] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [imageUpload, setImageUpload] = useState<any>(null);
    const [bannerImageUpload, setBannerImageUpload] = useState<any>(null);
    const [bannerImagePreview, setBannerImagePreview] = useState<any>(null);
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

    const handleChange = (e: SelectChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setGenre(value as string);
    };
    const addQuestion = () => {
        setQuestions([...questions, { type: 'options', options: [{ text: 'Opción 1', correct: false }] }]);
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
    const handleBannerImageUpload = (file: File) => {
        setBannerImageUpload(file);
        setBannerImagePreview(URL.createObjectURL(file));
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
    const handleImageUpload = (index: number, file: File) => {
        setImageUpload((prev: any) => ({ ...prev, [index]: file }));
    };
    const onUpdateActivity = async (body: any) => {
        const response = await activityService.updateActivityById(body)
        return response;
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let res;
        if(imageUpload == null){
            const activityData = {
                _id: id,
                title: activityTitle,
                genre: genre,
                description: activityDescription,
                questions: questions
            };
            res = await onUpdateActivity(activityData);
        }else{
            const updatedQuestions = await Promise.all(questions.map(async (question, index) => {
                if (question.type === 'image-options' && imageUpload[index]) {
                    const imageUrl = await uploadFile(imageUpload[index]!);
                    return { ...question, image: imageUrl };
                }
                return question;
            }));
            const bannerImg = await uploadBannerFile(bannerImageUpload!);
            const activityData = {
                _id: id,
                title: activityTitle,
                genre: genre,
                description: activityDescription,
                questions: updatedQuestions,
                bannerImg: bannerImg
            };
            res = await onUpdateActivity(activityData);
            
        }
        if(res.status === 200){
            Swal.fire({
                title: 'Actividad Actualizada Correctamente'
            })
        }else{
            Swal.fire({
                title: 'Hubo un error al Actualizar tu actividad'
            })
        }
        handleGoBack();
        return res;
    };
    async function getActivityById(id: string) {
        const res = await activityService.fetchActivityById(id);
        setGenre(res.data.genre);
        setQuestions(res.data.questions);
        setActivityDescription(res.data.description);
        setActivityTitle(res.data.title);
        setBannerImagePreview(res.data.bannerImg);
    }
    const handleGoBack = () => {
        navigate(-1); // Esto te llevará a la página anterior
    };
    async function fetchGenres() {
        const res = await genresService.fetchGenres();
        setGenresList(res.data);
    }
    useEffect(() => {
        fetchGenres();
    }, [])
    useEffect(() => {
        if (id) {
            getActivityById(id)
        }
    }, []);
    return (
        <Box sx={{
            marginTop: '32px'
        }} className="activity-container">
            <Box onClick={handleGoBack} sx={{
                background: '#82C6C1',
                width: '45px',
                zIndex: 100,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                cursor: 'pointer',
                marginBottom: '10px'
            }}>
                <ArrowBackIcon sx={{
                    color: '#fff'
                }}></ArrowBackIcon>
            </Box>
            <div className="activity-header">
                <label htmlFor="activityTitle" className="activity-title-label">Título</label>
                <input
                    id="activityTitle"
                    type="text"
                    value={activityTitle}
                    onChange={(e) => setActivityTitle(e.target.value)}
                    placeholder="Título de la Actividad"
                    className="activity-input"
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Genero</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={genre}
                        label="genre"
                        onChange={handleChange}
                    >
                        {
                            genresList.map((genre) => {
                                return (
                                    <MenuItem key='genre' value={genre.title}>{genre.title}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <div className="description-container">
                    <label htmlFor="activityDescription">Descripción</label>
                    <label htmlFor="activityDescription" className="char-counter">{activityDescription.length}/150</label>
                    <textarea
                        id="activityDescription"
                        value={activityDescription}
                        onChange={(e) => setActivityDescription(e.target.value)}
                        placeholder="Descripción de la actividad"
                        maxLength={150}
                        className="activity-textarea"
                    />
                </div>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '16px'
                }}>
                    <input
                        type="file"
                        id={`upload-banner-img`}
                        className="upload-image"
                        onChange={(e) => handleBannerImageUpload(e.target.files![0])}
                    />
                    <label htmlFor={`upload-banner-img`} className="upload-image-button">Subir imagen</label>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}>
                        <Box className="question-image-upload" sx={{
                            height: '200px',
                            width: '200px',
                            opacity: '.5',
                            background: `url(${bannerImagePreview})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            position: 'relative',
                        }}>
                        </Box>
                    </Box>
                </Box>

            </div>
            {questions.map((question, index) => (
                <div className="question-card" key={index}>
                    <div className="question-header">
                        <label htmlFor={`question-title-${index}`} className="question-title-label">Título</label>
                        <input
                            id={`question-title-${index}`}
                            type="text"
                            value={question.title || ''}
                            onChange={(e) => handleTitleChange(index, e.target.value)}
                            placeholder="Título"
                            className="question-title"
                        />
                        <InputLabel id="demo-simple-select-label">Tipo de pregunta</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={question.type}
                            label="Age"
                            onChange={(e) => handleTypeChange(index, e.target.value as 'options' | 'image-options')}
                        >
                            <MenuItem value={'options'}>Opciones</MenuItem>
                            <MenuItem value={'image-options'}>Opciones con imagen</MenuItem>
                        </Select>
                    </div>
                    <div className="description-container">
                        <label htmlFor={`question-description-${index}`}>Descripción</label>
                        <label htmlFor={`question-description-${index}`} className="char-counter">{question.description?.length || 0}/150</label>
                        <textarea
                            id={`question-description-${index}`}
                            value={question.description || ''}
                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                            placeholder="Descripción"
                            maxLength={150}
                            className="question-description"
                        ></textarea>
                    </div>
                    {question.type === 'options' && (
                        <div className="question-options">
                            <label className="option-label">Opciones</label>
                            {question.options?.map((option, idx) => (
                                <div key={idx} className="option">
                                    <div
                                        className={`correct-indicator ${option.correct ? 'correct' : 'incorrect'}`}
                                        onClick={() => toggleCorrectness(index, idx)}
                                    ></div>
                                    <input
                                        id={`option-text-${index}-${idx}`}
                                        type="text"
                                        value={option.text}
                                        onChange={(e) => handleOptionTextChange(index, idx, e.target.value)}
                                        maxLength={30}
                                        className="option-input"
                                    />
                                </div>
                            ))}
                            <button className="add-option" onClick={() => addOption(index)}>Nueva opción +</button>
                        </div>
                    )}
                    {question.type === 'order' && (
                        <div className="question-options order">
                            <label className="option-label">Opciones</label>
                            {question.options?.map((option, idx) => (
                                <div key={idx} className="option">
                                    <input
                                        id={`option-text-${index}-${idx}`}
                                        type="text"
                                        value={option.text}
                                        onChange={(e) => handleOptionTextChange(index, idx, e.target.value)}
                                        maxLength={30}
                                        className="option-input"
                                    />
                                    <div className="order-input-container">
                                        <input
                                            type="number"
                                            value={option.order}
                                            onChange={(e) => handleOrderChange(index, idx, parseInt(e.target.value))}
                                            className="order-input"
                                            placeholder="1"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button className="add-option" onClick={() => addOption(index)}>Nueva opción +</button>
                        </div>
                    )}
                    {question.type === 'image-options' && (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }} className="question-options-with-image">
                            <Box sx={{
                                width: '100%',
                            }} className="question-options">
                                <label className="option-label">Opciones</label>
                                {question.options?.map((option, idx) => (
                                    <div key={idx} className="option">
                                        <div
                                            className={`correct-indicator ${option.correct ? 'correct' : 'incorrect'}`}
                                            onClick={() => toggleCorrectness(index, idx)}
                                        ></div>
                                        <input
                                            id={`option-text-${index}-${idx}`}
                                            type="text"
                                            value={option.text}
                                            onChange={(e) => handleOptionTextChange(index, idx, e.target.value)}
                                            maxLength={30}
                                            className="option-input"
                                        />
                                    </div>
                                ))}
                                <button className="add-option" onClick={() => addOption(index)}>Nueva opción +</button>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column'
                            }}>
                                <div className="question-image-upload">
                                    {question.image && <img src={question.image} alt="Vista previa de la imagen" className="image-preview" />}
                                </div>
                                <input
                                    type="file"
                                    id={`upload-${index}`}
                                    className="upload-image"
                                    onChange={(e) => handleImageUpload(index, e.target.files![0])}
                                />
                                <label htmlFor={`upload-${index}`} className="upload-image-button">Subir imagen</label>
                            </Box>
                        </Box>
                    )}
                </div>
            ))}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>

                <button className="add-question" onClick={addQuestion}>Nueva pregunta +</button>
                <button className="add-question" onClick={handleSubmit}>Enviar</button>
            </Box>
        </Box>
    );
};

export default EditActivity;
