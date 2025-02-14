/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'guclgduzwjuktnxxolja.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**'
            },
        ]
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};
export default nextConfig;
