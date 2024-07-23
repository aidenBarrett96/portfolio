import { Card } from '@/components/Card'
import { LinkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import nextLogo from '@/images/logos/nextjs-icon-dark-background.png'
import reactLogo from '@/images/logos/react.png'
import typescriptLogo from '@/images/logos/typescript.png'
import nodeLogo from '@/images/logos/nodejs.webp'
import tailwindLogo from '@/images/logos/tailwind.svg'
import framerMotionLogo from '@/images/logos/framer-motion.svg'
import vercelLogo from '@/images/logos/vercel.png'
import sanityLogo from '@/images/logos/sanity.png'
import gsapLogo from '@/images/logos/gsap.png'
import dockerLogo from '@/images/logos/docker.png'
import contentfulLogo from '@/images/logos/contentful.png'
import strapiLogo from '@/images/logos/strapi.png'
import gatsbyLogo from '@/images/logos/gatsby.png'
import jestLogo from '@/images/logos/jest.png'
import { Section } from '@/components/Section'

const stack = [
  {
    name: 'Next.JS',
    logo: nextLogo,
    link: { href: '#', label: 'nextjs.org' },
    description: 'My go-to framework for building modern web applications.',
  },
  {
    name: 'React',
    logo: reactLogo,
    link: { href: '#', label: 'reactjs.org' },
    description:
      'The library that powers the user interfaces of my applications.',
  },
  {
    name: 'TypeScript',
    logo: typescriptLogo,
    link: { href: '#', label: 'typescriptlang.org' },
    description:
      'The language I use to write safer and more maintainable code.',
  },
  {
    name: 'Node.js',
    logo: nodeLogo,
    link: { href: '#', label: 'nodejs.org' },
    description: 'The runtime that powers my server-side applications.',
  },
  {
    name: 'Tailwind CSS',
    logo: tailwindLogo,
    link: { href: '#', label: 'tailwindcss.com' },
    description:
      'The utility-first CSS framework I use to style my applications.',
  },
  {
    name: 'Framer Motion',
    logo: framerMotionLogo,
    link: { href: '#', label: 'framer.com/motion' },
    description:
      'The animation library I use to bring my applications to life.',
  },
]

const honorableMentions = [
  {
    name: 'Vercel',
    logo: vercelLogo,
    link: { href: '#', label: 'vercel.com' },
  },
  {
    name: 'Sanity',
    logo: sanityLogo,
    link: { href: '#', label: 'sanity.io' },
  },
  {
    name: 'GSAP',
    logo: gsapLogo,
    link: { href: '#', label: 'greensock.com/gsap' },
  },
  {
    name: 'Docker',
    logo: dockerLogo,
    link: { href: '#', label: 'docker.com' },
  },
  {
    name: 'Contentful',
    logo: contentfulLogo,
    link: { href: '#', label: 'contentful.com' },
  },
  {
    name: 'Strapi',
    logo: strapiLogo,
    link: { href: '#', label: 'strapi.io' },
  },
  {
    name: 'Gatsby',
    logo: gatsbyLogo,
    link: { href: '#', label: 'gatsbyjs.com' },
  },
  {
    name: 'Jest',
    logo: jestLogo,
    link: { href: '#', label: 'jestjs.io' },
  },
]

export default function MyStack() {
  return (
    <>
      <Section title="Tech Stack">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stack.map((item) => (
            <Card as="li" key={item.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={item.logo}
                  alt=""
                  className="h-8 w-8 object-contain"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={item.link.href}>{item.name}</Card.Link>
              </h2>
              <Card.Description>{item.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{item.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section title="Honorable Mentions">
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-12 gap-y-16 lg:grid-cols-4"
        >
          {honorableMentions.map((item) => (
            <Card as="li" key={item.name} className="relative h-12">
              <Card.Link
                href={item.link.href}
                className="relative block h-full w-full"
                innerClassName="h-full w-full relative block"
              >
                <Image
                  src={item.logo}
                  alt=""
                  className="object-contain"
                  unoptimized
                  fill
                />
              </Card.Link>
            </Card>
          ))}
        </ul>
      </Section>
    </>
  )
}
