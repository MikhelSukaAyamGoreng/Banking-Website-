"use client"

import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Control, FieldPath } from 'react-hook-form' 
import { z } from 'zod'

// 1. Define the schema shape so the component knows what fields exist
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5)
})

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>, // Correct way to type control
  name: FieldPath<z.infer<typeof formSchema>>,  // Ensures name matches 'email' or 'password'
  label: string,                                // Using 'label' instead of 'form' for clarity
  placeholder: string
}

const FormInput = ({ control, name, label, placeholder }: CustomInput) => {
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <div className="form-item">
              <FormLabel className="form-label">
                  {label}
              </FormLabel>
              <div className="flex w-full flex-col">
                  <FormControl>
                      <Input
                          placeholder={placeholder}
                          className="input-class"
                          type={name === 'password' ? 'password' : 'text'} // Hide password characters
                          {...field}
                      />
                  </FormControl>
                  <FormMessage className="form-message mt-2" />
              </div>
            </div>
        )}
    />
  )
}

export default FormInput