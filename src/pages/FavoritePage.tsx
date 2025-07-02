import type { Sneaker } from "../types/sneakers";
import { Card } from "../components/Card/Card";
import { useNavigate } from "react-router-dom";
import styles from './FavoritePage.module.scss'
import { useAppContext } from "../context";


export const Favorite = () => {
	const navigate = useNavigate();
	const { setSneakers, favorites, setFavorites } = useAppContext();

	const onDeleteFavorite = (item: Sneaker) => {
		setFavorites(prev => {
			const updated = prev.filter(i => i.id !== item.id);
			localStorage.setItem('favorites', JSON.stringify(updated));
			return updated;
		});

		setSneakers(prev =>
			prev.map(i =>
				i.id === item.id ? { ...i, isFavorite: false } : i
			)
		);
	};

	return (
		<div className={`content p-40 ${favorites.length == 0 ? 'd-flex flex-column flex' : ''}`}>

			{favorites.length > 0 ? (<>

				<div className="mb-50 d-flex justify-between align-center">
					<h1 className="m-0">Мои закладки</h1>
				</div>
				<div className="d-flex flex-wrap gap-40">
					{favorites.map(item => (
						<Card
							key={item.id}
							item={item}
							handleAddToFavorite={() => onDeleteFavorite(item)}
						/>
					))}
				</div>
			</>
			) : (
				<>

					<div className="d-flex flex-column align-center justify-center flex">
						<h3 className="m-0 mb-10">У вас нет закладок</h3>
						<p className={`m-0 mb-40 ${styles.p}`}>Вы ничего не добавляли в закладки</p>
						<button className={styles.GreenButton} onClick={() => navigate(-1)}>
							<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M14.7144 7L1.00007 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg> Вернуться назад
						</button>
					</div>
				</>
			)
			}
		</div >
	);
};
