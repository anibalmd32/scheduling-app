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
		try {
			await deleteProfessor(row._id);
			loadData();
		} catch (error) {
			console.error('Ocurrio un error al eliminar el profesor', error);
		}
	};

	const handleAsignSubject = async (scheduleSelected: unknown) => {
		try {
			await asignProfessorSubject(professorId, scheduleSelected);
			loadData();
			handleOpenSubjectModal();
		} catch (error) {
			console.error('Ocurrio un error al asignar la materia', error);
		}
	};

	const onSubmit = async (data: ProfessorFormValues) => {
		if (professorId) {
			try {
				await updateProfessor(professorId, data);
				loadData();
				handleOpenForm();
			} catch (error) {
				console.error('Ocurrio un error al actualizar el profesor', error);
			}
		} else {
			try {
				const newProfessor = await createProfessor(data);
				console.log(newProfessor);
				loadData();
				handleOpenForm();
			} catch (error) {
				console.error('Ocurrio un error al crear el profesor', error);
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
			setProfessorId
		}}>
			{children}
		</ProfessorsContext.Provider>
	);	
};

export const useProfessors = () => React.useContext(ProfessorsContext);