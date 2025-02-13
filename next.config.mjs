/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname : "images.pexels.com"
            },
            {
                protocol: 'https',
                hostname: 'pldbjxhkrlailuixuvhz.supabase.co',
              },
            ],
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};


export default nextConfig;
