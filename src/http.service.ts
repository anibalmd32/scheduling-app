// * AXIOS IMPORTS 
import axios, {
	AxiosInstance,
	AxiosResponse,
	AxiosRequestConfig
} from 'axios';

// * CONSTANTS
import { API_URL } from './constanst';

// * DEFINITTIONS
import { RequestConfig, AppModule } from './def';

class HTTPService {
	private module: AppModule;

	constructor(module: AppModule) {
		this.module = module; 
	}

	private callerInstance() {
		const axiosInstance: AxiosInstance = axios.create({
			baseURL: `${API_URL}/${this.module}`
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

	async httpCaller<T>(props: RequestConfig): Promise<AxiosResponse<T>> {
		const { endpoint, method, body, params } = props;
		const instace = this.callerInstance();
		const config: AxiosRequestConfig = {
			method,
			params,
			data: body
		};

		this.requestInterceptor(instace);

		const res = await instace<T>(endpoint, config);

		return res;
	}
}

export default HTTPService;
