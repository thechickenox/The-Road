// services/roadService.ts
import axios from 'axios';
import { Response } from '../Interfaces/Interfaces';

const API_URL = 'https://the-road-api.onrender.com/api/activity';

export const fetchActivities = async (): Promise<Response> => {
  const response = await axios.get(API_URL + '/getActivity');
  return response.data;
};
export const fetchActivityById = async (id: string): Promise<Response> => {
  const response = await axios.get(API_URL + `/getActivityById/${id}`);
  return response.data;
};
export const deleteActivityById = async (id: string) => {
  try {
    const response = await axios.delete(API_URL + `/deleteActivityById/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando actividad:', error);
  }
};

export async function createActivity(body: any){
  try {
    const response = await axios.post(API_URL + '/createActivity', body)
    return response.data;
  } catch (error) {
    console.error('Error creando actividad:', error);
  }
}

export async function updateActivityById(body: any){
  try {
    const response = await axios.put(API_URL + '/updateActivityById', body)
    return response.data;
  } catch (error) {
    console.error('Error creando actividad:', error);
  }
}