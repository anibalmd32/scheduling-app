import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { IClassroomContext, Classroom } from './def';

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

			setClassroomsData([]);
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
