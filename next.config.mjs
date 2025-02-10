/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname : "images.pexels.com"
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};


export default nextConfig;
