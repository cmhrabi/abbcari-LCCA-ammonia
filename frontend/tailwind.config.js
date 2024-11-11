// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      "fontSize": {
        "h1": ["36px", {
          fontWeight: 600,
          lineHeight: "48px",
        }],
        "h2": ["32px", {
          fontWeight: 600,
          lineHeight: "20px",
          letterSpacing: "0.32px"
        }],
        "sub1": ["16px", {
          fontWeight: 500,
          lineHeight: "20px",
          letterSpacing: "0.8px"
        }],
        "sub2": ["16px", {
          fontWeight: 500,
          lineHeight: "20px",
        }],
        "body": ["14px", {
          fontWeight: 400,
          lineHeight: "20px",
        }],
        "button-sm": ["12px", {
          fontWeight: 500,
          lineHeight: "16px",
        }],
        "button-md": ["14px", {
          fontWeight: 500,
          lineHeight: "20px",
        }],
        "button-lg": ["16px", {
          fontWeight: 500,
          lineHeight: "24px",
        }],
        "label": ["12px", {
          fontWeight: 400,
          lineHeight: "16px",
        }],
        "input": ["14px", {
          fontWeight: 500,
          lineHeight: "20px",
        }],
        "help-message": ["14px", {
          fontWeight: 900,
          lineHeight: "20px",
        }],
        "alert-title": ["14px", {
          fontWeight: 700,
          lineHeight: "20px",
        }],
      },
      borderRadius: {
        '3px': '3px',
      },
      boxShadow: {
        'input': '-2px -2px 0px -0px rgba(232, 244, 253, 1)',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    prefix: "theme",
      themes: {
      "light": {
        "colors": {
          "default": {
            "DEFAULT": "#d4d4d8"
          },
          "primary": {
            "hover": "#384E9E",
            "alert-border": "rgba(1, 114, 203, 0.10)",
            "DEFAULT": "#506AC7"
          },
          "secondary": {
            "DEFAULT": "#1C2465"
          },
          "tertiary": {
            "hover": "#0161AC",
            "active": "#01508E",
            "bg": "#F1F8FE",
            "DEFAULT": "#0172CB"
          },
          "success": {
            "hover": "#238B31",
            "active": "#1D7228",
            "bg": "#F2F8F2",
            "DEFAULT": "#28A138"
          },
          "warning": {
            "hover": "#C96F00",
            "active": "#B26200",
            "bg": "#FEF7F1",
            "DEFAULT": "#DF7B00"
          },
          "danger": {
            "hover": '#B91919',
            "active": '#9D1515',
            "bg": "#FCF3F3",
            "DEFAULT": '#D21C1C',
          },
          "background": "#ffffff",
          "foreground": {
            "50": "#dfdfdf",
            "100": "#b3b3b3",
            "200": "#868686",
            "300": "#595959",
            "400": "#2d2d2d",
            "500": "#000000",
            "600": "#000000",
            "700": "#000000",
            "800": "#000000",
            "900": "#000000",
            "foreground": "#fff",
            "DEFAULT": "#000000"
          },
          "grey": {
            "blue": "#697D95",
            "dark": "#404040",
            "label": "#4F5E71",
            "DEFAULT": "#E8EDF1"
          },
          "lightblue": {
            "ice": "#E8F4FD",
            "DEFAULT": "#F1F8FE"
          },
      }},
      "dark": {
        "colors": {
          "default": {
            "DEFAULT": "#d4d4d8"
          },
          "primary": {
            "hover": "#384E9E",
            "alert-border": "rgba(1, 114, 203, 0.10)",
            "DEFAULT": "#506AC7"
          },
          "secondary": {
            "DEFAULT": "#1C2465"
          },
          "tertiary": {
            "DEFAULT": "#0172CB"
          },
          "success": {
            "50": "#e2f8ec",
            "100": "#b9efd1",
            "200": "#91e5b5",
            "300": "#68dc9a",
            "400": "#40d27f",
            "500": "#17c964",
            "600": "#13a653",
            "700": "#0f8341",
            "800": "#0b5f30",
            "900": "#073c1e",
            "foreground": "#000",
            "DEFAULT": "#17c964"
          },
          "warning": {
            "50": "#fef4e4",
            "100": "#fce4bd",
            "200": "#fad497",
            "300": "#f9c571",
            "400": "#f7b54a",
            "500": "#f5a524",
            "600": "#ca881e",
            "700": "#9f6b17",
            "800": "#744e11",
            "900": "#4a320b",
            "foreground": "#000",
            "DEFAULT": "#f5a524"
          },
          "danger": '#D21C1C',
          "background": "#ffffff",
          "foreground": {
            "50": "#dfdfdf",
            "100": "#b3b3b3",
            "200": "#868686",
            "300": "#595959",
            "400": "#2d2d2d",
            "500": "#000000",
            "600": "#000000",
            "700": "#000000",
            "800": "#000000",
            "900": "#000000",
            "foreground": "#fff",
            "DEFAULT": "#000000"
          },
          "grey": {
            "blue": "#697D95",
            "dark": "#404040",
            "DEFAULT": "#E8EDF1"
          },
          "lightblue": {
            "DEFAULT": "#F1F8FE"
          },
        }
      }
    },
}
  )],
};

