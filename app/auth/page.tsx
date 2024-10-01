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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log(`${isRegister ? 'Registering' : 'Logging in'} with:`, { phone, password, name })

    setIsLoading(false)
    router.push('/referral')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Authentication</CardTitle>
          <CardDescription>Login or create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <form onSubmit={handleSubmit}>
              <TabsContent value="login">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="register">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Name</Label>
                    <Input id="register-name" name="name" type="text" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Phone Number</Label>
                    <Input id="register-phone" name="phone" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input id="register-password" name="password" type="password" required />
                  </div>
                </div>
              </TabsContent>
              <input type="hidden" name="action" value="login" />
              <CardFooter className="mt-4">
                <Button className="w-full" type="submit" disabled={isLoading}>
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
