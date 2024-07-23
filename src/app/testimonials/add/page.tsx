import {
  AddTestimonialForm,
  AddTestimonialFormProvider,
} from '@/app/testimonials/add/add-testimonial-form'
import TestimonialPreview from '@/app/testimonials/add/testimonial-preview'
import BackgroundTexture from '@/components/BackgroundTexture'
import { Container } from '@/components/Container'
import { EyeIcon } from '@heroicons/react/24/outline'

export default function AddTestimonialPage() {
  return (
    <>
      <BackgroundTexture />
      <AddTestimonialFormProvider>
        <Container>
          <div className="relative isolate">
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
              <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Add Testimonial
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    Thank you in advance for sharing your thoughts.
                  </p>
                </div>
                <div className="space-y-4 pt-10">
                  <h3 className="flex items-center gap-2 text-xl">
                    <EyeIcon width={24} />
                    <span>Preview</span>
                  </h3>
                  <TestimonialPreview />
                </div>
              </div>
              <AddTestimonialForm />
            </div>
          </div>
        </Container>
      </AddTestimonialFormProvider>
    </>
  )
}
