import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import HTTPService from '../../http.service';
import { IClassroomContext, Classroom } from './def';

const service = new HTTPService('classrooms');

const ClassroomContext = createContext<IClassroomContext>({} as IClassroomContext);

export function ClassroomProvider({
	children
}: {
	children: ReactNode
}) {
	const [classroomsData, setClassroomsData] = useState<Classroom[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const getClassroomsData = async () => {		
		try {
			const { data } = await service.httpCaller<Classroom>({
				endpoint: '/',
				method: 'get'
			});

			setClassroomsData(data);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!classroomsData.length && isLoading) {
			getClassroomsData();
		}
	}, [classroomsData, isLoading]);

	return (
		<ClassroomContext.Provider value={{
			classroomsData,
			isLoading
		}}>
			{children}
		</ClassroomContext.Provider>
	);
}

const useClassroom = () => useContext(ClassroomContext);

export default useClassroom;
