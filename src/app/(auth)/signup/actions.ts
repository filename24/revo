'use server'

import { signUp } from '@/lib/auth'
import { SignupSchema } from '@/schemas/auth'
import { redirect } from 'next/navigation'

export type SignupState =
  | {
      errors?: {
        role?: string
        lastname?: string
        firstname?: string
        birthday?: string
        email?: string
        phoneNumber?: string
        username?: string
        password?: string
        confirmPassword?: string
        _form?: string
      }
    }
  | undefined

export async function signup(
  _state: SignupState,
  formData: FormData
): Promise<SignupState> {
  const data = Object.fromEntries(formData)
  const parsed = SignupSchema.safeParse(data)

  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const error of parsed.error.errors) {
      errors[error.path[0]] = error.message
    }
    return { errors }
  }

  const name = `${parsed.data.lastname.charAt(0).toUpperCase()} ${
    parsed.data.firstname
  }`

  try {
    const response = await signUp.email(
      {
        name,
        firstname: parsed.data.firstname,
        lastname: parsed.data.lastname,
        birthday: new Date(parsed.data.birthday),
        role: parsed.data.role,
        email: parsed.data.email,
        phoneNumber: parsed.data.phoneNumber,

        username: parsed.data.username,
        password: parsed.data.password
      },
      {
        onError(context) {
          console.error('SignUp Error:', context.error)
          throw new Error(context.error.message)
        }
      }
    )

    if (response?.error) {
      if (response.error.message?.includes('Unique constraint failed')) {
        return {
          errors: {
            username:
              'Хэрэглэгчийн нэр эсвэл и-мэйл аль хэдийн бүртгэлтэй байна.'
          }
        }
      }
      return { errors: { _form: response.error.message } }
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: { _form: 'Бүртгэл амжилтгүй боллоо. Та дахин оролдоно уу.' }
      }
    }
  }

  redirect('/login')
}
