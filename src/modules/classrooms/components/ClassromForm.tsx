import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import { SelectItem } from '../../../components/ui';
import HTTPService from '../../../http.service';
import { ClassroomFormValues } from '../../schedules/def';
import useClassroom from '../useClassroom';

interface Props {
	open: boolean;
	onClose: () => void;
	defaultValues?: ClassroomFormValues;
	classroomId?: string;
}

const service = new HTTPService('classrooms');

export default function ClassroomForm({ open, onClose, defaultValues, classroomId }: Props) {
	const [formValues, setFormValues] = useState<ClassroomFormValues>(defaultValues || {
		code: '',
		category: 'normal',
	});
	const [categories] = useState<SelectItem[]>([
		{
			label: 'Laboratorio',
			value: 'laboratory'
		},
		{
			label: 'Normal',
			value: 'normal'
		},
		{
			label: 'PC',
			value: 'pc'
		}
	]);

	React.useEffect(() => {
		if (defaultValues) {
			setFormValues(defaultValues);
		}
	}, [defaultValues]);

	const { loadData } = useClassroom();

	const {
		formData,
		handleChange,
		handleSubmit,
		resetForm
	} = useForm<ClassroomFormValues>(formValues);

	const onSubmit = async (data: ClassroomFormValues) => {
		if (classroomId) {
			try {
				await service.httpCaller({
					endpoint: `/${classroomId}`,
					method: 'put',
					body: data
				});
				onClose();
				resetForm();
				loadData();
			} catch (error) {
				console.error('Ocurrio un error al actualizar la aula', error);
			}
		} else {
			try {
				await service.httpCaller({
					endpoint: '/',
					method: 'post',
					body: data
				});
				onClose();
				resetForm();
				loadData();
			} catch (error) {
				console.error('Ocurrio un error al crear la aula', error);
			}
		}
	};

	return (	
		<Modal onClose={() => {
			onClose();
			resetForm();
		}} open={open}>
			<h1 className='text-2xl font-bold'>
				{classroomId ? 'Editar aula' : 'Agregar aula'}
			</h1>
			<Form onSubmit={(e) => onSubmit(handleSubmit(e))}>
				<Input
					name='code'
					onChange={handleChange}
					placeholder='Ej: aula 1'
					type='text'
					value={formData.code}
					label='Aula'
				/>
				<Select
					items={categories}
					name='category'
					onChange={handleChange}
					value={formData.category}
					label='Categoría'
				/>
				<div className='flex gap-4 mt-4'>
					<Button
						label='Enviar'
						type='submit'
						variant='success'
					/>
					<Button
						label='Cancelar'
						type='reset'
						variant='error'
						onClick={() => {
							onClose();
							resetForm();
						}}
					/>
				</div>
			</Form>
		</Modal>
	);
}