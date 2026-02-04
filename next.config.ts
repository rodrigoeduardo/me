import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ]
  }
}

export default withPayload(nextConfig)
