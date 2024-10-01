'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const [balance, setBalance] = useState(25)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setBalance(25)
    }

    fetchUserData()
  }, [])

  const handleLogout = () => {
    router.push('/auth')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-[350px] bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
          <CardDescription className="text-gray-400">Welcome to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <Wallet className="w-6 h-6 mr-2 text-blue-400" />
              <span className="text-lg font-semibold">Balance</span>
            </div>
            <span className="text-2xl font-bold text-green-400">{balance} BDT</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
