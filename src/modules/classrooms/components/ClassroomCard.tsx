import React from 'react';
import { Classroom } from '../def';
import HTTPService from '../../../http.service';
import ClassroomForm from './ClassromForm';
import Button from '../../../components/Button';
import useClassroom from '../hooks/useClassroom';
import Toast from '../../../components/Toast';

const service = new HTTPService('classrooms');

function ClassroomCard({
	_id,
	category,
	code,
	degrees,
	isActive: isActiveProp,
}: Classroom) {
	const [isActive, setIsActive] = React.useState<boolean>(isActiveProp);
	const [openForm, setOpenForm] = React.useState(false);
	const [showToast, setShowToast] = React.useState({
		loading: false,
		success: false,
		error: false
	});

	const { loadData } = useClassroom();

	const handleOpenForm = () => setOpenForm(!openForm);

	const handleToggleActive = async () => {
		setShowToast({
			...showToast,
			loading: true,
			success: false,
			error: false
		});
		try {
			await service.httpCaller({
				endpoint: `/${_id}`,
				method: 'patch',
				body: { isActive: !isActive }
			});
			setShowToast({
				...showToast,
				loading: false,
				success: true,
				error: false
			});
			setIsActive(!isActive);
		} catch (error) {
			setShowToast({
				...showToast,
				loading: false,
				success: false,
				error: true
			});
		}
	};

	const handleDelete = async () => {
		setShowToast({
			...showToast,
			loading: true,
			success: false,
			error: false
		});
		try {
			await service.httpCaller({
				endpoint: `/${_id}`,
				method: 'delete'
			});
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

	return (
		<article className="border-2 border-blue-500 rounded-lg shadow-lg overflow-hidden md:min-w-44 mb-8 md:mb-0 pb-4">
			<div className="p-4 bg-blue-500 text-white">
				<h3 className="font-bold text-xl">{code}</h3>
				<p className="text-sm">{category}</p>
			</div>
			<div className="p-4">
				<h4 className="font-bold">Carreras:</h4>
				<ul>
					{degrees.map((degree, index) => (
						<li key={index} className="text-blue-500">{degree}</li>
					))}
				</ul>
			</div>
			<div className='flex flex-col gap-4 justify-center items-center'>
				<label>
					<span className='text-xl text-blue-600 hover:scale-110 transition-transform duration-300'>
						Activo
					</span>
					<input
						type="checkbox"
						className="ml-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
						checked={isActive}
						onChange={handleToggleActive}
					/>
				</label>

				<div className='flex gap-4 justify-center items-center'>
					<Button
						label='Editar'
						type='button'
						variant='info'
						onClick={handleOpenForm}
					/>

					<Button
						label='Eliminar'
						type='button'
						variant='error'
						onClick={() => {
							handleDelete();
						}}
					/>

				</div>

			</div>

			<ClassroomForm
				open={openForm}
				onClose={handleOpenForm}
				defaultValues={{
					code,
					category
				}}
				classroomId={_id}
				showToast={showToast}
				setShowToast={setShowToast}
			/>

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
					message='Error en la operacion'
					variant='error'
					duraction={3000}
				/>
			)}
		</article>
	);
}

export default ClassroomCard;
