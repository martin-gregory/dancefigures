// import summary from 'rollup-plugin-summary';
// import terser from '@rollup/plugin-terser';
// import resolve from '@rollup/plugin-node-resolve';
// import replace from '@rollup/plugin-replace';

// import typescript from '@rollup/plugin-typescript';
// // import nodeResolve from '@rollup/plugin-node-resolve';
// import copy from 'rollup-plugin-copy';
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

// vite.config.js
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { resolve } from 'path';

export default defineConfig({
  root: '.', // project root
  publicDir: 'assets', // Vite automatically copies this to dist
  plugins: [
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.ts'),
      output: {
        format: 'es',
      },
    },
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },
  server: {
    port: 8000,
  },
  // The 'Reflect.decorate': 'undefined' replacement
  define: {
    'Reflect.decorate': 'undefined',
  },
});

const imageMinOpt = {
  // Options for different formats
  mozjpeg: { quality: 80 },
  pngquant: { quality: [0.65, 0.3] },
  // svgo: { plugins: [{ removeViewBox: false }] },
};
// export default {
//   plugins: [
//     replace({ preventAssignment: false, 'Reflect.decorate': 'undefined' }),
//     resolve(),
//     typescript({ tsconfig: './tsconfig.json', outDir: 'dist' }),
//     copy({
//       targets: [
//         { src: 'assets/**/*', dest: 'dist/assets' },
//         { src: 'public/index.html', dest: 'dist' }, // <-- add this line if in /public
//         // or: { src: 'index.html', dest: 'dist' }  if it's in project root
//       ],
//     }),
//   ],
//   input: 'src/index.ts',
//   output: {
//     dir: 'dist',
//     format: 'es',
//     sourcemap: true,
//   },
// };
