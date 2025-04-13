import { PRIMARY__BUTTON } from '@/lib/constants/styles'
import Styles from './SelectQuantity.module.css'

interface Props {
	valueToShow: number
	minValue?: number
	maxValue?: number
	increase: {
		label: string
		fun: () => void
	}
	decrease: {
		label: string
		fun: () => void
	}
}

export function SelectQuantity({
	valueToShow,
	minValue,
	maxValue,
	increase,
	decrease,
}: Props) {
	return (
		<div className={`${PRIMARY__BUTTON} ${Styles['select-quantity']}`}>
			<button
				aria-label={decrease.label}
				type='button'
				onClick={decrease.fun}
				disabled={valueToShow === minValue}
			>
				{valueToShow >= 2 ? (
					'-'
				) : (
					<svg
						className={`${Styles.humbleicons} humbleicons hi-trash`}
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							xmlns='http://www.w3.org/2000/svg'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M6 6l.934 13.071A1 1 0 007.93 20h8.138a1 1 0 00.997-.929L18 6m-6 5v4m8-9H4m4.5 0l.544-1.632A2 2 0 0110.941 3h2.117a2 2 0 011.898 1.368L15.5 6'
						/>
					</svg>
				)}
			</button>
			<p>{valueToShow}</p>
			<button
				aria-label={increase.label}
				type='button'
				onClick={increase.fun}
				disabled={valueToShow === maxValue}
			>
				+
			</button>
		</div>
	)
}
