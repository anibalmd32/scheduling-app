import React from 'react';
import useData from '../../../hooks/useData';
import useForm from '../../../hooks/useForm';
import { createProfessor, updateProfessor, deleteProfessor, asignProfessorSubject } from '../services/professorsService';
import { ProfessorsCtx, Professors, ProfessorFormValues } from '../def';

const ProfessorsContext = React.createContext<ProfessorsCtx>({} as ProfessorsCtx);

export const ProfessorsContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [professorId, setProfessorId] = React.useState<string>('');
	const [openForm, setOpenForm] = React.useState<boolean>(false);
	const [openSubjectModal, setOpenSubjectModal] = React.useState<boolean>(false);
	const [showToast, setShowToast] = React.useState({
		loading: false,
		success: false,
		error: false
	});
	const [formValues, setFormValues] = React.useState<ProfessorFormValues>({
		firstName: '',
		lastName: '',
		dni: '',
		email: '',
		phone: '',
	});
	
	const { handleChange, formData, resetForm, handleSubmit } = useForm<ProfessorFormValues>(formValues);

	const { data: professors, isLoading, loadData } = useData<Professors[]>({
		module: 'professors',
		requestConfig: {
			endpoint: '/',
			method: 'get'
		}
	});

	const handleOpenForm = () => {
		setOpenForm(!openForm);
		resetForm();
		setFormValues({
			firstName: '',
			lastName: '',
			dni: '',
			email: '',
			phone: '',
		});

		if (openForm === false) {
			setProfessorId('');
		}
	};

	const handleOpenSubjectModal = (professorId?: string) => {
		if (professorId) {
			setProfessorId(professorId);
		}
		setOpenSubjectModal(!openSubjectModal);
	};

	const handleUpdate = (row: Professors) => {
		setProfessorId(row._id);
		setFormValues(row.data);
		setOpenForm(true);
	};

	const handleDelete = async (row: Professors) => {
		setShowToast({
			...showToast,
			loading: true,
			success: false,
			error: false
		});
		try {
			await deleteProfessor(row._id);
			setShowToast({
				...showToast,
				loading: false,
				success: true,
				error: false
			});
			loadData();
		} catch (error) {
			setShowToast({
				...showToast,
				loading: false,
				success: false,
				error: true
			});
		}
	};

	const handleAsignSubject = async (scheduleSelected: unknown) => {
		setShowToast({
			...showToast,
			loading: true,
			success: false,
			error: false
		});
		try {
			await asignProfessorSubject(professorId, scheduleSelected);
			setShowToast({
				...showToast,
				loading: false,
				success: true,
				error: false
			});
			loadData();
			handleOpenSubjectModal();
		} catch (error) {
			setShowToast({
				...showToast,
				loading: false,
				success: false,
				error: true
			});
		} finally {
			setProfessorId('');
		}
	};

	const onSubmit = async (data: ProfessorFormValues) => {
		setShowToast({
			...showToast,
			loading: true,
			success: false,
			error: false
		});
		if (professorId) {
			try {
				await updateProfessor(professorId, data);
				setShowToast({
					...showToast,
					loading: false,
					success: true,
					error: false
				});
				loadData();
				handleOpenForm();
			} catch (error) {
				setShowToast({
					...showToast,
					loading: false,
					success: false,
					error: true
				});
			}
		} else {
			setShowToast({
				...showToast,
				loading: false,
				success: false,
				error: false
			});
			try {
				await createProfessor(data);
				setShowToast({
					...showToast,
					loading: false,
					success: true,
					error: false
				});
				loadData();
				handleOpenForm();
			} catch (error) {
				setShowToast({
					...showToast,
					loading: false,
					success: false,
					error: true
				});
			}
		}
	};

	return (
		<ProfessorsContext.Provider value={{
			professors: professors || [],
			isLoading,
			loadData,
			professorId,
			openForm,
			handleOpenForm,
			handleChange,
			formData,
			onSubmit,
			handleSubmit,
			handleUpdate,
			handleDelete,
			openSubjectModal,
			handleOpenSubjectModal,
			handleAsignSubject,
			setProfessorId,
			showToast
		}}>
			{children}
		</ProfessorsContext.Provider>
	);	
};

export const useProfessors = () => React.useContext(ProfessorsContext);