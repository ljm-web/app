import axios from 'axios';
import qs from 'qs';

//设置请求超时时间
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		return Promise.reject(err);
	}
);


axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		return Promise.reject(error)
	}
)

/* 封装post请求

* @param url
* 
* @param data

* @returns {Promise}

*/
export function post(url, data = {}) {

	return new Promise((resolve, reject) => {
		axios.post(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			})
	})

}

/**

* 封装get方法

* @param url

* @param data

* @returns {Promise}

*/

export function get(url, params = {}) {

	return new Promise((resolve, reject) => {

		axios.get(url, {
				params: params
			})
			.then(response => {
				resolve(qs.parse(response.data));
			})
			.catch(err => {
				reject(err)
			})

	})

}
