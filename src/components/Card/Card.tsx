import styles from "./Card.module.scss";
import type { Sneaker } from "../../types/sneakers";


interface CardProps {
	item: Sneaker;
	handleAddToCart?: () => void;
	handleAddToFavorite?: () => void;
	disableActions?: boolean;
}



export const Card = ({ item, handleAddToCart, handleAddToFavorite, disableActions }: CardProps) => {



	return (
		<div className={`${styles.card} p-30`}>
			{!disableActions && (
				<div onClick={handleAddToFavorite} className={styles.favorite}>
					<img
						src="/img/like.svg"
						alt="like"
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							opacity: item.isFavorite ? 1 : 0,
							transition: 'opacity 0.2s ease-in-out',
							width: '32px',
							height: '32px',
						}}
					/>
					<img
						src="/img/unlike.svg"
						alt="unlike"
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							opacity: item.isFavorite ? 0 : 1,
							transition: 'opacity 0.2s ease-in-out',
							width: '32px',
							height: '32px',
						}}
					/>
				</div>
			)}

			<img width={133} height={112} src={item.imageUrl} alt="" />
			<p>{item.title}</p>
			<div className={`d-flex justify-between align-center`}>
				<div className={`d-flex flex-column`}>
					<span>Цена:</span>
					<b>{item.price} руб.</b>
				</div>
				{!disableActions && (
					<button
						onClick={handleAddToCart}
						className={`d-flex justify-center align-center ${styles.button} ${item.isAdded ? styles.bgGreen : ''}`}
					>
						<img
							height={11}
							width={11}
							src={item.isAdded ? "/img/add.svg" : "/img/plus.svg"}
							alt="plus"
						/>
					</button>
				)}
			</div>
		</div>
	)
}