import axios from 'axios';
import { API_CONFIG } from '../config/constants';
import { ScrapeRequest, ScrapeResponse } from '../types';
import { getErrorMessage } from '../utils/errorHandling';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const scrapeData = async (data: ScrapeRequest): Promise<ScrapeResponse> => {
  try {
    const response = await api.post<ScrapeResponse>(
      API_CONFIG.ENDPOINTS.SCRAPE,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};