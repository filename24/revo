import { z } from 'zod'

export const SignupSchema = z
  .object({
    role: z.enum(['STUDENT', 'PARENT']),
    lastname: z.string().min(1, 'Овог оруулна уу'),
    firstname: z.string().min(1, 'Нэр оруулна уу'),
    birthday: z.string().min(1, 'Төрсөн огноо оруулна уу'),
    email: z.string().email('И-мэйл хаяг буруу байна'),
    phoneNumber: z.string().min(8, 'Утасны дугаар буруу байна'),
    username: z
      .string()
      .min(3, 'Хэрэглэгчийн нэр дор хаяж 3 тэмдэгт байх ёстой'),
    password: z.string().min(6, 'Нууц үг дор хаяж 6 тэмдэгт байх ёстой'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Нууц үг таарахгүй байна.',
    path: ['confirmPassword']
  })
