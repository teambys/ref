'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const phone = formData.get('phone') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const isRegister = formData.get('action') === 'register'

    if (isRegister) {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, phone }),
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        router.push('/referral')
      } catch (error) {
        console.error('Registration error:', error);
      }
    } else {
      router.push('/referral')
    }

    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-[350px] bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Authentication</CardTitle>
          <CardDescription className="text-gray-400">Login or create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger value="login" className="data-[state=active]:bg-gray-900">Login</TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-gray-900">Register</TabsTrigger>
            </TabsList>
            <form onSubmit={handleSubmit}>
              <TabsContent value="login">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" required className="bg-gray-700 text-white border-gray-600" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Input id="password" name="password" type="password" required className="bg-gray-700 text-white border-gray-600" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="register">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-white">Name</Label>
                    <Input id="register-name" name="name" type="text" required className="bg-gray-700 text-white border-gray-600" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-phone" className="text-white">Phone Number</Label>
                    <Input id="register-phone" name="phone" type="tel" required className="bg-gray-700 text-white border-gray-600" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-white">Password</Label>
                    <Input id="register-password" name="password" type="password" required className="bg-gray-700 text-white border-gray-600" />
                  </div>
                </div>
              </TabsContent>
              <input type="hidden" name="action" id="form-action" value="login" />
              <CardFooter className="mt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Submit'}
                </Button>
              </CardFooter>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
