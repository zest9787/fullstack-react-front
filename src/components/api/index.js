import axios from 'axios';
import {message} from 'antd';

const apiInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000,
    responseType: 'json'
});

/**
 * 1. 요청 인터셉터를 작성합니다.
 * 2개의 콜백 함수를 받습니다.
 * 1) 요청 바로 직전 - 인자값: axios config
 * 2) 요청 에러 - 인자값: error
 **/
apiInstance.interceptors.request.use(
    function (config) {
        console.log('token : ', localStorage.getItem('token'));
        if (localStorage.getItem('token') != null) {
            config.headers['Authorization'] = localStorage.getItem('token');
        }
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        console.log('요청 : ', config);
        return config;
    },
    function (error) {
        console.log('요청예외 : ', error);
        return Promise.reject(error);
    },
);

/**
 * 2. 응답 인터셉터를 작성합니다.
 * 2개의 콜백 함수를 받습니다.
 * 1) 응답 정성 - 인자값: http response
 * 2) 응답 에러 - 인자값: http error
 **/
apiInstance.interceptors.response.use(
    function (response) {
        console.log('응답결과 : ', response.data);
        /*
            http status가 200인 경우
            응답 바로 직전에 대해 작성합니다.
            .then() 으로 이어집니다.
        */
        if (response.data.rcode !== 0) {
            message.error(response.data.rmsg);
        }
        return response;
    },

    function (err) {
        console.log('에러결과 : ', err);
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '요청오류(400)';
                    break;
                case 401:
                    err.message = '다시 로그인 하세요.(401)';
                    break;
                case 403:
                    err.message = '접근이 불가합니다.(403)';
                    break;
                case 404:
                    err.message = '요청페이지가 존재하지 않습니다.(404)';
                    break;
                case 408:
                    err.message = '요청시간 초과(408)';
                    break;
                case 500:
                    err.message = '서버오류(500)';
                    break;
                case 501:
                    err.message = '서비스구현되지 않음.(501)';
                    break;
                case 502:
                    err.message = '연결시간초과(502)';
                    break;
                case 503:
                    err.message = '네트워크연결시간초(503)';
                    break;
                case 504:
                    err.message = '연결시간초과(504)';
                    break;
                case 505:
                    err.message = 'HTTP지원불가(505)';
                    break;
                default:
                    err.message = `연결오류(${err.response.status})!`;
            }
        } else {
            err.message = '连接服务器失败!';
        }
        return Promise.reject(err);
    },
);

export const getData = (url, param = {}) => {
    return apiInstance.get(`${url}`, {
        params: param,
    });
};

export const postData = (url, param = {}, method = 'post') => {
    return apiInstance[method](`${url}`, param);
};

export default {getData, postData};