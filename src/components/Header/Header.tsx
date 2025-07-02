import type { Sneaker } from "../../types/sneakers";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context";



export const Header = () => {
	const { cart, toggleCart } = useAppContext();

	const total = cart.reduce((sum: number, item: Sneaker) => sum + item.price, 0);
	return (
		<header className="d-flex justify-between align-center border p-40">

			<Link className="d-flex" to="/">

				<img className="mr-10" width={40} height={40} src="/img/logo.png" alt="" />
				<div className="d-flex flex-column">
					<h2 className="m-0">React Sneakers</h2>
					<p className="m-0">Магазин лучших кроссовок</p>
				</div>
			</Link>


			<ul className="d-flex align-center gap-32">
				<li onClick={toggleCart} className="cu-p">
					<img className="mr-10" src="/img/trashcan.svg" alt="" />
					<span>{total} руб.</span>
				</li>
				<li>
					<Link to="/favorite">
						<img className="mr-10" src="/img/favorite.svg" alt="" />

						Закладки
					</Link>
				</li>
				<li>
					<Link to="/profile">
						<img className="mr-10" src="/img/profile.svg" alt="" />
						Профиль
					</Link>

				</li>
			</ul>
		</header>
	)
}