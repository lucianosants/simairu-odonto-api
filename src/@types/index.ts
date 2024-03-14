import { Doctor, Patient } from '@prisma/client';

export interface FindAllDoctorsProps {
	doctors: Doctor[];
	count: number;
	totalPages: number;
}

export interface PaginationParamsProps {
	skip: number;
	take: number;
}

export interface FindAllPatientsProps {
	patients: Patient[];
	count: number;
	totalPages: number;
}
