import { CustomInput } from '@/components/common/CustomInput'
import { FormContainer } from '@/components/common/FormContainer'
import { ForgotPassword } from '@/components/security/ForgotPassword'
import { useServicePromise } from '@/lib/hooks/useServicePromise'
import { logIn } from '@/services/authService'
import type { CustomerLogIn, LocalesString } from '@/types'
import { getFormValue } from '@/utils/getFormValue'
import { useEffect } from 'react'

export type LogInFormTranslation = {
	labels: {
		email: string
		password: string
	}
	form: {
		submitLabel: string
		response: string
	}
}

interface Props {
	t: LogInFormTranslation
	locale: LocalesString
}

export function LogInForm({ t, locale }: Props) {
	const { isLoading, error, response, handlePromise } = useServicePromise<
		CustomerLogIn,
		string
	>(logIn)

	const labels = t.labels

	const handleData = (formValues: FormData) => {
		const customerLogIn = {
			email: getFormValue(labels.email, formValues),
			password: getFormValue(labels.password, formValues),
		}

		handlePromise(customerLogIn)
	}

	useEffect(() => {
		if (response?.status === 200) {
			localStorage.setItem('id', response.message)

			setTimeout(() => {
				if (history.length <= 2) globalThis.location.pathname = '/'
				else history.back()
			}, 1000)
		}
	}, [response])

	return (
		<FormContainer
			handleData={handleData}
			response={
				response?.status !== 200
					? response
					: { message: t.form.response, status: 200 }
			}
			submitButton={{
				label: t.form.submitLabel,
				isLoading,
			}}
		>
			<CustomInput
				label={labels.email}
				placeholder='email@name.com'
				required={true}
				type='email'
				error={error?.email}
				disable={isLoading}
			/>
			<CustomInput
				label={labels.password}
				required={true}
				type='password'
				error={error?.password}
				disable={isLoading}
			/>
			<ForgotPassword locale={locale} />
		</FormContainer>
	)
}
