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

export type WelcomeTranslation = {
	preview: string
	title: string
	message: string
	activationLink: string
}

export default function Welcome({ token, locale }: Props) {
	const t = getTranslation<WelcomeTranslation>('welcome', locale)

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
							{t.message}
						</Text>
						<Link
							href={`${CLIENT_DOMAIN}/${locale}/verify?token=${token}`}
							className='block h-9 pb-1 pt-2 bg-primary font-serif text-lg text-center text-pretty text-background rounded-lg'
						>
							{t.activationLink}
						</Link>
					</Container>
				</Body>
			</Html>
		</PizzaStyles>
	)
}
