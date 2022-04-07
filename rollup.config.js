import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

/*








*/

const configBase = {
  input: 'src/index.tsx',
  external: id => !/^[./]/.test(id),
}

const configDev = {
  ...configBase,
  output: [
    // {
    //   file: `dist/react-mount-animation.cjs.js`,
    //   format: 'cjs',
    //   sourcemap: true,
    // },
    {
      file: `dist/react-mount-animation.js`,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [esbuild()],
}

const configProd = {
  ...configDev,
  output: [
    {
      file: 'dist/react-mount-animation.cjs.min.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/react-mount-animation.min.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [esbuild({ minify: true })],
}

const configTS = {
  ...configBase,
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [dts()],
}

export default [configDev, configTS]
