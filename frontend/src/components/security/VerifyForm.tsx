import { useServicePromise } from '@/hooks/useServicePromise'
import { resendToken } from '@/services/authService'
import { FormContainer } from '../common/FormContainer'

interface Props {
	t: {
		token: string
		resend: string
		responses: { [key: string]: string }
	}
}

export function VerifyForm({ t }: Props) {
	const { isLoading, response, handlePromise } = useServicePromise(resendToken)

	const handleData = () =>
		handlePromise({
			token:
				new URLSearchParams(document.location.search).get('token') ?? '',
		})

	return (
		<FormContainer
			handleData={handleData}
			response={
				response
					? {
							status: response.status,
							message: response.message
								? t.responses[response.message]
								: '',
					  }
					: response
			}
			submitButton={{ label: t.resend, isLoading }}
		>
			<h2>{t.token}</h2>
		</FormContainer>
	)
}
