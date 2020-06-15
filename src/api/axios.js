import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_RPITS_V1_HOST || ''}`,
});

export default instance;
