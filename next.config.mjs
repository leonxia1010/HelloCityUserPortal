/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // Use SWC but with a more balanced approach
        forceSwcTransforms: true,
        // Add this to help with module resolution
        esmExternals: 'loose'
    },
    webpack: (config) => {
        // Add Lingui loader support
        config.module.rules.push({
            test: /\.po$/,
            use: ['@lingui/loader']
        });

        // Resolve module issues in client-side builds
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            module: false,
            process: false,
            path: false,
            os: false
        };

        return config;
    },
};

export default nextConfig;
