'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { InputError } from '@/components/input-error'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'
import { useAuth } from '../api/use-auth'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login, isLoginPending } = useAuth()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    login(
      {
        email,
        password,
      },
      {
        onError(error: Error) {
          setError(error.message)
        },
      },
    )
  }

  return (
    <>
      <Card className='w-full h-full p-8'>
        {error && <InputError message={error} />}
        <CardHeader className='px-0 pt-0'>
          <CardTitle className='text-xl'>Login</CardTitle>
          <CardDescription />
        </CardHeader>
        <CardContent className='px-0 pb-0'>
          <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              value={email}
              disabled={isLoginPending}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              type='email'
              placeholder='Email'
              required
            />
            <div className='flex flex-col'>
              <div className='flex justify-between items-center mb-2'>
                <Label htmlFor='password'>Password</Label>
                <Link href={'/password-reset'} className='text-[13px] text-blue-500 hover:underline hover:underline-offset-2'>
                  Forgot password?
                </Link>
              </div>
              <Input
                id='password'
                name='password'
                value={password}
                disabled={isLoginPending}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
                required
              />
            </div>
            <Button type='submit' className='w-full' size='lg' disabled={isLoginPending}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className='p-4 text-end'>
        <p className='text-sm text-foreground'>
          Don’t have an account? {''}
          <Link href={'/register'} className='text-blue-500 hover:underline hover:underline-offset-2'>
            Create an account
          </Link>
        </p>
      </div>
    </>
  )
}
