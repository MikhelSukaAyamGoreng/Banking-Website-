"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import FormInput from "@/components/FormInput"
import { Form } from "@/components/ui/form" // 1. Added this import
import { Button } from "@/components/ui/button"
import {authFormSchema} from "@/lib/utils"
import { Loader2 } from 'lucide-react'

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      firstname: "",
      lastname: "",
      postalcode: "",
      address: "",
      dateofbirth: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setisLoading(true)
    console.log(values)
    setisLoading(false);
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="Mono Logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Mono</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className="text-16 font-normal text-gray-600">
              {user ? 'Please link your account to get started' : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          {/* Content for logged-in users */}
        </div>
      ) : (
        <>
          {/* 2. Wrap your inputs in the Form provider and HTML form tag */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                  <>
                    <FormInput 
                      control = {form.control}
                      name = "firstname"
                      label = "First Name"
                      placeholder = "Enter your first name"
                    />

                    <FormInput 
                      control = {form.control}
                      name = "lastname"
                      label = "Last Name"
                      placeholder = "Enter your last name"
                    />

                    <FormInput 
                      control = {form.control}
                      name = "address"
                      label = "Address"
                      placeholder = "Enter your address"
                    />

                    <FormInput 
                      control = {form.control}
                      name = "postalcode"
                      label = "Postal Code"
                      placeholder = "Please enter the correct postal code"
                    />
                    
                    <FormInput 
                      control = {form.control}
                      name = "dateofbirth"
                      label = "Date of Birth"
                      placeholder = "YYYY-MM-DD"
                    />
                  </>
              )}
              <FormInput 
                control={form.control}
                name="username"
                label="Username" 
                placeholder="Please enter 3 or more characters"
              />
              
              <FormInput 
                control={form.control}
                name="email"
                label="Email" 
                placeholder="Please enter the correct email format"
              />

              <FormInput 
                control={form.control}
                name="password"
                label="Password" 
                placeholder="Please enter 5 or more characters"
              />
          
              <div className = "flex flex-col gap-4">
                <Button type="submit" disabled = {isLoading} className="form-btn w-full">
                  {isLoading ? ( 
                  <>
                    <Loader2 size = {20} className = "animate-spin" />
                    &nbsp; Loading...
                  </>)
                    : type === 'sign-in'? 'Sign in': 'Sign up'
                  }     
                  </Button>
              </div>
            </form>
          </Form>

          <footer className = "flex justify-center gap-1">
                <p className = "text-14 font-normal text-gray-600">
                  {type === 'sign-in'? "Don't have an account?": "Account is already registered"}
                </p>
                <Link className = "form-link" href = {type === 'sign-in'? '/sign-up': '/sign-in'}>
                  {type === 'sign-in'? "Sign Up": "Sign In"}
                </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm