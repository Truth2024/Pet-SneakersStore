import type { Sneaker } from '../../types/sneakers';
import styles from './Drawer.module.scss';
import { useAppContext } from '../../context';
import { useEffect } from 'react';



export const Drawer = () => {
	const { isCartOpen, cart, setCart, setOrders, toggleCart, setSneakers, handleCheckout } = useAppContext()
	const total = cart.reduce((sum: number, item: Sneaker) => sum + item.price, 0);
	const tax = Math.round(total * 0.05);

	const handleRemoveFromCart = (item: Sneaker) => {
		const updatedCart = cart.filter(i => i.id !== item.id);
		setCart(updatedCart);
		localStorage.setItem('cart', JSON.stringify(updatedCart));

		setSneakers(prev => prev.map(i =>
			i.id === item.id ? { ...i, isAdded: false } : i
		));
	};


	useEffect(() => {
		document.body.style.overflow = isCartOpen ? 'hidden' : 'auto';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isCartOpen]);

	const handleOrder = () => {
		// Добавляем текущие товары в список заказов
		setOrders(prev => {
			const newOrders = [
				...prev,
				...cart.map(item => ({
					...item,
					orderDate: new Date().toISOString(),
					orderId: Date.now().toString() + Math.random().toString(36).substr(2, 5)
				}))
			];
			localStorage.setItem('orders', JSON.stringify(newOrders));
			return newOrders;
		});

		// Очищаем корзину
		setCart([]);
		localStorage.setItem('cart', JSON.stringify([]));

		// Обновляем флаги у кроссовок
		setSneakers(prev => prev.map(item => ({
			...item,
			isAdded: false,
			isOrdered: cart.some(i => i.id === item.id) || item.isOrdered
		})));

		handleCheckout();
	};

	return (
		<div onClick={toggleCart} className={`${styles.overlay} ${isCartOpen ? styles.visible : ''} `}>
			<div onClick={(e) => e.stopPropagation()} className={`${styles.drawer} d-flex flex-column p-30`}>
				<div className="d-flex justify-between">
					<h2 className="m-0 mb-30">Корзина</h2>
					<img
						onClick={toggleCart}
						className={`${styles.btnRemove}`}
						width={32}
						height={32}
						src="/img/delete.svg"
						alt="close"
					/>
				</div>

				{cart.length > 0 ? (
					<>
						<div className={`${styles.items} mb-40 flex d-flex flex-column gap-20`}>
							{cart.map(item => (
								<div key={item.id} className={`${styles.cartItem} d-flex align-center`}>
									<div
										style={{ backgroundImage: `url(${item.imageUrl})` }}
										className={`${styles.cartItem__img} mr-20`}
									></div>
									<div className="mr-20 flex">
										<p className="m-0 mb-5">{item.title}</p>
										<b>{item.price} руб.</b>
									</div>
									<img
										onClick={() => handleRemoveFromCart(item)}
										className={`${styles.btnRemove}`}
										width={32}
										height={32}
										src='/img/remove.svg'
										alt="delete"
									/>
								</div>
							))}
						</div>

						<div className={`${styles.CartTotalBlock} d-flex flex-column`}>
							<ul className="mb-40">
								<li className="d-flex mb-20">
									<span className="mr-5">Итого</span>
									<div></div>
									<b className="ml-5">{total} руб.</b>
								</li>
								<li className="d-flex">
									<span className="mr-5">Налог 5%:</span>
									<div></div>
									<b className="ml-5">{tax} руб.</b>
								</li>
							</ul>
							<button
								onClick={handleOrder}
								className={`${styles.GreenButton}`}
								disabled={cart.length === 0}
							>
								Оформить заказ
								<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>
						</div>
					</>
				) : (
					<div className={`d-flex flex-column flex justify-center align-center ${styles.CartTotalBlock2}`}>
						<img src="/img/box.jpg" alt="box" />
						<h3 className='m-0'>Корзина пуста</h3>
						<p className='m-0'>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
						<button
							className={`${styles.GreenButton}`}
							onClick={toggleCart}
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
		</div>
	);
};