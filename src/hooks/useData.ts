import { useState } from 'react';
import { AxiosError } from 'axios';
import HTTPService from '../http.service';
import { DataHookProps } from '../def';

function useData<T>({
	module,
	requestConfig
}: DataHookProps) {
	const [data, setData] = useState<T>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<AxiosError>();

	const service = new HTTPService(module);

	const loadData = async () => {
		try {
			const res = await service.httpCaller<T>(requestConfig);
			setData(res.data);
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err);
				setError(err);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return {
		data,
		isLoading,
		error,
		loadData
	};
}

export default useData;