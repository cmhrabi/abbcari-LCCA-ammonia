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
        }]
      },
      borderRadius: {
        'button': '3px',
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
          "danger": {
            "50": "#fee1eb",
            "100": "#fbb8cf",
            "200": "#f98eb3",
            "300": "#f76598",
            "400": "#f53b7c",
            "500": "#f31260",
            "600": "#c80f4f",
            "700": "#9e0c3e",
            "800": "#73092e",
            "900": "#49051d",
            "foreground": "#000",
            "DEFAULT": "#f31260"
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
            "DEFAULT": "#E8EDF1"
          },
          "lightblue": {
            "DEFAULT": "#F1F8FE"
          },
        }
      },
      "dark": {
        "colors": {
          "default": {
            "DEFAULT": "#d4d4d8"
          },
          "primary": {
            "hover": "#384E9E",
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
          "danger": {
            "50": "#fee1eb",
            "100": "#fbb8cf",
            "200": "#f98eb3",
            "300": "#f76598",
            "400": "#f53b7c",
            "500": "#f31260",
            "600": "#c80f4f",
            "700": "#9e0c3e",
            "800": "#73092e",
            "900": "#49051d",
            "foreground": "#000",
            "DEFAULT": "#f31260"
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
            "DEFAULT": "#E8EDF1"
          },
          "lightblue": {
            "DEFAULT": "#F1F8FE"
          },
        }
      }
    },
    "layout": {
      "radius": {
        "small": "3px",
        "medium": "0.75rem",
        "large": "0.875rem"
      },
      "borderWidth": {
        "small": "1px",
        "medium": "2px",
        "large": "3px"
      },
      "disabledOpacity": "0.5",
      "dividerWeight": "1",
      "hoverOpacity": 1
  }
}
  )],
};

