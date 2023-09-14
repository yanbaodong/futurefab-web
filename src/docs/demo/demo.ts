import { setHtml } from '../tools';
import VMdPreview, { xss } from '@kangc/v-md-editor/lib/preview';

const alarmTypeHtml = xss.process(
    VMdPreview.vMdParser.themeConfig.markdownParser.render(`
Pleast iput description..
`),
);
export const alarmTypeText = setHtml(alarmTypeHtml);
