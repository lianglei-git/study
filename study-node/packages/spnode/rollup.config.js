import esbuild from 'rollup-plugin-esbuild'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
// import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

const entries = { 
    cli: 'src/cli.ts'
}

const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    'pathe',
    'birpc',
    'vite',
    'url',
]

const plugins = [
    resolve({
        preferBuiltins: true,
    }),
    json(),
    commonjs(),
    esbuild({
        target: 'node14',
    })
]

function onwarn(message) {
    if (message.code === 'EMPTY_BUNDLE')
        return
    console.error(message)
}


export default () => [
    {
        input: entries,
        output: {
            dir: 'dist',
            format: 'esm',
            entryFileNames: '[name].js',
        },
        external,
        plugins,
        onwarn
    },
    {
        input: entries,
        output: {
          dir: 'dist',
          format: 'cjs',
          entryFileNames: '[name].cjs',
        },
        external,
        plugins,
        onwarn,
      },
    {
        input: entries,
        output: {
          dir: 'dist',
          entryFileNames: '[name].d.ts',
          format: 'esm',
        },
        external,
        plugins: [
          dts({ respectExternal: true }),
        ],
        onwarn,
      },
]