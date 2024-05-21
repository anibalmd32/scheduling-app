import HTTPService from '../../../http.service';
import type { Professors, ProfessorFormValues } from '../def';

const service = new HTTPService('professors');

export const createProfessor = async (professorData: ProfessorFormValues) => {

	const { data: professor } = await service.httpCaller<Professors>({
		endpoint: '/',
		method: 'post',
		body: { data: professorData }
	});

	return professor;
};

export const updateProfessor = async (professorID: string, data: ProfessorFormValues) => {
	const { data: professor } = await service.httpCaller<Professors>({
		endpoint: `/${professorID}`,
		method: 'put',
		body: data
	});

	return professor;
};

export const deleteProfessor = async (professorID: string) => {
	await service.httpCaller({
		endpoint: `/${professorID}`,
		method: 'delete',
	});
};

export const asignProfessorSubject = async (professorID: string, data: unknown) => {
	await service.httpCaller({
		endpoint: `/asign/${professorID}`,
		method: 'put',
		body: data
	});
};