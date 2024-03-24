import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                TitilliumWeb: ["TitilliumWeb", "sans-serif"],
            },
            colors: {
                "azul-marino": "#02315D",
                "azul-marino-fuerte": "#02274a",
                "celeste-claro": "#4F93FE",
                "azul-palido": "#f0f4ff",
                "cielo-alba": "#eff5fe",
                amarillo: "#f3eb6c",
                verde: "#0bbb12",
                "verde-vibrante": "#18b51a",
                "azul-brillante": "#1c99f5",
                "gris-azulado": "#3c4d5d",
            },
        },
    },

    plugins: [forms],
};
