/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module '@futurefab/components/dist/es/basic';
declare module '@futurefab/components/dist/es/directives';
declare module 'splitpanes';
declare module '*.svg';
declare module '*.png';
declare module '@kangc/v-md-editor';
declare module '@kangc/v-md-editor/lib/preview';
declare module '@kangc/v-md-editor/lib/theme/github.js';
declare module '@kangc/v-md-editor/lib/theme/vuepress.js';
