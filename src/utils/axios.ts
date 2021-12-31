import { default as AxiosBase } from 'axios';

const axios = AxiosBase.create({ baseURL: '/api' });

export default axios;
