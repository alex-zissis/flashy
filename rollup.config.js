import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

export default [
    {
        input: 'flashy.js',
        output: {
            file: 'dist/flashy.min.js',
            format: 'iife',
            name: 'Flashy',
            sourcemap: true,
            sourcemapFile: 'dist/flashy.min.js.map'
        },
        plugins:
            [
                babel({
                    exclude: 'node_modules/**'
                }),
                minify()
            ]
    },
    {
        input: 'flashy.js',
        output: {
            file: 'dist/flashy.js',
            format: 'iife',
            name: 'Flashy',
            sourcemap: true,
            sourcemapFile: 'dist/flashy.js.map'
        },
        plugins:
            [
                babel({
                    exclude: 'node_modules/**'
                })
            ]
    },
]