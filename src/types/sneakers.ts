export interface Sneaker {
	isOrdered: boolean;
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	isAdded?: boolean;
	isFavorite?: boolean;
	orderDate?: string;
	orderId?: string;
}