import semesterEndpoints from '../utils/api-endpints';
import { DeleteParams } from '../def';

async function handleDeleteSubject({
	handleError,
	handleLoading,
	handleSuccess,
	service,
	subjectId,
	loadData
}: DeleteParams) {
	handleLoading();
	try {
		await service.httpCaller({
			endpoint: semesterEndpoints.deleteSubject(subjectId),
			method: 'delete'
		});
		await loadData();
		handleSuccess();
	} catch (error) {
		handleError();
	}
}

export default handleDeleteSubject;
