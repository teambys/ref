'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function ReferralPage() {
  const [referralCode, setReferralCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    await new Promise(resolve => setTimeout(resolve, 1000))

    if (referralCode === 'REF746426') {
      setIsSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } else {
      setError('Invalid referral code. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-[350px] bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Enter Referral Code</CardTitle>
          <CardDescription className="text-gray-400">Please enter your referral code to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="referral-code" className="text-white">Referral Code</Label>
                <Input
                  id="referral-code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Enter referral code"
                  required
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
            </div>
            <CardFooter className="mt-4 flex flex-col items-center">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit" disabled={isSubmitting || isSuccess}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              {error && (
                <div className="flex items-center mt-2 text-red-500">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span>{error}</span>
                </div>
              )}
              {isSuccess && (
                <div className="flex items-center mt-2 text-green-500">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  <span>Referral code accepted! Redirecting to dashboard...</span>
                </div>
              )}
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
