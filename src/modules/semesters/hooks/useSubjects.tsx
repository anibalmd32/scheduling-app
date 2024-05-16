// * HOOKS
import { useState } from 'react';
import useSemesters from './useSemesters';

// * SERVICES
import HTTPService from '../../../http.service';

// * HANDLERS
import handleUpdate from '../handlers/handleUpdateSubject';
import handleDeleteSubject from '../handlers/handleDeleteSubject';
import handleSubmitSubject from '../handlers/handleSubmitSubject';

// * UTILS
import subjectColumns from '../utils/subjectColumns';

// * DEFINITIONS
import { SubjectData } from '../def';

const service = new HTTPService('semesters');

function useSubjects() {
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [showToast, setShowToast] = useState({
		loading: false,
		success: false,
		error: false
	});
	const [defaultValues, setDefaultValues] = useState<SubjectData>({
		_id: '',
		laboratoryHours: 0,
		name: '',
		practiceHours: 0,
		theoryHours: 0
	});

	const { loadData, sectionId } = useSemesters();

	const handleResetForm = () => setDefaultValues({
		_id: '',
		laboratoryHours: 0,
		name: '',
		practiceHours: 0,
		theoryHours: 0
	});
	const handleOpenForm = () => {
		setOpenForm(!openForm);
		handleResetForm();
	};
	const handleLoading = () => setShowToast({
		...showToast,
		loading: true,
		success: false,
		error: false
	});
	const handleSuccess = () => setShowToast({
		...showToast,
		loading: false,
		success: true,
		error: false
	});
	const handleError = () => setShowToast({
		...showToast,
		loading: false,
		success: false,
		error: true
	});
	const handleUpdateRow = (row: SubjectData) => handleUpdate({
		handleOpenForm,
		row,
		setDefaultValues
	});
	const handleDeleteRow = async (subjectId: string) => handleDeleteSubject({
		handleError,
		handleLoading,
		handleSuccess,
		service,
		subjectId,
		loadData
	}); 

	const handleSubmit = async (data: SubjectData) => handleSubmitSubject({
		handleError,
		handleLoading,
		handleSuccess,
		service,
		data,
		handleOpenForm,
		loadData,
		sectionId,
		handleResetForm
	});

	const colums = subjectColumns<SubjectData>({
		deleteRow: (row: SubjectData) => handleDeleteRow(row._id),
		updateRow: (row: SubjectData) => handleUpdateRow(row)
	});
	
	return {
		colums,
		defaultValues,
		handleOpenForm,
		openForm,
		handleSubmit,
		showToast
	};
}

export default useSubjects;
