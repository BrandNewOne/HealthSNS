import axios from 'axios';

import { API } from './Config';
import  store  from '../store/index';
import { PostRtkAxios } from  '../api/PostRtkAxios';

export const CustomAxios = axios.create({
	timeout: 1000
	});

// 요청 인터셉터 추가
CustomAxios.interceptors.request.use(
	async(config) => {
		let accessToken = store.getState().authToken.accessToken;
		const expireTime = store.getState().authToken.expireTime;
		const nowDate = new Date().getTime()/1000;

		// 요청을 보내기 전에 수행할 일
		if(expireTime < nowDate || accessToken == null){
			const response = await PostRtkAxios(); 
			accessToken = response.data.atk;
			if(config.params){
				if (config.params.id === null){
					config.params.id = store.getState().authUser.id;
				}
				else if (config.params.uid === null){
					config.params.uid = store.getState().authUser.id;
				}
			}
			if(config.data){
				if (config.data.id === null){
					config.data.id = store.getState().authUser.id;
				}
			}
		}
		config.headers.Authorization = `Bearer ${accessToken}`;
		
	    return config;
	},
	function (error) {
		console.log('요청실패',error);
	    // 오류 요청을 보내기전 수행할 일

	    return Promise.reject(error);
	});
  
// 응답 인터셉터 추가
CustomAxios.interceptors.response.use(
	function (response) {

	    return response;
	},
	function (error) {
	    // 오류 응답을 처리

	    return Promise.reject(error);
	}
);