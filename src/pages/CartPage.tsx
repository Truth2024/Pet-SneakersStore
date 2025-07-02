import styles from './CartPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card/Card';
import { useAppContext } from "../context";




export const CartPage = () => {
	const navigate = useNavigate();
	const { orders, sneakers } = useAppContext();
	// заполняем заказы актуальными данными из sneakers
	const enrichedOrders = orders.map(order => {
		const currentItem = sneakers.find(item => item.id === order.id) || order;
		return {
			...currentItem,
			...order,
			isAdded: false,
			isFavorite: currentItem?.isFavorite || false,
			isOrdered: true
		};
	});

	return (
		<div className="content p-40 d-flex flex-column flex">
			{enrichedOrders.length > 0 ? (
				<>
					<div className="mb-50 d-flex justify-between align-center">
						<h1 className="m-0">Мои покупки</h1>
					</div>
					<div className="d-flex flex-wrap gap-40">
						{enrichedOrders.map(item => (
							<Card
								key={item.id}
								item={item}
								disableActions={true}
							/>
						))}
					</div>
				</>
			) : (
				<div className={`d-flex flex-column align-center justify-center flex ${styles.CartEmpty}`}>
					<img src="/img/order-empty.jpg" width={120} height={120} alt="empty" />
					<h3 className="m-0 mb-10">У вас нет покупок</h3>
					<p className={`m-0 ${styles.p}`}>Оформите хотя бы один заказ, чтобы он появился здесь.</p>
					<button
						className={styles.GreenButton}
						onClick={() => navigate("/")}
					>
						<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M14.7144 7L1.00007 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						Вернуться назад
					</button>
				</div>
			)}
		</div>
	);
};