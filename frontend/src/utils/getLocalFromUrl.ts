export function getLocalFromUrl() {
	return globalThis.location.pathname.includes('/es/') ? 'es' : 'en'
}
