// services/roadService.ts
import axios from 'axios';
import { Response, User } from '../Interfaces/Interfaces';

const API_URL = 'https://the-road-api.onrender.com/api/users';

export const fetchUsers = async (): Promise<Response> => {
  const response = await axios.get(API_URL + '/getUsers');
  return response.data;
};
export const deleteUserById = async (id: string) => {
  try {
    const response = await axios.delete(API_URL + `/deleteUserById/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando Usuario:', error);
  }
};
export const createUser = async (body: User) => {
  try {
    const response = await axios.post(API_URL + `/createUser`, body);
    return response.data;
  } catch (error) {
    console.error('Error creando Usuario:', error);
  }
};
export const updateUserById = async (body: User) => {
  try {
    const response = await axios.put(API_URL + `/updateUserById`, body);
    return response.data;
  } catch (error) {
    console.error('Error Editando Usuario:', error);
  }
};
export const getUserByMail = async (body: any) => {
  try {
    const response = await axios.post(API_URL + `/getUserByMail`, body);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo Usuarios:', error);
  }
};
