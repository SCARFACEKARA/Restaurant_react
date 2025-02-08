import axios from 'axios';

const apiBaseUrl = 'http://192.168.1.174:8000/api';


export const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error.message);
    throw error;
  }
};

export const postData = async (endpoint, payload) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/${endpoint}`, payload);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des données :', error.message);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des données :', error.message);
    throw error;
  }
};

export const putData = async (endpoint,payload) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/${endpoint}`,payload);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des données :', error.message);
    throw error;
  }
};

export const refreshPage = () => {
  window.location.reload();
};

