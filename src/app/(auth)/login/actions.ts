'use client'

import { signIn } from '@/lib/auth'

export async function login(state: unknown, formData: FormData) {
  let response: { error: string } | undefined
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  try {
    await signIn.username(
      { username, password },
      {
        onError(context) {
          console.error('Signin error: ', context)
          throw Error(context.error.statusText, { cause: context.error.status })
        }
      }
    )
  } catch (error) {
    if (error instanceof Error) {
      if (error.cause === 404 || error.cause === 401)
        return {
          error: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.'
        }
      else
        return {
          error: 'Серверт алдаа гарлаа. Та дараа дахин оролдон уу.'
        }
    }
  }
  return response
}
