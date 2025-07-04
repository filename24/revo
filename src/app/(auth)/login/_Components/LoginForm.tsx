'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import { login } from '../actions'
import { useActionState } from 'react'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [state, formAction, pending] = useActionState(login, undefined)

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Нэвтрэх</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className='grid gap-6'>
              <div className='grid gap-6'>
                <div className='grid gap-3'>
                  <Label htmlFor='username'>Хэрэглэгчийн нэр</Label>
                  <Input
                    id='username'
                    name='username'
                    type='text'
                    placeholder='m@example.com'
                    required
                  />
                </div>
                <div className='grid gap-3'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Нууц үг</Label>
                    <Link
                      href='/recovery'
                      className='ml-auto text-sm underline-offset-4 hover:underline'
                    >
                      Нууц үгээ мартсан уу?
                    </Link>
                  </div>
                  <Input
                    id='password'
                    name='password'
                    type='password'
                    required
                  />
                </div>
                {state?.error && (
                  <p className='text-sm text-red-500'>{state.error}</p>
                )}
                <Button type='submit' className='w-full' disabled={pending}>
                  {pending ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
                </Button>
              </div>
              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t' />
              <div className='flex flex-col gap-4'>
                <Link href='/signup'>
                  <Button variant='outline' className='w-full'>
                    <UserPlus />
                    Бүртгүүлэх
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
