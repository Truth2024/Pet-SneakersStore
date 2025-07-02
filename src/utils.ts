import type { Sneaker } from './types/sneakers';

export const safeParse = (data: string | null): Sneaker[] => {
	try {
		return data ? JSON.parse(data) : [];
	} catch {
		return [];
	}
};