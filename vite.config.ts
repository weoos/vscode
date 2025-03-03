/*
 * @Author: theajack
 * @Date: 2023-04-04 23:20:27
 * @Description: Coding something
 */
import type {UserConfig} from 'vite';
import {defineConfig} from 'vite';
import {babel} from '@rollup/plugin-babel';
import {resolve} from 'path';
import {version, ebuild, dependencies} from './package.json';
import {execSync} from 'child_process';
import upfs from 'up-fs';
import {writeFileSync} from 'fs';

const fileName = ebuild.fileName || ebuild.publish.name;
const pubVersion = ebuild.publish.version || version;

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {

    const isDev = !['build', 'npm'].includes(mode);


    const map = {
        'development': geneDevConfig,
        'build': geneBuildAppConfig,
        'npm': geneBuildConfig,
    };

    let fn = map[mode];

    if (!fn) {
        if (mode.startsWith('ext_')) {
            fn = () => geneBuildExtConfig(mode.slice(4));
        } else {
            throw new Error(`Unknown mode: ${mode}`);
        }
    }

    console.log('defineConfig', mode, isDev);

    return {
        plugins: [
        ],
        define: {
            __DEV__: isDev,
            __VERSION__: `"${pubVersion}"`,
            __WIN__: 'window',
        },
        ...fn()
    };
});
function geneBuildAppConfig () {
    return {
        plugins: [],
    };

}
// ! Dev VApp 时的配置
function geneDevConfig (): UserConfig {
    return {
        plugins: [],
        
        server: {
            
            watch: {
                disableGlobbing: true,
            },
            hmr: false,
            host: '0.0.0.0',
            port: 5177,
        },
    };
}
function geneBuildExtConfig (name: string): UserConfig {
    return {
        build: {
            minify: false,
            watch: {
                'include': `src/extensions/${name}/**/*.ts`
            },
            lib: {
                entry: resolve(__dirname, `src/extensions/${name}/index.ts`), // 打包的入口文件
                name: name.toUpperCase(), // 包名
                formats: ['cjs'], // 打包模式，默认是es和umd都打
                fileName: () => `bundle.min.js`,
            },
            rollupOptions: {
                // 不需要
                external: ['vscode'],
                // external: [ ...Object.keys(deps.dependencies) ],
                plugins: [
                    babel({
                        exclude: 'node_modules/**',
                        extensions: ['.js', '.ts', 'tsx'],
                        configFile: resolve(__dirname, './build/babel.config.js'),
                    })
                ]
            },
            outDir: resolve(__dirname, `src/extensions/${name}/package/dist`), // 打包后存放的目录文件
        },
    };
}

function geneBuildConfig (): UserConfig {
    return {
        plugins: [{
            name: 'generate-npm-stuff',
            writeBundle () {
                execSync(`npx dts-bundle-generator -o npm/${fileName}.es.min.d.ts src/index.ts`);
                generatePackage();
            }
        }],
        
        build: {
            minify: true,
            
            lib: {
                entry: resolve(__dirname, 'src/index.ts'), // 打包的入口文件
                name: ebuild.libName, // 包名
                formats: ['es', 'iife'], // 打包模式，默认是es和umd都打
                fileName: (format: string) => `${fileName}.${format}.min.js`,
            },
            rollupOptions: {
                // 不需要
                // external: [ ...Object.keys(deps.dependencies) ],
                plugins: [
                    babel({
                        exclude: 'node_modules/**',
                        extensions: ['.js', '.ts', 'tsx'],
                        configFile: resolve(__dirname, './build/babel.config.js'),
                    })
                ]
            },
            outDir: resolve(__dirname, 'npm'), // 打包后存放的目录文件
        },
    };
}

function generatePackage () {
    
    upfs.copyFile({
        src: './README.md',
        target: './npm/README.md',
    });
    upfs.copyFile({
        src: './LICENSE',
        target: './npm/LICENSE',
    });

    writeFileSync('./npm/package.json', JSON.stringify({
        ...ebuild.publish,
        dependencies,
        'main': `${fileName}.es.min.js`,
        'unpkg': `${fileName}.iife.min.js`,
        'jsdelivr': `${fileName}.iife.min.js`,
        'typings': `${fileName}.es.min.d.ts`,
    }, null, 2), 'utf8');
}