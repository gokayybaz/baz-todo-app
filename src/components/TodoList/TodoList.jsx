"use client"

import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodoText, setNewTodoText] = useState("");

    const addTodo = () => {
        if(newTodoText.trim() !== ""){
            setTodos([...todos, { id: todos.length + 1, text: newTodoText, completed: false }]);
            setNewTodoText("");
        }else{
            alert("Lütfen bir görev giriniz.");
        }
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    }

    const saveTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const loadTodos = () => {
        const savedTodos = localStorage.getItem("todos");
        if(savedTodos){
            setTodos(JSON.parse(savedTodos));
        }
    }

    useEffect(() => {
        loadTodos();
    }, []);

    useEffect(() => {
        saveTodos();
    }, [todos]);
    
  return (
    <main className='flex-grow flex items-center justify-center p-4'>
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Yapılacaklar</h1>
            <div className="flex space-x-2 mb-6">
            <Input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="Yeni görev ekle..."
              className="flex-grow bg-white/50 border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-300 rounded-full"
            />
            <Button  
              size="icon"
              onClick={addTodo}
              className="bg-purple-500 hover:bg-purple-600  transition-colors duration-300 rounded-full shadow-md hover:shadow-lg"
            >
              <Plus className="h-5 w-5 text-white" />
            </Button>
          </div>
          <AnimatePresence>
            {
            todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="group flex items-center justify-between p-4 mb-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className="border-2 border-purple-300 text-purple-500 rounded-full focus:ring-purple-300 transition-all duration-300"
                  />
                  <motion.span
                    animate={{ opacity: todo.completed ? 0.5 : 1 }}
                    className={`${
                      todo.completed ? "line-through text-gray-400" : "text-gray-700"
                    } transition-all duration-300 text-lg`}
                  >
                    {todo.text}
                  </motion.span>
                </div>
                <div className="flex items-center space-x-2">
                  {todo.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </motion.div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {todos.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 mt-8"
            >
              Henüz görev eklemediniz. Yeni bir görev eklemek için yukarıdaki formu kullanın.
            </motion.p>
          )}
        </CardContent>
      </Card>
      </main>
  )
}

export default TodoList