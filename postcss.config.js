module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      stage: 3,
      features: {
        "custom-properties": false,
        "nesting-rules": true,
      },
    },
  },
};
