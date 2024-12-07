// services/roadService.ts
import axios from 'axios';
import { Genre, Response } from '../Interfaces/Interfaces';

const API_URL = 'https://the-road-api.onrender.com/api/genre';

export const fetchGenres = async (): Promise<Response> => {
  const response = await axios.get(API_URL + '/getAllGenres');
  return response.data;
};

export const deleteGenreById = async (id: string) => {
  try {
    const response = await axios.delete(API_URL + `/deleteGenreById/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando Genero:', error);
  }
};

export async function createGenre(body: Genre){
  try {
    const response = await axios.post(API_URL + '/createGenre', body)
    return response.data;
  } catch (error) {
    console.error('Error eliminando Genero:', error);
  }
}
export const updateGenreById = async (body: Genre) => {
  try {
    const response = await axios.put(API_URL + '/updateGenreById', body);
    return response.data;
  } catch (error) {
    console.error('Error Editando Ruta:', error);
  }
};