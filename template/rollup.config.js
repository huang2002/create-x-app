import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/index.js',
    plugins: [
        babel({
            presets: [
                ['@babel/preset-env', {
                    loose: true
                }]
            ]
        }),
        terser({
            compress: {
                unsafe: true
            },
            mangle: true
        })
    ],
    output: {
        format: 'iife',
        file: 'dist/index.js'
    }
};
