import { CustomInput } from '@/components/common/CustomInput'
import { FormContainer } from '@/components/common/FormContainer'
import { ResendToken } from '@/components/security/ResendToken'
import { useServicePromise } from '@/lib/hooks/useServicePromise'
import { resetPassword } from '@/services/authService'
import type { TokenStatus, VerifyTokenDto } from '@/types'
import { getFormValue } from '@/utils/getFormValue'

interface Props {
	t: {
		submit: string
		labels: {
			newPassword: string
			confirmNewPassword: string
		}
		responses: {
			[key: string]: string
		}
		errors: {
			[key: string]: string
		}
		resend: {
			resendButton: string
			SUCCESS: string
		}
	}
}

export function ResetPasswordForm({ t }: Props) {
	const { response, isLoading, error, handlePromise, setError } =
		useServicePromise<VerifyTokenDto, TokenStatus>(resetPassword)

	const handleData = (formValues: FormData) => {
		if (
			getFormValue(t.labels.newPassword, formValues) !==
			getFormValue(t.labels.confirmNewPassword, formValues)
		) {
			setError({
				newPasswordError: t.errors['NOT_MATCH'],
				repeatNewPasswordError: t.errors['NOT_MATCH'],
			})
		} else {
			handlePromise({
				token:
					new URLSearchParams(document.location.search).get('token') ?? '',
				newPassword: getFormValue(t.labels.newPassword, formValues),
				repeatNewPassword: getFormValue(
					t.labels.confirmNewPassword,
					formValues
				),
			})
		}
	}

	return (
		<>
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
				submitButton={{ isLoading, label: t.submit }}
			>
				<CustomInput
					label={t.labels.newPassword}
					type='password'
					required={true}
					error={error?.newPasswordError}
					disable={isLoading}
				/>
				<CustomInput
					label={t.labels.confirmNewPassword}
					type='password'
					required={true}
					error={error?.repeatNewPasswordError}
					disable={isLoading}
				/>
			</FormContainer>
			{response?.message === 'EXPIRED' ? (
				<ResendToken
					t={{
						resendButton: t.resend.resendButton,
						responses: {
							SUCCESS: t.resend.SUCCESS,
							SERVER: t.responses.SERVER,
						},
					}}
				/>
			) : null}
		</>
	)
}
