import { db, testimonials } from '@/lib/drizzle/schema'
import { v2 as cloudinary } from 'cloudinary'

export async function POST(request: Request) {
  // Parse the incoming form data
  const formData = await request.formData()

  const body: any = {}

  formData.forEach((value, key) => {
    body[key] = value
  })

  if (!body) {
    return new Response('bad request', { status: 400 })
  }

  try {
    const {
      'first-name': firstName,
      'last-name': lastName,
      company,
      role,
      testimonial,
      image,
      socialURL,
    } = body

    let imageURL: string | undefined = undefined

    if (image?.arrayBuffer && typeof image.arrayBuffer === 'function') {
      // Convert the file data to a Buffer
      const arrayBuffer = await image?.arrayBuffer?.()

      const buffer = new Uint8Array(arrayBuffer)

      // Upload image to cloudinary
      // Configuration
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })

      // Upload an image
      const uploadedImageResult = (await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: `${firstName}-${lastName}`,
              folder: 'portfolio/testimonials',
            },
            (error, result) => {
              if (error) {
                reject(error)
              } else {
                resolve(result)
              }
            },
          )
          .end(buffer)

        imageURL = uploadedImageResult.url
      })) as any
    }

    const dbResult = await db
      .insert(testimonials)
      .values({
        firstName,
        lastName,
        company,
        jobTitle: role,
        testimonial,
        socialURL,
        image: imageURL,
      } as any)
      .returning()

    return new Response('ok')
  } catch (error) {
    console.log(error)

    return new Response('error', { status: 500 })
  }
}
