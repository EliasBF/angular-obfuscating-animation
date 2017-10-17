export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/angular-obfuscating-animation.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng.angular-obfuscating-animation',
    globals: {
      '@angular/core': 'ng.core'
    }
}