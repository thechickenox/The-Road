// Rutas

export interface RoadData {
    _id?: any;
    title: string;
    easyDescription: string;
    fullDescription: string;
    activities: string[];
    duration: string;
    punctuation: number;
    img: string;
    activityDetails: Activity[];
}

// Usuarios

export interface User {
    _id?: any;
    uid?: string;
    name: string,
    lastname: string,
    email: string,
    password?: string,
    rolename: string,
    creationDate: string | Date;
    points: number;
}

// Noticias
export interface News {
    _id?: any;
    uid?: string;
    title: string,
    content: string,
}

// Respuesta de API

export interface Response {
    data: any;
}

// Actividades

export interface Activity {
    _id?: any;
    title: string;
    description: string;
    questions: Preguntas[];
    genre: string;
    bannerImg: string
}

export interface Preguntas {
    name: string;
    options: Options[];
}

export interface Options {
    title: string,
    valid: boolean,
    index: number
}

// Generos

export interface Genre{
    _id?: any;
    title: string;
    cantidad: number;
    bannerImg?: string;
}