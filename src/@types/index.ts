import { Appointment, Doctor, Patient } from '@prisma/client';

export interface PaginationParamsProps {
	skip: number;
	take: number;
}

export interface FindAllDoctorsProps {
	doctors: Doctor[];
	count: number;
	totalPages: number;
}

export interface FindAllPatientsProps {
	patients: Patient[];
	count: number;
	totalPages: number;
}

export interface FindAllAppointmentsProps {
	appointments: Appointment[];
	count: number;
	totalPages: number;
}

export interface GetAppointmentsByDayProps extends FindAllAppointmentsProps {}
