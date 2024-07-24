import {
  LinkIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'

export interface TestimonialCardProps {
  name: string
  imageUrl: string
  testimonial: string
  company: string
  jobTitle: string
  socialUrl?: string
}

export default function TestimonialCard({
  name,
  imageUrl,
  testimonial,
  company,
  jobTitle,
  socialUrl,
}: TestimonialCardProps) {
  return (
    <figure
      key={name}
      className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
    >
      <blockquote className="text-gray-900">
        <p>{`“${testimonial}”`}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-x-4">
        {imageUrl && (
          <img
            alt=""
            src={imageUrl}
            className="h-10 w-10 rounded-full bg-gray-50 object-cover"
          />
        )}

        {!imageUrl && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-400">
            {name
              .split(' ')
              .map((word) => word[0].toUpperCase())
              .join('')}
          </div>
        )}

        <div>
          {!socialUrl && (
            <div className="font-semibold text-gray-700">{name}</div>
          )}

          {socialUrl && (
            <a
              href={socialUrl}
              className="flex items-center gap-1 font-semibold text-gray-700 hover:text-indigo-500 hover:underline"
              target="_blank"
            >
              {name}
              <ArrowTopRightOnSquareIcon width={16} />
            </a>
          )}

          <div className="text-gray-600">
            {jobTitle} - <span className="font-semibold">{company}</span>
          </div>
        </div>
      </figcaption>
    </figure>
  )
}
