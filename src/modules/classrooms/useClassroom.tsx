import { ReactNode, createContext, useContext,  } from 'react';
import { IClassroomContext, Classroom } from './def';
import useData from '../../hooks/useData';

const ClassroomContext = createContext<IClassroomContext>({} as IClassroomContext);

export function ClassroomProvider({ children }: { children: ReactNode }) {
	const { data: classroomsData, isLoading } = useData<Classroom[]>({
		module: 'classrooms',
		requestConfig: {
			endpoint: '/',
			method: 'get'
		}
	});

	return (
		<ClassroomContext.Provider value={{
			classroomsData: classroomsData || [],
			isLoading
		}}>
			{children}
		</ClassroomContext.Provider>
	);
}

const useClassroom = () => useContext(ClassroomContext);

export default useClassroom;
