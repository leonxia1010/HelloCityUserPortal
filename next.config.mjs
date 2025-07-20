/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // Use SWC but with a more balanced approach
        forceSwcTransforms: true,
        // Add this to help with module resolution
        esmExternals: 'loose'
    },
    webpack: (config) => {
        // 添加Lingui的loader支持
        config.module.rules.push({
            test: /\.po$/,
            use: ['@lingui/loader']
        });

        // 解决客户端构建中模块的问题
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
