import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { phoneNumber, username } from 'better-auth/plugins'
import prisma from './prisma'
import { createAuthClient } from 'better-auth/react'
import {
  inferAdditionalFields,
  phoneNumberClient,
  usernameClient
} from 'better-auth/client/plugins'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  advanced: {
    cookiePrefix: 'revo'
  },
  appName: 'Revo',
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  plugins: [
    username(),
    phoneNumber({
      sendOTP(data) {
        // TODO: make a send otp logic
        console.log(data)
      }
    }),
    nextCookies()
  ],
  user: {
    additionalFields: {
      firstname: {
        type: 'string'
      },
      lastname: {
        type: 'string'
      },
      birthday: {
        type: 'date'
      },
      phoneNumber: {
        type: 'string'
      },
      role: {
        type: 'string'
      }
    }
  }
})

const authClient = createAuthClient({
  baseURL: process.env.VERCEL_URL ?? process.env.BETTER_AUTH_URL,
  plugins: [
    usernameClient(),
    phoneNumberClient(),
    inferAdditionalFields<typeof auth>()
  ]
})

export const { signIn, signUp, useSession } = authClient
export { authClient }
