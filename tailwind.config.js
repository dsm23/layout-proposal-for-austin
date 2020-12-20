module.exports = {
  purge: {
    layers: ['utilities'],
    content: ['./public/**/*.html', './src/**/*.[jt]s?(x)'],

    // These options are passed through directly to PurgeCSS
    options: {
      defaultExtractor: content => {
        // Capture as liberally as possible, including things like `h-(screen-1.5)`
        const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

        // Capture classes within other delimiters like .block(class="w-1/2") in Pug
        const innerMatches =
          content.match(
            /(?<=(?:enter|terto|rfrom|leave|aveto|efrom)=["{])(.*)(?=["}])/gi,
          ) || [];

        let output = [];

        for (const str of innerMatches) {
          output = [...output, ...str.split(' ')];
        }

        return output;
      },
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
