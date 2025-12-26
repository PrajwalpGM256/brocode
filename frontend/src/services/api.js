import axios from 'axios';
import { API_URL } from '../data/constants';

/**
 * API Service Layer
 */

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Review code using AI
 */
export const reviewCode = async ({ code, filename, reviewType }) => {
    try {
        const response = await api.post('/api/review/analyze', {
            code,
            filename,
            review_type: reviewType,
        });
        return response.data;
    } catch (error) {
        // Handle rate limiting
        if (error.response?.status === 429) {
            throw new Error('Rate limit reached. Please wait a moment and try again.');
        }

        // Handle other API errors
        if (error.response?.data?.detail) {
            throw new Error(error.response.data.detail);
        }

        throw new Error('Failed to analyze code. Please check if the backend is running.');
    }
};

/**
 * Health check
 */
export const checkHealth = async () => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error) {
        return { status: 'offline' };
    }
};

export default api;
