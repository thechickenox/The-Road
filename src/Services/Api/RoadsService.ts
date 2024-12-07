// services/roadService.ts
import axios from 'axios';
import { Response, RoadData } from '../Interfaces/Interfaces';

const API_URL = 'https://the-road-api.onrender.com/api/roads';

export const fetchRoads = async (): Promise<Response> => {
  const response = await axios.get(API_URL + '/getAllRoads');
  return response.data;
};
export const fetchRoadById = async (id: string): Promise<Response> => {
  const response = await axios.get(API_URL + `/getRoadById/${id}`);
  return response.data;
};
export const deleteRoadsById = async (id: string) => {
  try {
    const response = await axios.delete(API_URL + `/deleteRoadById/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando Ruta:', error);
  }
};
export const createRoad = async (body: RoadData) => {
  try {
    const response = await axios.post(API_URL + `/createRoad`, body);
    return response.data;
  } catch (error) {
    console.error('Error creando Ruta:', error);
  }
};
export const updateRoadById = async (body: RoadData) => {
  try {
    const response = await axios.put(API_URL + `/UpdateRoadById`, body);
    return response.data;
  } catch (error) {
    console.error('Error Editando Ruta:', error);
  }
};