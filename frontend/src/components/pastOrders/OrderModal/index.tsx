import { CardContainer } from '@/components/common/CardContainer'
import { ImgContainer } from '@/components/common/ImgContainer'
import { IngredientsContainer } from '@/components/common/IngredientsContainer'
import { LargeModalContainer } from '@/components/common/LargeModalContainer'
import { IMAGE_CDN } from '@/lib/constants/imageCDN'
import type { LocalesString, Order } from '@/types'
import Styles from './OrderModal.module.css'

export type OrderModalTranslation = {
	dialogTitle: string
	date: string
	products: string
	country: string
	state: string
	city: string
	street: string
	houseNumber: string
	floor: string
	apartment: string
	size: { [key: PropertyKey]: string }
}

interface Props {
	funToSaveDialog: (element: { showModal: () => void }) => void
	order: Order
	t: OrderModalTranslation
	currentLocale: LocalesString
}

export function OrderModal({
	funToSaveDialog,
	order,
	t,
	currentLocale,
}: Props) {
	return (
		<LargeModalContainer
			ref={funToSaveDialog}
			position='right'
			description={t.dialogTitle}
			currentLocale={currentLocale}
		>
			<section className={Styles['order-container']}>
				<CardContainer styleClass={Styles['order-description-container']}>
					<>
						<p>
							{t.date.concat(': ')}
							<time dateTime={order.orderTimestamp}>
								{new Intl.DateTimeFormat(currentLocale, {
									dateStyle: 'short',
									timeStyle: 'medium',
								}).format(new Date(order.orderTimestamp))}
							</time>
						</p>
						<p>
							{t.products}: <span>{order.pizzaList.length}</span>
						</p>
						<p>
							Total: <span>${order.total}</span>
						</p>
						<p>
							{t.country}: <span>{order.country}</span>
						</p>
						<p>
							{t.state}: <span>{order.state}</span>
						</p>
						<p>
							{t.city}: <span>{order.city}</span>
						</p>
						<p>
							{t.street}: <span>{order.street}</span>
						</p>
						<p>
							{t.houseNumber}: <span>{order.houseNumber}</span>
						</p>
						{order.floor ? (
							<p>
								{t.floor}: <span>{order.floor}</span>
							</p>
						) : null}
						{order.apartment ? (
							<p>
								{t.apartment}: <span>{order.apartment}</span>
							</p>
						) : null}
					</>
				</CardContainer>
				{order.pizzaList.map((pizza) => (
					<CardContainer
						key={pizza.idPizza}
						styleClass={Styles['order-pizza-container']}
					>
						<>
							<ImgContainer
								locale={currentLocale}
								authorName={pizza.pizzaImageAuthor[currentLocale]}
							>
								<img
									src={`${IMAGE_CDN}/pizza/${pizza.pizzaImageName}.avif`}
									alt={pizza.pizzaName + ' pizza'}
								/>
							</ImgContainer>
							<h2>{pizza.pizzaName[currentLocale]}</h2>
							<p>{t.size[pizza.size.toLowerCase()]}</p>
							<p>${pizza.price}</p>
							<IngredientsContainer
								ingredients={pizza.pizzaIngredients}
								local={currentLocale}
							/>
							<p>X{pizza.quantity}</p>
						</>
					</CardContainer>
				))}
			</section>
		</LargeModalContainer>
	)
}
