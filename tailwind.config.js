module.exports = {
  variants: {
    opacity: ({ after }) => after(["disabled"]),
  },
  // theme: {
  //   customForms: theme => ({
  //     default: {
  //       input: {
  //         "&:focus": {
  //           boxShadow: undefined,
  //           borderColor: undefined
  //         }
  //       }
  //     }
  //   })
  // },
  plugins: [
    function ({ addBase, config }) {
      addBase({
        h1: { fontSize: config("theme.fontSize.2xl") },
        h2: { fontSize: config("theme.fontSize.xl") },
        h3: { fontSize: config("theme.fontSize.lg") },
      });
    },
  ],
};
