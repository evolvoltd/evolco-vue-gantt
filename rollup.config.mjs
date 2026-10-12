import { fileURLToPath } from 'node:url';
import { basename } from 'node:path';
import { compileAsync } from 'sass';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

// Compile imported SCSS with the supported Dart Sass API. Keep CSS emission
// on one output, so the minified JS cannot overwrite the development CSS.
function dartSass() {
    const styles = new Map();
    return {
        name: 'dart-sass',
        async transform(_code, id) {
            if (!id.endsWith('.scss')) return null;
            const result = await compileAsync(id, { style: 'expanded' });
            for (const url of result.loadedUrls) {
                if (url.protocol === 'file:') this.addWatchFile(fileURLToPath(url));
            }
            styles.set(id, result.css);
            return { code: 'export default undefined;', map: { mappings: '' }, moduleSideEffects: false };
        },
        generateBundle(output) {
            if (basename(output.file) !== 'frappe-gantt.js') return;
            this.emitFile({
                type: 'asset',
                fileName: 'frappe-gantt.css',
                source: [...styles.values()].join('\n')
            });
        }
    };
}

export default {
    input: 'src/index.js',
    plugins: [dartSass(), nodeResolve()],
    output: [
        { name: 'Gantt', file: 'dist/frappe-gantt.js', format: 'iife' },
        { name: 'Gantt', file: 'dist/frappe-gantt.min.js', format: 'iife', plugins: [terser()] }
    ]
};
