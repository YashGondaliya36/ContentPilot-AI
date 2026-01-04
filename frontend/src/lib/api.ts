import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateContent = async (data: any) => {
  const response = await api.post('/content/generate', data);
  return response.data;
};

export const sendEmail = async (data: any) => {
  const response = await api.post('/content/send-email', data);
  return response.data;
};
