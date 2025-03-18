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
import { PizzaStyles } from './_components/PizzaStyles.js'
import { getTranslation } from '../utils/getTranslations.js'

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

export default function ResetPassword({ token, locale }: Props) {
	const t = getTranslation<ResetPasswordTranslation>('resetPassword', locale)

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
							href={`https://ordenginering.com/${locale}/auth/reset-password/${token}`}
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
