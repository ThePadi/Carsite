import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/Carsite',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/Carsite',
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
  },
}

export default nextConfig
