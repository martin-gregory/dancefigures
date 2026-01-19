// import summary from 'rollup-plugin-summary';
// import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

import typescript from '@rollup/plugin-typescript';
// import nodeResolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
// export default {
//   input: 'my-element.js',
//   output: {
//     file: 'my-element.bundled.js',
//     format: 'esm',
//   },
//   onwarn(warning) {
//     if (warning.code !== 'THIS_IS_UNDEFINED') {
//       console.error(`(!) ${warning.message}`);
//     }
//   },
//   plugins: [
//     replace({preventAssignment: false, 'Reflect.decorate': 'undefined'}),
//     resolve(),
//     /**
//      * This minification setup serves the static site generation.
//      * For bundling and minification, check the README.md file.
//      */
//     terser({
//       ecma: 2021,
//       module: true,
//       warnings: true,
//       mangle: {
//         properties: {
//           regex: /^__/,
//         },
//       },
//     }),
//     summary(),
//   ],
// };

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    replace({ preventAssignment: false, 'Reflect.decorate': 'undefined' }),

    resolve(),
    typescript({ tsconfig: './tsconfig.json', outDir: 'dist' }),
    copy({
      targets: [
        { src: 'assets/**/*', dest: 'dist/assets' },
        { src: 'public/index.html', dest: 'dist' }, // <-- add this line if in /public
        // or: { src: 'index.html', dest: 'dist' }  if it's in project root
      ],
    }),
  ],
};
