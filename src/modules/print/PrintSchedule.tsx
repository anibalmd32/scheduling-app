import useQuery from '../../hooks/useQuery';
import useData from '../../hooks/useData';
import { ScheduleEventData } from '../schedules/def';
import { AppModule } from '../../def';
import Callendar from '../../components/Callendar';

export default function PrintSchedule() {
	const query = useQuery();

	const scheduleFor = query.get('for');
	const id = query.get('id');

	const endpint = `/for-print/${id}`;
	const module= scheduleFor as AppModule;

	const { data: schedule } = useData<ScheduleEventData[]>({
		module: module,
		requestConfig: {
			endpoint: endpint,
			method: 'get'
		}
	});

	return (
		<div className='p-4'>
			<div className='text-center mt-8'>
				<p>
					Republica Bolivariana de Venezuela
				</p>
				<p>
					Ministerio del poder popular para la educación
				</p>
				<p>
					Universidad Nacional Experimental Politecnica de las Fuerzas Armadas
				</p>
				<p>
					UNEFA
				</p>
			</div>

			<Callendar
				events={schedule || []}
				handleInputEvent={() => {}}
				handleClickEvent={() => {}}
				handleChangeEvent={() => {}}
				onAddEvent={() => {}}
				onDeletEvent={() => {}}
				forPint
			/>
		</div>
	);
}