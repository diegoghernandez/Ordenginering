import verifyTranslation from '@/assets/i18n/pages/Verify.json'
import { PRIMARY__BUTTON } from '@/constants/styles'
import { verifyAccount } from '@/services/authService'

export async function showVerifyAccountContent() {
	const locale = globalThis.location.pathname.includes('es') ? 'es' : 'en'
	const t = verifyTranslation[locale]
	const URL = globalThis.location.origin + `/client/${locale}`

	const mainElement = document.querySelector('main')
	const textElement = document.createElement('p')

	const tokenStatus = await verifyAccount(
		new URLSearchParams(document.location.search).get('token')
	)
	textElement.textContent = t.token[tokenStatus]
	mainElement?.append(textElement)

	switch (tokenStatus) {
		case 'SUCCESSFUL':
			const anchorElement = document.createElement('a')
			anchorElement.href = `${URL}/login`
			anchorElement.className = PRIMARY__BUTTON
			anchorElement.textContent = 'Login'
			mainElement?.append(anchorElement)
			break

		case 'EXPIRED':
			const buttonElement = document.createElement('button')
			buttonElement.className = PRIMARY__BUTTON
			buttonElement.textContent = 'Resend token'
			buttonElement.addEventListener(
				'click',
				() => console.log('Token resend it'),
				{
					once: true,
				}
			)
			mainElement?.append(buttonElement)
			break

		default:
			globalThis.location.href = `${URL}/404`
			break
	}
}

showVerifyAccountContent()
