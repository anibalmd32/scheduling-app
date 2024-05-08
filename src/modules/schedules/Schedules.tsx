// * COMPONENTS
import Tabs from '../../components/Tabs';

// * UTIL
import scheduleModuleTabs from './utils/scheduleTabs';

function Schedules() {
	return (
		<section className="mt-8">
			<h1 className='text-3xl text-blue-950 font-bold'>Horarios de clase</h1>

			<Tabs items={scheduleModuleTabs()} />
		</section>
	);
}

export default Schedules;
