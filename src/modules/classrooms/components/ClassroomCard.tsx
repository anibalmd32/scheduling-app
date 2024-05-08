import useSchedule from '../hooks/useSchedule';
import { Classroom,  } from '../def';
import { AiTwotoneSchedule } from 'react-icons/ai';

import Modal from '../../../components/Modal';

function ClassroomCard({
	category,
	code,
	degrees,
}: Classroom) {
	const { handleOpenModal, isOpenModal } = useSchedule();

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
				<button
					className='text-2xl text-blue-600 hover:scale-110 transition-transform duration-300'
					title='Generar horario'
				>
					<AiTwotoneSchedule />
				</button>
			</div>

			<Modal open={isOpenModal} onClose={handleOpenModal} >
				<p>Modal</p>
			</Modal>
		</article>
	);
}

export default ClassroomCard;
