// * CONTEXT PROVIDER
import { ClassroomScheduleContextProvider } from '../Contexts/ClassroomSchedulesCtx';

// * COMPONENTS
import { ClassroomScheduleComponent } from '../components/ClassroomScheduleComponent';

export const ClassroomScheduleView = () => {
	return (
		<ClassroomScheduleContextProvider>
			<section>
				<ClassroomScheduleComponent />
			</section>
		</ClassroomScheduleContextProvider>
	);
};
