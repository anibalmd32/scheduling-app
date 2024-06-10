import React from 'react';
import Spinner from '../../../components/Spinner';
import { ScheduleEvent } from '../../classrooms/def';
import Modal from '../../../components/Modal';
import { useClassroomSchdule } from '../Contexts/ClassroomSchedulesCtx';
import Button from '../../../components/Button';
import { subjectMetadataIndex } from '../utils/subjectMetadataIndex';

export const ScheduleDetails = () => {
	const [details, setDetails] = React.useState<ScheduleEvent>();
	const { openModal, handleOpenModal, selectedSubject, classroomSchduleEvents, argsFormDelete } = useClassroomSchdule();

	React.useEffect(() => {
		if (selectedSubject) {
			const event = classroomSchduleEvents.find(event => event.id === selectedSubject);
			setDetails(event);
		}
	}, [selectedSubject]);

	const handleDelete = () => {
		if (argsFormDelete) {
			argsFormDelete.event.remove();
			handleOpenModal('details');
		}
	};

	if (!details) {
		return <Spinner size={200} />;
	}

	return (
		<Modal open={openModal.forDetails} onClose={() => handleOpenModal('details')}>
			<article className="p-4 min-w-[400px]">
				<div className="flex flex-col items-center">
					<div className="w-full bg-blue-500 rounded-lg">
						<div className="p-4 text-white">
							<h1 className="text-2xl font-bold">{details.title}</h1>

							<div className="mt-4">
								<p className="text-sm">{details.type}</p>
								{
									details.metadata.map(metadata => (
										<p key={metadata.key} className="text-sm">
											{subjectMetadataIndex[metadata.key]}: {metadata.value}
										</p>
									))
								}
							</div>

							<div>
								{/* TODO: Agregar el profesor */}
							</div>

							<div className='mt-4'>
								<Button
									label='Eliminar del horario'
									onClick={handleDelete}
									type='button'
									variant='error'
								/>
							</div>
						</div>
					</div>
				</div>
			</article>
		</Modal>
	);
};
