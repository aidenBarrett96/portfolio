import { Card } from '@/components/Card'
import MyStack from '@/components/MyStack'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

const copy = {
  title: 'My Stack',
  description:
    'All of the cool tools, languages, and frameworks I use to build awesome projects. Each tech choice helps me create high-quality, scalable, and efficient applications. Check out the different technologies I work with and see how they help me bring ideas to life!',
}

export const metadata = {
  title: 'Tech Stack',
  description: 'The technologies I use to build awesome projects.',
}

export default function Uses() {
  return (
    <SimpleLayout title={copy.title} intro={copy.description}>
      <div className="space-y-20">
        <MyStack />
      </div>
    </SimpleLayout>
  )
}
