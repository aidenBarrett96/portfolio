import {
  AddTestimonialForm,
  AddTestimonialFormProvider,
} from '@/app/testimonials/add/add-testimonial-form'
import TestimonialPreview from '@/app/testimonials/add/testimonial-preview'
import { Container } from '@/components/Container'
import Modal from '@/components/Modal'
import TestimonialCard from '@/components/TestimonialCard'
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

const testimonial = {
  body: 'Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.',
  author: {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
}

export default function AddTestimonialPage() {
  return (
    <AddTestimonialFormProvider>
      <Container>
        <div className="relative isolate">
          <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
            <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
              <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
                >
                  <div
                    style={{
                      clipPath:
                        'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                    }}
                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-[#4f46e5] opacity-20"
                  />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Add Testimonial
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Thank you in advance for sharing your thoughts.
                </p>
              </div>
              <div className="py-10">
                <h3 className="text-xl">Preview</h3>
                <TestimonialPreview />
              </div>
            </div>
            <AddTestimonialForm />
          </div>
        </div>
      </Container>
    </AddTestimonialFormProvider>
  )
}
