import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: '#ffde34',
          '50': '#fefce8',
          '100': '#fffac2',
          '200': '#fff189',
          '300': '#ffde34',
          '400': '#fdcd12',
          '500': '#ecb306',
          '600': '#cc8a02',
          '700': '#a36105',
          '800': '#864d0d',
          '900': '#723f11',
          '950': '#432005',
        },
        // https://uicolors.app/create
      },
    },
  },
  plugins: [],
} satisfies Config;
