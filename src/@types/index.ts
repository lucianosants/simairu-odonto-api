import { Doctor } from '@prisma/client';

export interface FindAllDoctorsProps {
	doctors: Doctor[];
	count: number;
	totalPages: number;
}

export interface PaginationParamsProps {
	skip: number;
	take: number;
}
