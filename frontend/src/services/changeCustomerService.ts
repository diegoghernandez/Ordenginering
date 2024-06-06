import type { ValuesForChangeDto } from '@/types'
import { StatusError } from '@/services/exceptions/StatusError'

const URL = import.meta.env.PUBLIC_URL ?? 'http://localhost:8765'
const API = URL +  '/customer/change'

export interface ChangeProfileValues extends ValuesForChangeDto {
   name: string
   birthDate: string
}

export async function changeProfile({ name, birthDate, ...valuesForChangeDto }: ChangeProfileValues) {
   const response = await fetch(`${API}/profile`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         name,
         birthDate,
         valuesForChangeDto
      })
   })

   if (response.ok) return response.text()
   else throw new StatusError(await response.text(), response.status)
}

export interface ChangePasswordValues extends ValuesForChangeDto {
   newPassword: string
}

export async function changePassword({ newPassword, ...changeDto }: ChangePasswordValues) {
   const response = await fetch(`${API}/password/${newPassword}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(changeDto)
   })

   if (response.ok) return response.text()
   else throw new StatusError(await response.text(), response.status)
}

export interface ChangeEmailValues extends ValuesForChangeDto {
   email: string
}

export async function changeEmail({ email, ...changeDto }: ChangeEmailValues) {
   const response = await fetch(`${API}/email/${email}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(changeDto)
   })

   if (response.ok) return response.text()
   else throw new StatusError(await response.text(), response.status)
}