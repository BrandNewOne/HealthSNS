import axios from 'axios';

import { getCookieToken } from '../storage/Cookie';
import { API } from './Config';
import  store  from '../store/index';
import { SET_ATK_EXP } from '../store/Atk';
import { SET_USER } from '../store/User';
import jwt_decode from "jwt-decode";
import { removeCookieToken } from '../storage/Cookie';


export const PostRtkAxios = axios.create({
	timeout: 1000
});


PostRtkAxios.interceptors.request.use(
	function (config) {
		const refreshToken = getCookieToken();
		config.headers.Authorization = `Bearer ${refreshToken}`;
		config.url = `${API.BASE_URL}/${API.REDIRECT}`;
		config.method = 'post';
	  return config;
	},
	function (error) {
	  // 오류 요청을 보내기전 수행할 일
	  // ...
	  return Promise.reject(error);
	}
);


// 응답 인터셉터 추가
PostRtkAxios.interceptors.response.use(
	function (response) {
		const user = jwt_decode(response.data.atk); // decode your token here
		const jsonUser = JSON.parse(user.sub);
		store.dispatch(SET_ATK_EXP({atk: response.data.atk, exp: user.exp}));
		store.dispatch(SET_USER({ id: jsonUser.id, name: jsonUser.name, role: jsonUser.role }));
		console.log('재발행 성공');
	    return response;
	},
	function (error) {
	    // 오류 응답을 처리
		removeCookieToken();
		window.location.href='/signin';
	    return Promise.reject(error);
	}
);