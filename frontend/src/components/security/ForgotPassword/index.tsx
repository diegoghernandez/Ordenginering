import forgotPassword from '@/assets/i18n/components/ForgotPassword.json'
import { CustomInput } from '@/components/common/CustomInput'
import { FormContainer } from '@/components/common/FormContainer'
import { SmallModalContainer } from '@/components/common/SmallModalContainer'
import { SECONDARY__BUTTON } from '@/constants/styles'
import { useServicePromise } from '@/hooks/useServicePromise'
import { sendResetPassword } from '@/services/authService'
import type { LocalesString } from '@/types'
import { getFormValue } from '@/utils/getFormValue'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Styles from './ForgotPassword.module.css'

interface Props {
	locale: LocalesString
}

export function ForgotPassword({ locale }: Props) {
	const { response, error, isLoading, handlePromise } = useServicePromise<
		string,
		string
	>(sendResetPassword)
	const [canIUsePortal, setCanIUsePortal] = useState(false)
	const dialogRef = useRef<HTMLDialogElement>(null)
	const t = forgotPassword[locale]

	function handleData(formValues: FormData): void {
		handlePromise(getFormValue(t.label, formValues))
	}

	useEffect(() => {
		setCanIUsePortal(true)
	}, [])

	useEffect(() => {
		const forms = dialogRef?.current?.querySelectorAll('form')

		if (forms) {
			for (const formElement of forms) {
				if (formElement instanceof HTMLFormElement) {
					formElement.addEventListener('submit', (event) => {
						event.preventDefault()
					})
				}
			}
		}
	}, [canIUsePortal])

	return (
		<>
			<button
				className={Styles['reset-button']}
				type='button'
				onClick={() => dialogRef.current?.showModal()}
			>
				{t.forgotButton}
			</button>
			{canIUsePortal
				? createPortal(
						<SmallModalContainer ref={dialogRef}>
							<>
								<h3>{t.title}</h3>
								<FormContainer
									response={
										response
											? {
													status: response.status,
													message: response.message
														? t.responses[
																response.message as keyof typeof t.responses
														  ]
														: '',
											  }
											: response
									}
									handleData={handleData}
									submitButton={{ label: t.forgotButton, isLoading }}
								>
									<CustomInput
										label={t.label}
										type='email'
										placeholder='email@example.com'
										disable={isLoading}
										required={true}
										error={error?.email}
									/>
								</FormContainer>
								<button
									type='button'
									className={SECONDARY__BUTTON}
									onClick={() => dialogRef.current?.close()}
								>
									{t.cancel}
								</button>
							</>
						</SmallModalContainer>,
						document.body
				  )
				: null}
		</>
	)
}
