import { createContext, useState, useEffect, useContext } from 'react';
import type { Sneaker } from './types/sneakers';
import axios from './api/axiosInstance'
import { safeParse } from './utils';

// Типы для контекста
interface ContextType {
	sneakers: Sneaker[];
	cart: Sneaker[];
	favorites: Sneaker[];
	orders: Sneaker[];
	isCartOpen: boolean;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setSneakers: React.Dispatch<React.SetStateAction<Sneaker[]>>;
	setCart: React.Dispatch<React.SetStateAction<Sneaker[]>>;
	setFavorites: React.Dispatch<React.SetStateAction<Sneaker[]>>;
	setOrders: React.Dispatch<React.SetStateAction<Sneaker[]>>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleCheckout: () => void;
	toggleCart: () => void;
}



export const AppContext = createContext<ContextType | null>(null);

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within AppProvider');
	}
	return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [isCartOpen, setOpen] = useState(false);
	const [sneakers, setSneakers] = useState<Sneaker[]>([]);
	const [cart, setCart] = useState<Sneaker[]>([]);
	const [favorites, setFavorites] = useState<Sneaker[]>([]);
	const [orders, setOrders] = useState<Sneaker[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				setIsLoading(true);
				const { data } = await axios.get<Sneaker[]>('/items');

				const [cartData, favoritesData, ordersData] = [
					localStorage.getItem('cart'),
					localStorage.getItem('favorites'),
					localStorage.getItem('orders')
				].map(safeParse);

				setCart(cartData);
				setFavorites(favoritesData);
				setOrders(ordersData);

				setSneakers(data.map(item => ({
					...item,
					isAdded: cartData.some(i => i.id === item.id),
					isFavorite: favoritesData.some(i => i.id === item.id),
					isOrdered: ordersData.some(i => i.id === item.id) // Добавляем флаг заказа
				})));
			} catch (error) {
				console.error('Ошибка загрузки данных:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadData();
	}, []);

	useEffect(() => {
		if (!isLoading) {
			setSneakers(prev => prev.map(item => ({
				...item,
				isAdded: cart.some(i => i.id === item.id),
				isFavorite: favorites.some(i => i.id === item.id),
				isOrdered: orders.some(i => i.id === item.id) // Синхронизируем с заказами
			})));
		}
	}, [cart, favorites, orders, isLoading]);

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem('cart', JSON.stringify(cart));
		}
	}, [cart, isLoading]);

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem('favorites', JSON.stringify(favorites));
		}
	}, [favorites, isLoading]);

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem('orders', JSON.stringify(orders));
		}
	}, [orders, isLoading]);

	const handleCheckout = () => {
		setOpen(false);
		alert('Заказ оформлен! Корзина очищена.');
	};
	const toggleCart = () => {
		setOpen(prev => !prev);
	};

	return (
		<AppContext.Provider
			value={{
				sneakers,
				cart,
				favorites,
				orders,
				isCartOpen,
				isLoading,
				setSneakers,
				setCart,
				setFavorites,
				setOrders,
				setIsLoading,
				setOpen,
				toggleCart,
				handleCheckout,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
