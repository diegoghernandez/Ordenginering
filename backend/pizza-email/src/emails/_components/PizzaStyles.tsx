import { Tailwind } from '@react-email/components'
import { ReactNode } from 'react'

export function PizzaStyles({ children }: { children: ReactNode }) {
	return (
		<Tailwind
			config={{
				theme: {
					extend: {
						colors: {
							primary: '#F55700',
							background: '#FFF',
							'text-color': '#4C3B33',
						},
					},
				},
			}}
		>
			{children}
		</Tailwind>
	)
}
