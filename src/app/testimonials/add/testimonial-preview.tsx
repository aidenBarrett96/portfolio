'use client'

import TestimonialCard from '@/components/TestimonialCard'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export default function TestimonialPreview() {
  const { watch } = useFormContext()

  const {
    'first-name': firstName,
    'last-name': lastName,
    testimonial,
    role: jobTitle,
    company,
    image,
    socialURL,
  } = watch()

  const name = [firstName, lastName].some(Boolean)
    ? `${firstName} ${lastName}`
    : 'Your Name'

  const [imageName, setImageName] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (!image) {
      setImagePreview(null)
      return
    }

    if (!image?.[0]?.name || imageName === image?.[0]?.name) {
      return
    }

    setImageName(image?.[0]?.name)
    setImagePreview(URL.createObjectURL(image[0]))
  }, [image, imageName])

  return (
    <TestimonialCard
      name={name}
      company={company || 'Your Company'}
      jobTitle={jobTitle || 'Your Job Title'}
      imageUrl={
        imagePreview ||
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
      socialUrl={socialURL}
      testimonial={
        testimonial ||
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita sit ratione ab obcaecati ullam praesentium, natus cupiditate non quaerat molestias.'
      }
    />
  )
}
