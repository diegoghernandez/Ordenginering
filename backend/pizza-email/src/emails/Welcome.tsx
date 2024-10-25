import {
	Body,
	Container,
	Head,
	Html,
	Link,
	Preview,
	Text,
} from '@react-email/components'
import { getTranslation } from '../utils/getTranslations.js'

interface Props {
	token: string
	locale: 'es' | 'en'
}

type WelcomeTranslation = {
	preview: string
	message: string
	activationLink: string
}

export default function Welcome({ token, locale }: Props) {
	const t = getTranslation<WelcomeTranslation>('welcome', locale)

	return (
		<Html>
			<Head />
			<Preview>{t.preview}</Preview>
			<Body>
				<Container>
					<Text>{t.message}</Text>
					<Link
						href={`https://ordeninginering.com/client/${locale}/verify/${token}`}
					>
						{t.activationLink}
					</Link>
				</Container>
			</Body>
		</Html>
	)
}
