/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer')

const nextConfig = {
    output: 'export',
}

module.exports = withContentlayer(nextConfig)
