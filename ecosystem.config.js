module.exports = {
  apps: [
    {
      name: "Vite",
      script: "npx",
      args: "vite preview --port 5000",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
