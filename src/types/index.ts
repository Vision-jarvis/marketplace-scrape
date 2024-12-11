export type Platform = 'amazon' | 'flipkart' | 'nykaaman';

export interface ErrorState {
  show: boolean;
  message: string;
}

export interface ScrapeRequest {
  url: string;
  platform: Platform;
}

export interface ScrapeResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}