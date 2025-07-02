import { useState, useMemo, useRef, useEffect } from "react";
import type { Sneaker } from "../types/sneakers";
import { Card } from "../components/Card/Card";
import { useAppContext } from "../context";
import { Skeleton } from "../components/Skeleton/Skeleton";
import { HeroBanner } from "../components/HeroBanner/HeroBanner";

export const Home = () => {
	const { sneakers, cart, favorites, setFavorites, setCart, setSneakers, isLoading } = useAppContext()
	const inputRef = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState('');

	useEffect(() => {
		if (!sneakers.length) return;

		setSneakers(prev =>
			prev.map(item => ({
				...item,
				isFavorite: favorites.some(fav => fav.id === item.id),
				isAdded: cart.some(cartItem => cartItem.id === item.id),
			}))
		);
	}, [favorites, cart, sneakers.length]);
	//фильтрации кроссовок с мемо
	const filteredSneakers = useMemo(() => {
		return sneakers.filter(item =>
			item.title.toLowerCase().includes(value.toLowerCase())
		);
	}, [sneakers, value]);

	const handleFocus = () => {
		inputRef.current?.focus();
	};

	const handleAddToCart = (item: Sneaker) => {
		const isInCart = cart.some(i => i.id === item.id);

		if (isInCart) {
			// Удаляем из корзины при повторном нажатии
			const updatedCart = cart.filter(i => i.id !== item.id);
			setCart(updatedCart);
			localStorage.setItem('cart', JSON.stringify(updatedCart));

			setSneakers(prev => prev.map(i =>
				i.id === item.id ? { ...i, isAdded: false } : i
			));
		} else {
			// Добавляем в корзину
			const updatedCart = [...cart, { ...item, isAdded: true }];
			setCart(updatedCart);
			localStorage.setItem('cart', JSON.stringify(updatedCart));

			setSneakers(prev => prev.map(i =>
				i.id === item.id ? { ...i, isAdded: true } : i
			));
		}
	};

	const handleAddToFavorite = (item: Sneaker) => {
		const isInFavorite = favorites.some(i => i.id === item.id);
		if (isInFavorite) {
			const updatedFavorites = favorites.filter(i => i.id !== item.id);
			setFavorites(updatedFavorites);
			localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

			setSneakers(prev => prev.map(i =>
				i.id === item.id ? { ...i, isFavorite: false } : i
			));
			return;
		}

		const updatedFavorites = [...favorites, { ...item, isFavorite: true }];
		setFavorites(updatedFavorites);
		localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

		setSneakers(prev => prev.map(i =>
			i.id === item.id ? { ...i, isFavorite: true } : i
		));
	};

	return (
		
		<div className="content p-40">
			<HeroBanner />
			<div className="mb-50 d-flex justify-between align-center">
				<h1 className="m-0">Все кроссовки</h1>
				<div className="search">
					<img onClick={handleFocus} src="/img/search.svg" alt="Search" />
					<input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						ref={inputRef}
						className=""
						type="text"
						placeholder="Поиск..."
					/>
				</div>
			</div>

			<div className="d-flex flex-wrap gap-40">
				{isLoading ? (

					Array(8).fill(0).map((_, index) => <Skeleton key={index} />)
				) : filteredSneakers.length > 0 ? (

					filteredSneakers.map(item => (
						<Card
							handleAddToFavorite={() => handleAddToFavorite(item)}
							key={item.id}
							item={item}
							handleAddToCart={() => handleAddToCart(item)}
						/>
					))
				) : (
					<h4 className="m-0 text-center">Нет данных о товарах</h4>
				)}
			</div>
		</div>
	);
};