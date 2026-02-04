import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { fileURLToPath } from 'url'
import path from 'path'

import { Posts } from '@/collections/Posts'
import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { Users } from '@/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || 'REPLACE_WITH_SECURE_SECRET',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      max: 3
    }
  }),

  collections: [Posts, Categories, Media, Users],

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    },
    meta: {
      title: 'Rodrigo Eduardo - Admin',
      description: 'Content management for rodrigoeduardo.com'
    }
  },

  editor: lexicalEditor({}),

  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION!,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  }
})
