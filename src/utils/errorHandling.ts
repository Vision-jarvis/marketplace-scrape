import { AxiosError } from 'axios';
import { ERROR_MESSAGES } from '../config/constants';
import { ErrorResponse } from '../types';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      
      if (!axiosError.response) {
        return ERROR_MESSAGES.CONNECTION;
      }
      
      if (axiosError.code === 'ECONNABORTED') {
        return ERROR_MESSAGES.TIMEOUT;
      }
      
      return axiosError.response.data?.error || ERROR_MESSAGES.INVALID_RESPONSE;
    }
    return error.message;
  }
  return ERROR_MESSAGES.UNKNOWN;
};