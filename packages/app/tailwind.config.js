/** @type {import('tailwindcss').Config} **/
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                dark: {
                    100: "#131418",
                    200: "#1E1E22",
                    300: "#181920",
                    400: "#12151A",
                    405: "rgb(18, 21, 26,.5)",
                    500: "#20222C",
                    600: "rgba(0,0,0,.5)",
                    700: "rgba(0,0,0,.9)",
                    800: "rgba(19, 20, 24, .8)",
                    900: "rgba(19, 20, 24, .4)",
                },
                dark2: {
                    100: "#131418",
                    200: "#26282c",
                    300: "#393b40",
                    400: "#4d4f54",
                    500: "#616369",
                    600: "#75777d",
                    700: "#898c92",
                    800: "rgba(0, 0, 0, 0.8)",
                },
                green: {
                    100: "#64f4ac",
                    200: "#64f4acea",
                    300: "rgb(100, 244, 172, .7)",
                    305: "#5dc8a9",
                    400: "#05ff82",
                    500: "#15eb80",
                    600: "rgb(3, 252, 128, .4)",
                },
                red: {
                    100: "rgb(255, 0, 0, .4)",
                    200: "#ff0000",
                    300: "#cc0000",
                    305: "#ff4741",
                    400: "#990000",
                    500: "#660000",
                    600: "#330000",
                    700: "#000000",
                },
                white: {
                    100: "#fff",
                    105: "#f6f8fb",
                    200: "#ccc",
                    300: "#ebebebb6",
                    400: "#777",
                    500: "rgba(0,0,0,.1)",
                    600: "rgba(255,255,255,0.08)",
                },
                white2: {
                    100: "#fff",
                    200: "#f2f2f2",
                    300: "#e6e6e6",
                    400: "#d9d9d9",
                    500: "#cccccc",
                    600: "#bfbfbf",
                    700: "#b3b3b3",
                },
                slate: {
                    100: "#ccd6f6",
                    200: "#8892b0",
                },
                blue: {
                    100: "#258dfd",
                    105: "#4055e4",
                    200: "#4898f0",
                    300: "#3F7EEE",
                    301: "#59CBE8",
                    302: "#102241",
                    400: "#0655E2",
                    500: "#513cef",
                    600: "#5452d379",
                    700: "#0142e2",
                    705: "rgba(1, 65, 226, 0.4)",
                    800: "#08173f",
                },
                yellow: {
                    100: "#fcec66",
                    200: "#f9d936",
                    300: "#f5c502",
                    400: "#f1b200",
                    500: "#eeda00",
                    600: "#e8c400",
                },
                orange: {
                    100: "#ffb400",
                    200: "#ff9d00",
                    300: "#ff8500",
                    400: "#ff6e00",
                    500: "#ff5a00",
                    600: "#ff4500",
                },
                purple: {
                    100: "#a38edb",
                    200: "#8f7ecf",
                    300: "#7a6fc3",
                    400: "#6a60b7",
                    500: "#59519c",
                    600: "#4b437e",
                },
                pink: {
                    100: "#ffa3c9",
                    200: "#ff8fb1",
                    300: "#ff7799",
                    400: "#ff5f81",
                    500: "#fc4468",
                    600: "#e82a4f",
                },
            },
        },
    },
    plugins: [],
};