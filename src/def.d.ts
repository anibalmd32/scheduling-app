// * API
export interface RequestParams {
	id?: string;
	degree?: string;
	semester?: string;
	classroom?: string;
	isActive?: boolean;
	for?: string;
}

export type RequestBody = unknown

export interface RequestConfig {
	endpoint: string;
	method: 'get' | 'post' | 'put' | 'delete' | 'patch';
	params?: RequestParams,
	body?: RequestBody;
}

export type AppModule = 
| 'classrooms'
| 'days'
| 'professors'
| 'schedules'
| 'semesters'
| 'degrees'
| 'pdf';

export interface DataHookProps {
	module: AppModule;
	requestConfig: RequestConfig;
}