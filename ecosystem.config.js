module.exports = {
  apps: [
    {
      name: "Vite",
      script: "npx",
      args: "serve -s build -l 5000",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
