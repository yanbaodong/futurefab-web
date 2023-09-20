import { createApp } from 'vue';
import App from '@/views/app/app.vue';
import store from '@/store/store';
import initRouter from '@/router/index';
import './shared/public-path';
import sharedActions from './shared/actions';
import i18n from './language/index';
import VXETable from '@futurefab/vxe-table';
import BasicComponents from '@futurefab/components/dist/es/basic';
import { NoPage } from '@futurefab/components/dist/es/basic';
import '@futurefab/components/dist/es/basic/style.css';
import '@/assets/style/common.less';
import '@futurefab/vxe-table/lib/style.css';
import registerDirectives from '@/directives/index';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import '@/docs/style.less';
import '@futurefab/components/dist/table';
import '@/assets/iconfont/futurefab-svg/iconfont.js';
import '@/assets/iconfont/futurefab/iconfont.js';
import '@/assets/iconfont/futurefab/iconfont.css';
import {
    Select,
    Radio,
    Dropdown,
    Input,
    Checkbox,
    Tabs,
    Switch,
    InputNumber,
} from 'ant-design-vue';
VMdPreview.use(githubTheme);

VXETable.setup({
    //对参数中的列头、校验提示..等进行自动翻译（只对支持国际化的有效）
    translate: (key: any, args: any) => (i18n as any).global.t(key, args),
    // 对组件内置的提示语进行国际化翻译
    i18n: (key: any, args: any) => (i18n as any).global.t(key, args),
});
VXETable.menus.mixin(VXETable.VXETable.tableFun.getFreeze());

let app: any = null;
let router: any = null;
const render = () => {
    router = initRouter();
    app = createApp(App);
    registerDirectives(app);
    app.use(VXETable);
    app.use(i18n);
    app.use(store);
    app.use(router);
    app.use(VMdPreview);
    app.use(NoPage);
    app.use(BasicComponents);
    app.use(Select);
    app.use(Radio);
    app.use(Dropdown);
    app.use(Input);
    app.use(Checkbox);
    app.use(Tabs);
    app.use(Switch);
    app.use(InputNumber);
    app.config.globalProperties.$XHttp = VXETable.requestFun.http('portal');
    app.mount('#app');
};

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
    render();
}
/**
 * @name 微应用初始化
 * @param {Object} props 主应用下发的props
 * @description  bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发
 * @description 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等
 */
export const bootstrap = async (props: any) => {
    console.log('vue app bootstraped');
};
/**
 * @name 实例化微应用
 * @param {Object} props 主应用下发的props
 * @description 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export const mount = async (props: any) => {
    // 注册应用间通信
    sharedActions.setActions(props);
    // 注册微应用实例化函数
    render();
};
/**
 * @name 微应用卸载/切出
 */
export const unmount = async (props: any) => {
    console.log('unmount');
    app.unmount();
    store.commit('RESET_STATE');
    app = null;
    router = null;
};
