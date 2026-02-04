import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'url'
import path from 'path'

import { Posts } from '@/collections/Posts'
import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { Users } from '@/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'REPLACE_WITH_SECURE_SECRET',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL
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

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  }
})
