import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'

export default [
  {
    input: 'src/tabbed-section-card.ts',
    output: {
      dir: 'dist',
      format: 'es',
      entryFileNames: 'tabbed-section-card.js'
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      json(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser()
    ]
  }
]
