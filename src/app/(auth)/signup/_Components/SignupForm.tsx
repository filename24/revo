'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { signup } from '../actions'
import { useActionState, useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { LogIn } from 'lucide-react'
import { z } from 'zod'
import { SignupSchema } from '@/schemas/auth'

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [state, formAction, pending] = useActionState(signup, undefined)

  const [formData, setFormData] = useState<z.infer<typeof SignupSchema>>({
    role: 'STUDENT',
    lastname: '',
    firstname: '',
    birthday: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    if (state?.errors) {
      setFormData((prevData) => ({
        ...prevData
      }))
    }
  }, [state])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='w-full'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Бүртгүүлэх</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className='grid gap-4'>
              <div className='grid gap-3'>
                <Label htmlFor='role'>Таны үүрэг</Label>
                <Select
                  name='role'
                  defaultValue='STUDENT'
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      role: value as 'STUDENT' | 'PARENT'
                    })
                  }
                >
                  <SelectTrigger id='role' className='w-full'>
                    <SelectValue placeholder='Үүргээ сонгоно уу' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='STUDENT'>Сурагч</SelectItem>
                    <SelectItem value='PARENT'>Эцэг эх</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <div className='grid gap-3'>
                  <Label htmlFor='lastname'>Овог</Label>
                  <Input
                    id='lastname'
                    name='lastname'
                    type='text'
                    placeholder='Бат'
                    required
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                  {state?.errors?.lastname && (
                    <p className='text-sm text-red-500'>
                      {state.errors.lastname}
                    </p>
                  )}
                </div>
                <div className='grid gap-3'>
                  <Label htmlFor='firstname'>Нэр</Label>
                  <Input
                    id='firstname'
                    name='firstname'
                    type='text'
                    placeholder='Дорж'
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                  {state?.errors?.firstname && (
                    <p className='text-sm text-red-500'>
                      {state.errors.firstname}
                    </p>
                  )}
                </div>
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='birthday'>Төрсөн огноо</Label>
                <Input
                  id='birthday'
                  name='birthday'
                  type='date'
                  required
                  value={formData.birthday}
                  onChange={handleChange}
                />
                {state?.errors?.birthday && (
                  <p className='text-sm text-red-500'>
                    {state.errors.birthday}
                  </p>
                )}
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='email'>И-мэйл</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                {state?.errors?.email && (
                  <p className='text-sm text-red-500'>{state.errors.email}</p>
                )}
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='phoneNumber'>Утасны дугаар</Label>
                <Input
                  id='phoneNumber'
                  name='phoneNumber'
                  type='tel'
                  placeholder='99112233'
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {state?.errors?.phoneNumber && (
                  <p className='text-sm text-red-500'>
                    {state.errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='username'>Хэрэглэгчийн нэр</Label>
                <Input
                  id='username'
                  name='username'
                  type='text'
                  placeholder='batdorj'
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
                {state?.errors?.username && (
                  <p className='text-sm text-red-500'>
                    {state.errors.username}
                  </p>
                )}
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <div className='grid gap-3'>
                  <Label htmlFor='password'>Нууц үг</Label>
                  <Input
                    id='password'
                    name='password'
                    type='password'
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {state?.errors?.password && (
                    <p className='text-sm text-red-500'>
                      {state.errors.password}
                    </p>
                  )}
                </div>

                <div className='grid gap-3'>
                  <Label htmlFor='confirmPassword'>Нууц үг давтах</Label>
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {state?.errors?.confirmPassword && (
                    <p className='text-sm text-red-500'>
                      {state.errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {state?.errors?._form && (
                <p className='text-sm text-red-500'>{state.errors._form}</p>
              )}

              <Button type='submit' className='w-full' disabled={pending}>
                {pending ? 'Бүртгүүлж байна...' : 'Бүртгүүлэх'}
              </Button>

              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t' />

              <div className='flex flex-col gap-4'>
                <Link href='/login'>
                  <Button variant='outline' className='w-full'>
                    <LogIn className='mr-2 size-4' />
                    Нэвтрэх
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
