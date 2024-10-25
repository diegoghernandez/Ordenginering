import fs from 'node:fs'
import path from 'node:path'

export function getTranslation<Translation>(
	translationFile: string,
	locale: 'es' | 'en'
): Translation {
	return JSON.parse(
		fs
			.readFileSync(
				path.join(
					import.meta.dirname,
					`../assets/i18n/${translationFile}.json`
				)
			)
			.toString()
	)[locale]
}
