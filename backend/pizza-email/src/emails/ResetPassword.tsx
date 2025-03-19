import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Text,
} from '@react-email/components'
import { CLIENT_DOMAIN } from '../constants/ClientDomain.js'
import { getTranslation } from '../utils/getTranslations.js'
import { PizzaStyles } from './_components/PizzaStyles.js'

interface Props {
	token: string
	locale: 'es' | 'en'
}

export type ResetPasswordTranslation = {
	preview: string
	title: string
	message1: string
	message2: string
	resetLink: string
}

const resetPasswordTranslation =
	getTranslation<ResetPasswordTranslation>('resetPassword')

export default function ResetPassword({ token, locale }: Props) {
	const t = resetPasswordTranslation[locale]

	return (
		<PizzaStyles>
			<Html>
				<Head />
				<Preview>{t.preview}</Preview>
				<Body>
					<Container>
						<Heading className='text-primary font-serif text-pretty'>
							{t.title}
						</Heading>
						<Text className='text-lg text-text-color font-serif text-pretty'>
							{t.message1}
						</Text>
						<Link
							href={`${CLIENT_DOMAIN}/${locale}/reset-password?token=${token}`}
							className='block h-9 pb-1 pt-2 bg-primary font-serif text-lg text-center text-pretty text-background rounded-lg'
						>
							{t.resetLink}
						</Link>
						<Text className='text-lg text-text-color font-serif text-pretty'>
							{t.message2}
						</Text>
					</Container>
				</Body>
			</Html>
		</PizzaStyles>
	)
}
