module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          src: "./src",
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ["transform-remove-console"],
    },
  },
};
