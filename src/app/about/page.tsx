import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import MyStack from '@/components/MyStack'

const copy = {
  title: "I'm Aiden Barrett, I'm a software engineer based in Liverpool, UK.",
  body: [
    "Hello! I'm a passionate software engineer based in Liverpool, UK, with over five years of professional experience in the tech industry. I graduated from the University of Central Lancashire (UCLAN) with a degree in Computing, and since then, I've been dedicated to crafting seamless and dynamic web experiences.",
    'My expertise lies primarily in front-end development, where I excel at creating intuitive and responsive user interfaces. However, my skill set extends beyond the front end, as I have substantial experience working on full-stack projects. This versatility allows me to bridge the gap between design and functionality, ensuring that the applications I build are both visually appealing and robust.',
    "Outside of my professional life, I have a variety of hobbies that keep me active and engaged. I'm an avid gamer, enjoying competitive titles like Rocket League and Overwatch. When I'm not in front of a screen, you can often find me bouldering, playing golf, or participating in a friendly game of five-a-side football. These activities help me stay balanced and bring fresh perspectives to my work.",
    "I'm always excited to take on new challenges and collaborate with others who share my passion for technology. Whether it's developing cutting-edge applications or exploring new gaming strategies, I approach everything with enthusiasm and a commitment to excellence. Let's connect and see how we can create something amazing together!",
  ],
}

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Spencer Sharp. I live in New York City, where I design the future.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {copy.title}
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            {copy.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="#" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="#" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:aiden.e.barrett@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              aiden.e.barrett@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>

      <MyStack />
    </Container>
  )
}
