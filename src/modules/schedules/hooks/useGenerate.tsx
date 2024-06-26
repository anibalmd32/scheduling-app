import { useState } from 'react';
import HTTPService from '../../../http.service';

const service = new HTTPService('schedules');

function useGenerate(classroomId: string) {
	const [disabled, setDisabled] = useState(false);

	console.log('classroomId', classroomId);

	const handleGenerate = async () => {
		try {
			await service.httpCaller({
				endpoint: '/generate-data',
				method: 'post',
				params: {}
			});
			setDisabled(true);
		} catch (error) {
			console.error('Ocurrio un error al generar el horario', error);
		}
	};

	return {
		disabled,
		handleGenerate
	};
}

export default useGenerate;