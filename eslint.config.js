import js from "@eslint/js";

export default [
    js.configs.all,

    {
        ignores: ["**/dist/*"],
    },

    {
        rules: {
            "max-params": "off",
            "max-statements": "off",
            "no-magic-numbers": "off",
            "no-use-before-define": "off",
            "one-var": "off",
            "sort-imports": "off",
        },
    },
];
