import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from "@rollup/plugin-terser";

export default {
    input: "src/bottomSheet.js",
    output: {
        file: "dist/bottomSheet.min.js",
        format: "iife",
        name: "BottomSheet"
    },
    plugins: [
        nodeResolve(), // resolve node_modules dependencies
        commonjs(), // convert CommonJS modules to ES modules
        terser()
    ]
};
