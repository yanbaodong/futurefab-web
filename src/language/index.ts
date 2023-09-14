import { createI18n } from 'vue-i18n';
import zhCn from './zh-cn';
import enUs from './en-us';
const lang_cn = (window as any).lang_cn;
const lang_en = (window as any).lang_en;
const messages = {
    'zh-CN': {
        ...(process.env.NODE_ENV === 'development' ? zhCn : lang_cn),
    },
    'en-US': {
        ...(process.env.NODE_ENV === 'development' ? enUs : lang_en),
    },
};
const i18n = createI18n({
    legacy: false,
    // locale: 'zh-CN',
    locale: localStorage.getItem('language') || 'en-US',
    globalInjection: true,
    messages,
});

export default i18n;
