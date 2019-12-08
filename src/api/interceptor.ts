import Axios from 'axios-observable';
import { AxiosRequestConfig } from 'axios';
import { of } from 'rxjs';

/** Interceptors */

const intercept = () => {
  Axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {

      /** Logo data */
      if (config.headers.hasOwnProperty('logo') && process.env.REACT_APP_LOGO) {
        config.url = `${process.env.REACT_APP_LOGO}?${config.url}`;
        return config;
      }

      /** Stock data */
      if (process.env.REACT_APP_ALPHAVANTAGE) {
        config.url = `${process.env.REACT_APP_ALPHAVANTAGE}?${config.url}&apikey=${process.env.REACT_APP_API_KEY}`;
      }

      return config;
    },
    (error) => {
      return of(new Error(error));
    }
  );
};

export default intercept;
