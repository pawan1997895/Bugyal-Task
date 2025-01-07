import { toast } from 'react-toastify';

export const notify = (message, type) => {
    toast[type](message);
}

exports const API_URL = 'https://bugyal-task-api.vercel.app';
