import directives from '@futurefab/components/dist/es/directives';
import { createApp } from 'vue';
export default (app: any) => {
    directives(app, createApp);
};
