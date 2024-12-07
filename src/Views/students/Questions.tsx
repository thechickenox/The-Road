import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import * as questionsService from '../../Services/Api/ActivitiesService';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Components/Models/shared/Loader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
// Include Lightbox 
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';


const lightbox = new PhotoSwipeLightbox({
    // may select multiple "galleries"
    gallery: '#gallery--getting-started',

    // Elements within gallery (slides)
    children: 'a',

    // setup PhotoSwipe Core dynamic import
    pswpModule: () => import('photoswipe')
});
lightbox.init();
// Interface para la estructura de las opciones
interface Option {
    text: string;
    correct?: boolean;
}

// Interface para la estructura de las preguntas
interface Question {
    type: string;
    title: string;
    description: string;
    options: Option[];
    image?: string;
}

// Interface para los datos del cuestionario
interface QuizData {
    _id: string;
    description: string;
    bannerImg: string;
    questions: Question[];
}

const Quiz: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [data, setData] = useState<QuizData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResults, setShowResults] = useState(false);
    const { questionId } = useParams();

    const handleAnswer = (answer: string) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = answer;
        setAnswers(newAnswers);

        if (currentQuestionIndex + 1 < data!.questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setShowResults(false);
    };

    const fetchQuestion = async (id: any) => {
        setIsLoading(true);
        const res = await questionsService.fetchActivityById(id);
        setData(res.data);
        setIsLoading(false);
        return res.data;
    };
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Esto te llevará a la página anterior
    };
    useEffect(() => {
        fetchQuestion(questionId);
    }, [questionId]);

    if (isLoading || !data) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Loader />
            </Box>
        );
    }

    const currentQuestion = data.questions[currentQuestionIndex];
    const correctAnswersCount = answers.filter((answer, index) =>
        data.questions[index].options.find(option => option.text === answer)?.correct
    ).length;

    return (
        <Box sx={{ paddingTop: '32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box onClick={handleGoBack} sx={{
                position: 'absolute',
                top: { xs: 80, sm: 100, md: 100 },
                left: { xs: 28, sm: 100, md: 100 },
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
            <Box sx={{ borderRadius: '10px', width: '100%', textAlign: 'center', height: '100%', mt: { xs: '60px', md: '0' } }}>
                <Typography variant="h4" gutterBottom sx={{
                    fontSize: { xs: '20px', sm: '32px', md: '40px' }
                }}>{data.description}</Typography>
                {!showResults ? (
                    <Box sx={{
                        padding: '42px',
                        width: '100%',
                        height: '100%'
                    }}>
                        <Box sx={{
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            padding: '24px',
                            borderRadius: '10px',
                            height: { xs: 'auto', md: 'auto' },
                        }}>
                            {currentQuestion.type === 'options' && (
                                <Box sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <Box sx={{
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        my: '32px'
                                    }}>
                                        <Typography variant="h2" gutterBottom sx={{ fontSize: { xs: '20px', sm: '24px', md: '32px' } }}>{currentQuestion.title}</Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '16px',
                                        flexDirection: 'column',
                                        width: '100%',
                                        paddingBottom: '42px'
                                    }}>
                                        <Typography variant="body2" sx={{ marginTop: '20px' }}>{currentQuestionIndex + 1} / {data.questions.length}</Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '16px',
                                                mt: 2,
                                                width: '100%',
                                                justifyContent: { xs: 'space-around', md: 'space-between' }
                                            }}
                                        >
                                            {currentQuestion.options.map((option, index) => (
                                                <Button
                                                    key={index}
                                                    variant={answers[currentQuestionIndex] === option.text ? "contained" : "outlined"}
                                                    color={answers[currentQuestionIndex] === option.text ? "primary" : "inherit"}
                                                    onClick={() => handleAnswer(option.text)}
                                                    sx={{
                                                        padding: '10px',
                                                        flex: '1 1 calc(50% - 16px)', // Adjusts for a two-column layout in small screens
                                                        maxWidth: 'calc(50% - 16px)', // Ensures the maximum width in small screens
                                                        py: '16px',
                                                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                                                        ":hover": {
                                                            background: '#49437B',
                                                            color: '#fff'
                                                        }
                                                    }}
                                                >
                                                    {option.text}
                                                </Button>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                            {currentQuestion.type === 'image-options' && (
                                <Box sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <Box sx={{
                                        width: '100%',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        marginBottom: '20px',
                                        height: {xs:'auto', md:'70%'}
                                    }}>
                                        <img
                                            src={currentQuestion.image}
                                            alt="Quiz Image"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'block',
                                                maxWidth: '100%'
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        padding: '20px',
                                        my: '32px'
                                    }}>
                                        <Typography variant="h2" gutterBottom sx={{ fontSize: { xs: '20px', sm: '24px', md: '32px' } }}>{currentQuestion.title}</Typography>
                                        <Typography variant="body2" sx={{ marginTop: '20px' }}>{currentQuestionIndex + 1} / {data.questions.length}</Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                                        gap: '16px',
                                        mt: 2,
                                        width: '100%',
                                    }}>
                                        {currentQuestion.options.map((option, index) => (
                                            <Button
                                                key={index}
                                                variant={answers[currentQuestionIndex] === option.text ? "contained" : "outlined"}
                                                color={answers[currentQuestionIndex] === option.text ? "primary" : "inherit"}
                                                onClick={() => handleAnswer(option.text)}
                                                sx={{
                                                    padding: '10px',
                                                    width: '100%',
                                                    py: '16px',
                                                    fontSize: { xs: '12px', sm: '14px', md: '16px' },
                                                    ":hover": {
                                                        background: '#49437B',
                                                        color: '#fff'
                                                    }
                                                }}
                                            >
                                                {option.text}
                                            </Button>
                                        ))}
                                    </Box>
                                </Box>
                            )}
                            {currentQuestion.type == 'order' && (
                                <Box sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <Box sx={{
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Typography variant="h2" gutterBottom>{currentQuestion.title}</Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '16px',
                                        flexDirection: 'column',
                                        width: '100%',
                                        paddingBottom: '42px'
                                    }}>
                                        <Typography variant="body2" sx={{ marginTop: '20px' }}>{currentQuestionIndex + 1} / {data.questions.length}</Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, height: '20%', width: '100%' }}>
                                            {currentQuestion.options.map((option, index) => (
                                                <Button
                                                    key={index}
                                                    variant={answers[currentQuestionIndex] === option.text ? "contained" : "outlined"}
                                                    color={answers[currentQuestionIndex] === option.text ? "primary" : "inherit"}
                                                    onClick={() => handleAnswer(option.text)}
                                                    sx={{
                                                        flex: 1, margin: '0 10px', padding: '10px', width: '100%', py: '32px',
                                                        ":hover": {
                                                            background: '#49437B',
                                                            color: '#fff'
                                                        }
                                                    }}
                                                >
                                                    {option.text}
                                                </Button>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{
                        height: '100%',
                    }}>
                        <Box sx={{
                            height: '30vh',
                        }}>
                            <Typography variant="h6" gutterBottom>Resultados</Typography>
                            <Typography variant="body1" gutterBottom sx={{
                                fontWeight: 'bold',
                                fontSize: '42px'
                            }}>
                                {correctAnswersCount} / {data.questions.length}
                            </Typography>
                        </Box>
                        <Box sx={{
                            backgroundColor: '#F7F9FC',
                            height: '100%',
                            padding: '24px'
                        }}>
                            <Button onClick={restartQuiz} sx={{
                                marginTop: '20px',
                                background: '#49437B',
                                color: '#fff',
                                ":hover": {
                                    color: '#000'
                                }
                            }}>Reiniciar cuestionario</Button>
                            <Stack direction={'row'} sx={{ marginTop: '20px' }}>
                                <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                    {data.questions.map((question, index) => (
                                        <Box key={index} sx={{
                                            marginBottom: '10px', maxWidth: '350px', width: '300px',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            flexDirection: 'row',
                                            gap: '12px',
                                            flexWrap: 'wrap',
                                            background: 'white',
                                            borderRadius: '10px',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                            p: '10px'
                                        }}>
                                            <Typography variant="body1" sx={{
                                                fontSize: '20px',
                                                fontFamily: 'Roboto',
                                            }}>Pregunta {index + 1}</Typography>
                                            <Typography variant="body1" sx={{
                                                textAlign: 'initial',
                                            }}>{question.title}</Typography>
                                            <Stack direction={'row'} gap={'16px'} alignItems={'center'} justifyContent={'flex-start'}>
                                                <Typography variant="body1" sx={{
                                                    textAlign: 'initial',
                                                }}><strong>Tu respuesta:</strong></Typography>
                                                <Typography variant="body1"
                                                    sx={{
                                                        borderRadius: '10px',
                                                        backgroundColor: question.options.find(option => option.text === answers[index])?.correct ? '#89FF7E' : '#FF6063',
                                                        px: '16px',
                                                        py: '10px'
                                                    }}>{answers[index]}</Typography>
                                                {
                                                    question.options.find(option => option.text === answers[index])?.correct ?
                                                        (
                                                            <Box sx={{
                                                                background: '#89FF7E',
                                                                borderRadius: '50%',
                                                                padding: '7px 7px 3px 7px'
                                                            }}>
                                                                <CheckIcon sx={{
                                                                    color: '#fff'
                                                                }}></CheckIcon>
                                                            </Box>
                                                        ) :
                                                        (
                                                            <Box sx={{
                                                                background: '#FF6063',
                                                                borderRadius: '50%',
                                                                padding: '7px 7px 3px 7px'
                                                            }}>
                                                                <ClearIcon sx={{
                                                                    color: '#fff'
                                                                }}></ClearIcon>
                                                            </Box>
                                                        )
                                                }
                                            </Stack>
                                            <Stack direction={'row'} gap={'16px'} alignItems={'center'} justifyContent={'flex-start'}>
                                                <Typography variant="body1" sx={{
                                                    textAlign: 'initial',
                                                }}><strong>Respuesta Correcta:</strong></Typography>
                                                <Typography variant="body1" sx={{
                                                    borderRadius: '10px',
                                                    background: '#49437B',
                                                    color: '#fff',
                                                    px: '16px',
                                                    py: '10px'
                                                }}>{question.options.find(option => option.correct)?.text}</Typography>
                                            </Stack>
                                        </Box>
                                    ))}
                                </Box>
                                <Box sx={{ display: { xs: 'flex', md: 'none' }, width: '85vw' }}>
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        spaceBetween={16}
                                        slidesPerView={1.1}
                                        centeredSlides={true}
                                        navigation
                                        pagination={{ clickable: true }}
                                        breakpoints={{
                                            400: {
                                                slidesPerView: 1,
                                                spaceBetween: 10,
                                            },
                                            600: {
                                                slidesPerView: 1,
                                                spaceBetween: 10,
                                            }
                                        }}
                                    >
                                        {data.questions.map((question, index) => (
                                            <SwiperSlide key={index}>
                                                <Box sx={{
                                                    px: '10px'
                                                }}>
                                                    <Box sx={{
                                                        marginBottom: '10px',
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        flexDirection: 'column',
                                                        gap: '12px',
                                                        flexWrap: 'wrap',
                                                        background: 'white',
                                                        borderRadius: '10px',
                                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                        p: '10px',
                                                    }}>
                                                        <Typography variant="body1" sx={{
                                                            fontSize: '20px',
                                                            fontFamily: 'Roboto',
                                                        }}>Pregunta {index + 1}</Typography>
                                                        <Typography variant="body1" sx={{
                                                            textAlign: 'initial',
                                                        }}>{question.title}</Typography>
                                                        <Stack direction={'row'} gap={'16px'} alignItems={'center'} justifyContent={'flex-start'}>
                                                            <Typography variant="body1" sx={{
                                                                textAlign: 'initial',
                                                            }}><strong>Tu respuesta:</strong></Typography>
                                                            <Typography variant="body1"
                                                                sx={{
                                                                    borderRadius: '10px',
                                                                    backgroundColor: question.options.find(option => option.text === answers[index])?.correct ? '#89FF7E' : '#FF6063',
                                                                    px: '16px',
                                                                    py: '10px'
                                                                }}>{answers[index]}</Typography>
                                                            {
                                                                question.options.find(option => option.text === answers[index])?.correct ?
                                                                    (
                                                                        <Box sx={{
                                                                            background: '#89FF7E',
                                                                            borderRadius: '50%',
                                                                            padding: '7px 7px 3px 7px'
                                                                        }}>
                                                                            <CheckIcon sx={{
                                                                                color: '#fff'
                                                                            }}></CheckIcon>
                                                                        </Box>
                                                                    ) :
                                                                    (
                                                                        <Box sx={{
                                                                            background: '#FF6063',
                                                                            borderRadius: '50%',
                                                                            padding: '7px 7px 3px 7px'
                                                                        }}>
                                                                            <ClearIcon sx={{
                                                                                color: '#fff'
                                                                            }}></ClearIcon>
                                                                        </Box>
                                                                    )
                                                            }
                                                        </Stack>
                                                        <Stack direction={'row'} gap={'16px'} alignItems={'center'} justifyContent={'flex-start'}>
                                                            <Typography variant="body1" sx={{
                                                                textAlign: 'initial',
                                                            }}><strong>Respuesta Correcta:</strong></Typography>
                                                            <Typography variant="body1" sx={{
                                                                borderRadius: '10px',
                                                                background: '#49437B',
                                                                color: '#fff',
                                                                px: '16px',
                                                                py: '10px'
                                                            }}>{question.options.find(option => option.correct)?.text}</Typography>
                                                        </Stack>
                                                    </Box>
                                                </Box>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </Box>
                            </Stack>

                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

// Datos del cuestionario (ejemplo)
const quizData: QuizData = {
    _id: "669483d991fc62cb2665768c",
    description: "Test de resolución CSS",
    bannerImg: '',
    questions: [
        {
            type: "options",
            title: "¿Cómo declaras una clase?",
            description: "",
            image: 'string',
            options: [
                { text: ".Clase", correct: true },
                { text: "#clase", correct: false },
                { text: "%Clase", correct: false },
                { text: "Clase", correct: false }
            ]
        },
        {
            type: "options",
            title: "¿Cómo seleccionas un ID?",
            description: "",
            options: [
                { text: ".ID", correct: false },
                { text: "#ID", correct: true },
                { text: "%ID", correct: false },
                { text: "ID", correct: false }
            ]
        }
    ]
};

export default Quiz;