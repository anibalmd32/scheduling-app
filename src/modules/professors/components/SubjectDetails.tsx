import Modal from '../../../components/Modal';
import { ScheduleEventData } from '../../schedules/def';
import { subjectMetadataIndex } from '../../schedules/utils/subjectMetadataIndex';
import Button from '../../../components/Button';
import { useProfessors } from '../context/ProfessorsContext';
import { deleteProfessorSubject } from '../services/professorsService';

interface Props {
	details: ScheduleEventData | undefined;
	open: boolean;
	close: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	callendarEvent: any;
}

export default function SubjectDetails({ details, open, close, callendarEvent }: Props) {
	const { loadData, professorId } = useProfessors();
	
	return (
		<Modal open={open} onClose={close}>
			<article className="p-4 min-w-[400px]">
				<div className="flex flex-col items-center">
					<div className="w-full bg-blue-500 rounded-lg">
						<div className="p-4 text-white">
							<h1 className="text-2xl font-bold">{details?.title}</h1>

							<div className="mt-4">
								<p className="text-sm">{details?.type}</p>
								{
									details?.metadata.map(metadata => (
										<p key={metadata.key} className="text-sm">
											{subjectMetadataIndex[metadata.key]}: {metadata.value}
										</p>
									))
								}
							</div>

							<div className='mt-4'>
								<Button
									label='Eliminar del horario'
									onClick={async () => {
										try {
											await deleteProfessorSubject(String(details?.id), professorId);
											loadData();
											close();
											callendarEvent?.event.remove();
											
										} catch (error) {
											console.error('Ocurrio un error al eliminar el horario', error);
										}
									}}
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
}
