import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

export default [
    {
        input: 'flashy.js',
        output: {
            file: 'dist/flashy.min.js',
            format: 'iife',
            name: 'Flashy',
        },
        plugins: [
            babel({
                exclude: 'node_modules/**',
            }),
            minify(),
        ],
    },
    {
        input: 'flashy.js',
        output: {
            file: 'dist/flashy.js',
            format: 'iife',
            name: 'Flashy',
        },
        plugins: [
            babel({
                exclude: 'node_modules/**',
            }),
        ],
    },
    {
        input: 'flashy.js',
        output: {
            file: 'dist/flashy.es5.js',
            format: 'iife',
            name: 'Flashy',
        },
        plugins: [
            babel({
                exclude: 'node_modules/**',
                presets: [['es2015']],
            }),
        ],
    },
];
