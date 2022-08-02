module.exports = {
  webpack: {
    configure: (config, { env, paths }) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      });
      return config;
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: "http://localhost:8080",
          changeOrigin: true,
          pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
}