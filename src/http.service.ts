import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
const API_URL = 'http://localhost:8080/api';

interface API {
	endpoint: string;
	method: 'get' | 'post' | 'put' | 'delete';
	params?: {
		id?: string;
		degree?: string;
		semester?: string;
		classroom?: string;
	},
	body?: unknown;
}

class HTTPService {
	private callerInstance() {
		const axiosInstance: AxiosInstance = axios.create({
			baseURL: API_URL
		});

		return axiosInstance;
	}

	private requestInterceptor(instance: AxiosInstance) {
		instance.interceptors.request.use((config) => {
			config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

			return config;
		}, (err) => {
			return Promise.reject(err);
		});
	}

	async httpCaller<T>(props: API): Promise<AxiosResponse<T[]>> {
		const { endpoint, method, body, params } = props;
		const instace = this.callerInstance();
		const config: AxiosRequestConfig = {
			method,
			params,
			data: body
		};

		this.requestInterceptor(instace);

		const res = await instace<T[]>(endpoint, config);

		return res;
	}
}

export default HTTPService;
