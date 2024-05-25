import React from 'react';
import { Classroom } from '../def';
import HTTPService from '../../../http.service';
import ClassroomForm from './ClassromForm';
import Button from '../../../components/Button';
import useClassroom from '../useClassroom';

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

	const { loadData } = useClassroom();

	const handleOpenForm = () => setOpenForm(!openForm);

	const handleToggleActive = async () => {
		try {
			await service.httpCaller({
				endpoint: `/${_id}`,
				method: 'patch',
				body: { isActive: !isActive }
			});
			setIsActive(!isActive);
		} catch (error) {
			console.error('Ocurrio un error al cambiar el estado de la aula', error);
		}
	};

	const handleDelete = async () => {
		try {
			await service.httpCaller({
				endpoint: `/${_id}`,
				method: 'delete'
			});
			loadData();
		} catch (error) {
			console.error('Ocurrio un error al eliminar la aula', error);
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
			/>
		</article>
	);
}

export default ClassroomCard;
