'use client'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import {userRoles} from "@/constants"
import {MoveLeft} from "lucide-react"
import { useState } from 'react'
import toast from 'react-hot-toast';
import { ServerActionAction } from 'next/dist/client/components/router-reducer/router-reducer-types'
import { registerUser } from '@/actions/users';
import { useRouter } from 'next/navigation'
const formSchema = z.object({
    name: z.string().min(2, {message: "Имя должно содержать как минимум 2 символа"}),
    email: z.email({message: "Некорректный email-адрес"}),
    password: z.string().min(6, {message: "Пароль должен содержать как минимум 6 символов"}),
    role: z.string().optional(),
});

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    name: "",
    email: "",
    password: "",
    role: "job-seeker"
    }
  })

 async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const response = await registerUser(values)
    if (response.success) {
    toast.success(response.message)
    router.push('/login')
    } else {
    toast.error(response.message)
    }
    setLoading(false)
}
  return (
       <div className="bg-gray-200 flex justify-center items-center h-screen">
           <div className="bg-white shadow rounded p-5 flex flex-col w-[450px]">
               <div className="flex justify-between items-center">
                   <h1 className="text-primary font-bold! text-2xl">Регистрация аккаунта</h1>
                   <Button variant={"ghost"} className="flex items-center">
                       <MoveLeft />
                       <Link href="/" className="text-sm">Главная</Link>
                   </Button>
               </div>
               <hr className="border border-gray-300 my-4" />
               <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                       <FormField
                           control={form.control}
                           name="name"
                           render={({ field }) => (
                               <FormItem>
                                   <FormLabel>Имя пользователя</FormLabel>
                                   <FormControl>
                                       <Input {...field} />
                                   </FormControl>
                                   <FormMessage />
                               </FormItem>
                           )}
                       />
                       <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                               <FormItem>
                                   <FormLabel>Email</FormLabel>
                                   <FormControl>
                                       <Input {...field} />
                                   </FormControl>
                                   <FormMessage />
                               </FormItem>
                           )}
                       />
                       <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                               <FormItem>
                                   <FormLabel>Пароль</FormLabel>
                                   <FormControl>
                                       <Input {...field} type="password"/>
                                   </FormControl>
                                   <FormMessage />
                               </FormItem>
                           )}
                       />
                       <FormField
                           control={form.control}
                           name="role"
                           render={({ field }) => (
                               <FormItem>
                                   <FormLabel>Роль</FormLabel>
                                   <FormControl>
                                       <Select onValueChange={field.onChange} value={field.value}>
                                           <SelectTrigger className="w-full">
                                               <SelectValue placeholder="Выберите роль" />
                                           </SelectTrigger>
                                           <SelectContent>
                                               {userRoles.map((role) => (
                                                   <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                                               ))}
                                           </SelectContent>
                                       </Select>
                                   </FormControl>
                                   <FormMessage />
                               </FormItem>
                           )}
                       />
                       <Button type="submit" className="w-full mt-2" disabled={loading}>Зарегистрироваться</Button>
                       <div className="flex justify-center gap-1">
                           <h1 className="text-sm">Уже есть аккаунт?</h1>
                           <Link className="text-sm underline" href="/login">Войти</Link>
                       </div>
                   </form>
               </Form>
           </div>
       </div>
   );

}

