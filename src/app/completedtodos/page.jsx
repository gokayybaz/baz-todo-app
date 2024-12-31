"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"


export default function page() {
  const [completedTodos, setCompletedTodos] = useState([])
  
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        // Sadece tamamlanmış görevleri filtrele
        setCompletedTodos(parsedTodos.filter(todo => todo.completed)); // {{ edit_1 }}
    }
  }, [])

  const deleteTodo = (id) => {
    setCompletedTodos(completedTodos.filter(todo => todo.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col">


      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tamamlanan Görevler</h2>
            <AnimatePresence>
              {completedTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="flex items-center justify-between p-4 mb-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-gray-400 line-through text-lg">
                      {todo.text}
                    </span>
                    </div>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-100" onClick={() => deleteTodo(todo.id)}>
                    <Trash className="h-5 w-5 text-purple-500" />
                  </Button>
                </motion.div>   
              ))}
            </AnimatePresence>
            {completedTodos.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 mt-8"
              >
                Henüz tamamlanmış görev bulunmuyor.
              </motion.p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}