import { StatusError } from '@/services/exceptions/StatusError'
import type { IPData } from '@/types'

export async function getIpData(ip: string): Promise<IPData> {
	const response = await fetch(`https://ipapi.co/${ip}/json`, {
		method: 'GET',
		headers: {
			'User-Agent': 'nodejs-ipapi-v1.02',
		},
	})

	if (response.ok) {
		return await response.json()
	}

	throw new StatusError('Service is not reachable', 500)
}
