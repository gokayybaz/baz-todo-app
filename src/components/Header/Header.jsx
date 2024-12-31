import { CheckCircle2 } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { User } from 'lucide-react'

function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-8 w-8 text-purple-500" />
            <h1 className="text-2xl font-bold text-gray-800">Baz Todo App</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-100">
            <User className="h-5 w-5 text-purple-500" />
          </Button>
        </div>
      </header>
  )
}

export default Header