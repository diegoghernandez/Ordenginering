import { Callout } from '@/components/common/Callout'
import { PRIMARY__BUTTON } from '@/lib/constants/styles'
import type { FormEvent, ReactElement } from 'react'
import './FormContainer.module.css'

interface Props {
	handleData: (formValues: FormData) => void
	response: {
		status: number
		message: string
	} | null
	children?: Array<ReactElement> | ReactElement
	submitButton: {
		label: string
		isLoading: boolean
	}
}

export function FormContainer({
	handleData,
	response,
	children,
	submitButton,
}: Props) {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.stopPropagation()

		if (event.currentTarget instanceof HTMLFormElement) {
			handleData(new FormData(event.currentTarget))
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			{response?.message ? (
				<Callout
					type={response?.status !== 200 ? 'error' : 'success'}
					message={response?.message}
				/>
			) : null}
			{children}
			<button
				type='submit'
				className={PRIMARY__BUTTON}
				disabled={submitButton.isLoading}
			>
				{submitButton.label}
			</button>
		</form>
	)
}
