import { SubmitParams } from '../def';
import semesterEndpoints from '../utils/api-endpints';

async function handleSubmitSubject({
	data,
	handleError,
	handleLoading,
	handleSuccess,
	loadData,
	sectionId,
	service,
	handleOpenForm,
	handleResetForm
}: SubmitParams) {
	handleLoading();

	if (data._id) {
		try {
			await service.httpCaller({
				endpoint: semesterEndpoints.updateSubject(data._id),
				method: 'patch',
				body: data
			});
	
			await loadData();
			handleOpenForm();
			handleSuccess();
			handleResetForm();
		} catch (error) {
			handleError();
		}
	} else if (sectionId) {
		try {
			await service.httpCaller({
				endpoint: semesterEndpoints.createSubject(sectionId),
				method: 'post',
				body: data
			});

			await loadData();
			handleOpenForm();
			handleSuccess();
			handleResetForm();
		} catch (error) {
			handleError();
		}
	}
}

export default handleSubmitSubject;
