'use client'

import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import clsx from 'clsx'
import LoadingOverlay from '@/components/LoadingOverlay'

const addTestimonialFormSchema = z.object({
  'first-name': z.string().refine((val) => val.length > 0, 'Required'),
  'last-name': z.string().refine((val) => val.length > 0, 'Required'),
  company: z.string().refine((val) => val.length > 0, 'Required'),
  role: z.string().refine((val) => val.length > 0, 'Required'),
  testimonial: z.string().refine((val) => val.length > 0, 'Required'),
  image: z.any(),
  socialURL: z.string().optional(),
})

export type AddTestimonialFormValues = z.infer<typeof addTestimonialFormSchema>

export function AddTestimonialFormProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const methods = useForm({
    resolver: zodResolver(addTestimonialFormSchema),
  })
  return <FormProvider {...methods}>{children}</FormProvider>
}

export function AddTestimonialForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useFormContext<AddTestimonialFormValues>()
  const onSubmit = async (data: any) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]: [string, any]) => {
      if (key === 'image') {
        formData.append(key, value[0])
      } else {
        formData.append(key, value)
      }
    })
    await fetch('/testimonials/add/create', {
      method: 'POST',
      body: formData,
    })
  }

  if (isSubmitSuccessful) {
    return (
      <div className="relative z-10 h-full px-6 pb-24 pt-20 sm:pb-32 lg:px-8">
        <p className="text-lg text-white">
          Thank you for your testimonial! Check back in soon to see it live 👋{' '}
        </p>
      </div>
    )
  }

  return (
    <form
      action="#"
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
      className="relative z-10 px-6 sm:pb-32 lg:px-8 lg:py-48"
    >
      {isSubmitting && (
        <div
          className={clsx(
            'absolute inset-0 z-20 flex items-center justify-center',
            // Radial gradient bg-black/50 to transparent (center to edge (Really close to edge))
            'bg-black/50',
          )}
        >
          <LoadingOverlay color="white" />
        </div>
      )}
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-white"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                {...register('first-name')}
                className={clsx(
                  'block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6',
                  errors['first-name'] && 'ring-red-400',
                )}
              />
              {errors['first-name'] && (
                <p className="text-xs text-red-400">
                  {errors['first-name'].message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                {...register('last-name')}
                className={clsx(
                  'block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6',
                  errors['last-name'] && 'ring-red-400',
                )}
              />
              {errors['last-name'] && (
                <p className="text-xs text-red-400">
                  {errors['last-name'].message}
                </p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Company
            </label>
            <div className="mt-2.5">
              <input
                {...register('company')}
                className={clsx(
                  'block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6',
                  errors['company'] && 'ring-red-400',
                )}
              />
              {errors['company'] && (
                <p className="text-xs text-red-400">
                  {errors['company'].message}
                </p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="role"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Job title
            </label>
            <div className="mt-2.5">
              <input
                {...register('role')}
                className={clsx(
                  'block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6',
                  errors['role'] && 'ring-red-400',
                )}
              />
              {errors['role'] && (
                <p className="text-xs text-red-400">{errors['role'].message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="testimonial"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Testimonial
            </label>
            <div className="mt-2.5">
              <textarea
                {...register('testimonial')}
                rows={4}
                className={clsx(
                  'block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6',
                  errors['testimonial'] && 'ring-red-400',
                )}
              />
              {errors['testimonial'] && (
                <p className="text-xs text-red-400">
                  {errors['testimonial'].message}
                </p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="image"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Avatar
            </label>
            <div className="mt-2.5">
              <input
                {...register('image')}
                type="file"
                className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="socialURL"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Social URL
            </label>
            <div className="mt-2.5">
              <input
                {...register('socialURL')}
                className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="mt-2 text-xs">
              Optional link to your social profile.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Send message
          </button>
        </div>
      </div>
    </form>
  )
}
