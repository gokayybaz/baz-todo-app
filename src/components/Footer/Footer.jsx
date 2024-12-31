import { Twitter } from 'lucide-react'
import { Linkedin } from 'lucide-react'
import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm shadow-sm mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <p className="text-gray-600">&copy; 2023 Baz Todo App. Tüm hakları saklıdır.</p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-600 hover:text-purple-500 transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-purple-500 transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-purple-500 transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </footer>
  )
}

export default Footer