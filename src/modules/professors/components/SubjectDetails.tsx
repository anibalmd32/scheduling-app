import Modal from '../../../components/Modal';
import { ScheduleEventData } from '../../schedules/def';
import { subjectMetadataIndex } from '../../schedules/utils/subjectMetadataIndex';
import Button from '../../../components/Button';

interface Props {
	details: ScheduleEventData | undefined;
	open: boolean;
	close: () => void;
}

export default function SubjectDetails({ details, open, close }: Props) {
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
									onClick={() => {}}
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
