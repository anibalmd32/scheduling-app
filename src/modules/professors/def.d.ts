import React from 'react';
import { ScheduleEvent } from '../classrooms/def';

export interface ProfessorData {
	firstName: string;
	lastName: string;
	dni: string;
	email: string;
	phone: string;
}

export interface Professors {
	_id: string;
	data: ProfessorData;
	conditions: string;
	schedule: ScheduleEvent[];
}

export interface ProfessorFormValues extends Pick<ProfessorData, 'firstName' | 'lastName' | 'dni' | 'email' | 'phone'> {}

export interface ProfessorsCtx {
	professors: Professors[];
	isLoading: boolean;
	loadData: () => Promise<void>;
	professorId: string;
	setProfessorId: React.Dispatch<React.SetStateAction<string>>
	openForm: boolean;
	handleOpenForm: () => void
	handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
	formData: ProfessorFormValues
	onSubmit: (data: ProfessorFormValues) => Promise<void>
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => ProfessorFormValues
	handleUpdate: (row: Professors) => void
	handleDelete: (row: Professors) => Promise<void>
	openSubjectModal: boolean
	handleOpenSubjectModal: ( professorId?: string) => void
	handleAsignSubject: (scheduleSelected: unknown) => Promise<void>
	showToast: {
		loading: boolean;
		success: boolean;
		error: boolean;
	}
	error: string
}

