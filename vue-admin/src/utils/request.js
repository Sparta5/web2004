import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';
import { baseUrl } from '@/config';

const service = axios.create({
	baseURL: baseUrl,
	timeout: 5000
});

// 请求对象
service.interceptors.request.use(
	config => {
		// 设置token
		if (getToken()) {
			config.headers['X-Token'] = getToken();
		}
		return config;
	},
	error => {
		console.log(error);
		return Promise.reject(error);
	}
);
// 响应对象
service.interceptors.response.use(
	response => {
		const res = response.data;
		if (res.code !== 20000) {
			Message({
				message: res.message || 'Error',
				type: 'error',
				duration: 5 * 1000
			});
			if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
				// 提示登陆失效
				MessageBox.confirm(
					'You have been logged out, you can cancel to stay on this page, or log in again',
					'Confirm logout',
					{
						confirmButtonText: 'Re-Login',
						cancelButtonText: 'Cancel',
						type: 'warning'
					}
				).then(() => {
					// 登陆失效清除token并重新加载
					store.dispatch('user/resetToken').then(() => {
						location.reload();
					});
				});
			}
			return Promise.reject(new Error(res.message || 'Error'));
		} else {
			return res;
		}
	},
	error => {
		console.log('err' + error);
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		});
		return Promise.reject(error);
	}
);

export default service;
