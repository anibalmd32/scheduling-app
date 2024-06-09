// HOOKS
import { useEffect, useState } from 'react';
import useForm from '../../../hooks/useForm';
import useData from '../../../hooks/useData';

// COMPONENTS
import Form from '../../../components/Form';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import Toast from '../../../components/Toast';

// SERVICES
import HTTPService from '../../../http.service';

// DEFINITIONS
import { SelectItem } from '../../../components/ui';
import { GenerateScheduleParams } from '../definitions';
import { SemesterData } from '../../semesters/def';
import { AxiosError } from 'axios';

const service = new HTTPService('schedules');

/**
 * GenerateForm
 * @description Componente que permite generar un horario de clases
 */
export default function GenerateForm() {
	const [semesterItems, setSemesterItems] = useState<SelectItem[]>([]);
	const [shift] = useState<SelectItem[]>([
		{
			label: 'Cualquier turno',
			value: 'cualquier'
		},
		{
			label: 'Mañana',
			value: 'morning'
		},
		{
			label: 'Tarde',
			value: 'afternoon'
		},
	]);
	const [days] = useState<SelectItem[]>([
		{
			label: 'Cualquier día',
			value: 'cualquier'
		},
		{
			label: 'Lunes',
			value: 'lunes'
		},
		{
			label: 'Martes',
			value: 'martes'
		},
		{
			label: 'Miércoles',
			value: 'miercoles'
		},
		{
			label: 'Jueves',
			value: 'jueves'
		},
		{
			label: 'Viernes',
			value: 'viernes'
		},
		{
			label: 'Sábado',
			value: 'sábado'
		}
	]);
	const [canSend, setCanSend] = useState(false);
	const [error, setError] = useState('Error en la generación');
	const [showToast, setShowToast] = useState({
		loading: false,
		success: false,
		error: false
	});
	const [defaultValues] = useState<GenerateScheduleParams>({
		semester: '',
		degree: 'sistemas',
		shift: 'cualquier',
		startDay: 'cualquier',
		endDay: 'cualquier'
	});

	const { formData, handleChange, handleSubmit, resetForm } = useForm<GenerateScheduleParams>(defaultValues);

	const { data: semestersData } = useData<SemesterData[]>({
		module: 'semesters',
		requestConfig: {
			endpoint: '/',
			method: 'get'
		}
	});

	const onSubmit = async (data: GenerateScheduleParams) => {
		setShowToast({
			...showToast,
			loading: true,
			success: false,
			error: false
		});
		try {
			await service.httpCaller({
				endpoint: '/generate-data',
				method: 'post',
				body: data
			});
			resetForm();

			setShowToast({
				...showToast,
				loading: false,
				success: true,
				error: false
			});
			setCanSend(false);
		} catch (error) {
			if (error instanceof AxiosError) {
				setError(error.response?.data?.error);
			}

			setShowToast({
				...showToast,
				loading: false,
				success: false,
				error: true
			});
		}
	};

	useEffect(() => {
		if (semestersData) {
			const selectItems = semestersData.map((semester) => ({
				label: `Semestre ${semester.number}`,
				value: semester.number
			}));
			setSemesterItems(selectItems);
		}
	}, [semestersData]);

	useEffect(() => {
		if (formData.semester && formData.degree) {
			setCanSend(true);
		}
	}, [formData]);

	return (
		<section className='mt-8 bg-white rounded-lg p-4'>
			{showToast.loading && (
				<Toast
					message='Cargando'
					variant='info'
					isLoader
				/>
			)}

			{showToast.success && (
				<Toast
					message='Exito en la operacion'
					variant='success'
					duraction={3000}
				/>
			)}

			{showToast.error && (
				<Toast
					message={error}
					variant='error'
					duraction={3000}
				/>
			)}
			<Form onSubmit={e => onSubmit(handleSubmit(e))}>
				<Select
					items={semesterItems}
					label='Seleccione un semestre'
					name='semester'
					onChange={handleChange}
					value={formData.semester}
				/>

				<div className='flex gap-2 w-full'>
					<Select
						items={days}
						label='Dia de inicio'
						name='startDay'
						onChange={handleChange}
						value={formData.startDay}
					/>

					<Select
						items={days}
						label='Dia de fin'
						name='endDay'
						onChange={handleChange}
						value={formData.endDay}
					/>

				</div>

				<Select
					items={shift}
					label='Seleccione un turno'
					name='shift'
					onChange={handleChange}
					value={formData.shift}
				/>

				<div className='mt-4 flex gap-2'>
					<Button
						label='Generar horario'
						type='submit'
						variant='info'
						disabled={!canSend}
					/>

					<Button
						label='Cancelar'
						type='reset'
						variant='error'
						disabled={!canSend}
						onClick={() => {
							resetForm();
							setError('');
							setCanSend(false);
						}}
					/>
				</div>
			</Form>

		</section>
	);
}