import type { Size } from '@/constants/size'

interface Page {
	pageable: {
		pageNumber: number
		pageSize: number
		offset: number
		paged: boolean
		unpaged: boolean
	}
	totalPages: number
	totalElements: number
	last: boolean
	first: boolean
	size: number
	number: number
	numberOfElements: number
	empty: boolean
}

export interface LocalesObject {
	en: string
	es: string
}

export type LocalesString = 'en' | 'es'

export type TokenStatus = 'SUCCESSFUL' | 'EXPIRED' | 'NONE'

export interface Ingredient {
	id: number
	name?: LocalesObject
	quantity: number
}

export interface IngredientDto {
	imageFile: FormData
	ingredientName: string
	ingredientType: IngredientTypes
	authorImage: string
}

export interface IngredientRequest {
	idIngredient: number
	ingredientName: LocalesObject
	ingredientType: IngredientTypes
	authorImage: LocalesObject | null
	fileNameImage: string
}

export interface CustomerLogIn {
	email: string
	password: string
}

export interface CustomerRole {
	id: number
	role: 'USER' | 'ADMIN'
}

export interface Customer {
	customerName: string
	email: string
	birthDate: string
}

export interface ValuesForChangeDto {
	id: string
	password: string
}

export interface CustomerDto {
	customerName: string
	email: string
	password: string
	matchingPassword: string
	birthDate: string
}

export interface Pizza {
	idPizza?: `${string}-${string}-${string}-${string}-${string}`
	pizzaName: LocalesObject
	pizzaImageName: string
	pizzaImageAuthor: LocalesObject
	price?: number
	size: Size
	quantity: number
	pizzaIngredients: Ingredient[]
}

export interface OrderRequest {
	idCustomer: number
	country: string
	state: string
	city: string
	street: string
	houseNumber: number
	apartment: number | null
	floor: number | null
	pizzaList: Pizza[]
}

export interface Order extends OrderRequest {
	orderId: string
	orderTimestamp: string
	total: number
}

export interface PageOrder extends Page {
	content: Order[]
}

export interface UserInputProps {
	label: string
	description?: string
	required?: boolean
	error?: string
	disable?: boolean
}

export type ActiveLink = 'Home' | 'Menu' | 'Customize' | 'Account' | ''

export interface ProfileLinks {
	url: string
	name: string
	active?: boolean
}

export interface IPData {
	ip: string
	network: string
	version: string
	city: string
	region: string
	region_code: string
	country: string
	country_name: string
	country_code: string
	country_code_iso3: string
	country_capital: string
	country_tld: string
	continent_code: string
	in_eu: boolean
	postal: string
	latitude: number
	longitude: number
	timezone: string
	utc_offset: string
	country_calling_code: string
	currency: string
	currency_name: string
	languages: string
	country_area: number
	country_population: number
	asn: string
	org: string
}

export interface SeoTranslation {
	title: string
	description: string
	h1?: string
}

export interface QuantityTranslation {
	name: string
	decrease: string
	increase: string
}
