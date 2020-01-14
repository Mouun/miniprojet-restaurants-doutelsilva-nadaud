import axios from 'axios'
import NProgress from 'nprogress';
import { baseApiUrl } from './config';

NProgress.configure({ showSpinner: false });

const Axios = axios.create({
  baseURL: baseApiUrl
});

Axios.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

Axios.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});

export default Axios;
