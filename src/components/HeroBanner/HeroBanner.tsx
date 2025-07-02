import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper'; // 👈 импорт типа
import 'swiper/css';

import styles from './HeroBanner.module.scss';

const slides = [
	{
		title: 'Stan Smith, Forever!',
		highlight: 'Stan Smith',
		image: '/img/banner.png',
	},
	{
		title: 'Mid Suede',
		highlight: 'Nike Blazer',
		image: '/img/green.png',
	},
];

export const HeroBanner = () => {
	const swiperRef = useRef<SwiperType | null>(null); // 👈 типизированный useRef

	return (
		<section className={`${styles.section}`}>
			<Swiper
				loop
				spaceBetween={50}
				slidesPerView={1}
				autoplay={{ delay: 5000 }}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				className={styles.swiper}
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index}>
						<div
							className={`d-flex ${styles.banner} ${slide.title === 'Mid Suede' ? styles.sneaker : ''}`}
							style={{
								backgroundImage: `url(${slide.image})`,
							}}
						>
							<img className={styles.disney} width={99} height={40} src="/img/disney.png" alt="" />
							<div className={`d-flex flex-column ${styles.left}`}>
								<h2 className="m-0">
									<span>{slide.highlight}</span>, {slide.title.replace(slide.highlight + ', ', '')}
								</h2>
								<button className={styles.button}>Купить</button>
							</div>

							<div className={`d-flex align-center ${styles.right}`}>
								<svg
									onClick={() => swiperRef.current?.slideNext()}
									style={{ cursor: 'pointer' }}
									width="51"
									height="51"
									viewBox="0 0 51 51"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g filter="url(#filter0_d_60_240)">
										<rect x="43" y="39" width="35" height="35" rx="17.5" transform="rotate(-180 43 39)" fill="white" />
									</g>
									<path d="M24 17L29 22L24 27" stroke="#C8C8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									<defs>
										<filter id="filter0_d_60_240" x="0" y="0" width="51" height="51" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
											<feFlood floodOpacity="0" result="BackgroundImageFix" />
											<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
											<feOffset dy="4" />
											<feGaussianBlur stdDeviation="4" />
											<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
											<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_60_240" />
											<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_60_240" result="shape" />
										</filter>
									</defs>
								</svg>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};