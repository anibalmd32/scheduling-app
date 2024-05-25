import React from 'react';
import useSchedule from '../hooks/useSchedule';
import { Classroom } from '../def';
import HTTPService from '../../../http.service';

import Modal from '../../../components/Modal';

const service = new HTTPService('classrooms');

function ClassroomCard({
	_id,
	category,
	code,
	degrees,
	isActive: isActiveProp,
}: Classroom) {
	const { handleOpenModal, isOpenModal } = useSchedule();
	const [isActive, setIsActive] = React.useState<boolean>(isActiveProp);

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

	return (
		<article className="border-2 border-blue-500 rounded-lg shadow-lg overflow-hidden md:min-w-40 mb-8 md:mb-0 pb-4">
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
			<div className='flex gap-4 justify-center items-center'>
				<label>
					<span className='text-xl text-blue-600 hover:scale-110 transition-transform duration-300'>
						Activo
					</span>
					<input
						type="checkbox"
						className="ml-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
						checked={isActive}
						onChange={handleToggleActive}
					/>
				</label>
			</div>

			<Modal open={isOpenModal} onClose={handleOpenModal} >
				<p>Modal</p>
			</Modal>
		</article>
	);
}

export default ClassroomCard;
