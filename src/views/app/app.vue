<template>
    <div v-if="isDev" id="seed-app" style="position: fixed; top: 0; left: 0; margin-left: 20px">
        <router-link style="margin-left: 20px" v-for="(route, index) in routes" :key="index" :to="route.path">{{ route.name
        }}</router-link>
        <button @click="changeLanguage">切换语言</button>
        <span>
            <a-dropdown :trigger="['click']">
                <template #overlay>
                    <div class="change_theme_overlay_container">
                        <a-radio-group v-model:value="theme" @change="changeTheme">
                            <a-radio :style="radioStyle" value="light">light</a-radio>
                            <a-radio :style="radioStyle" value="dark">dark</a-radio>
                        </a-radio-group>
                    </div>
                </template>
                <button>切换主题</button>
            </a-dropdown>
        </span>
    </div>
    <div class="seed_wrapper">
        <router-view />
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import sharedActions from '@/shared/actions';
import useCurrentInstance from '@/utils/use-current-instance';
import i18n from '@/language/index';
// import { getTheme } from '@/futurefab/components/dist/utils';
const { proxy } = useCurrentInstance();
const routes = useRouter().options.routes.filter((item: any) => {
    return item.component && item.name != '404';
});
const isDev = process.env.NODE_ENV === 'development';
const isQianKun = (window as any).__POWERED_BY_QIANKUN__;
const changeLanguage = () => {
    if (!isDev) return false;
    const { locale } = i18n.global;
    if (locale.value == 'zh-CN') {
        locale.value = 'en-US';
    } else {
        locale.value = 'zh-CN';
    }
};
let theme = ref('');
const radioStyle = reactive({
    display: 'flex',
    height: '30px',
    lineHeight: '30px',
});
const getTheme = (id: string, theme: string) => {
    document.getElementsByTagName('body')[0].setAttribute('class', `${id}_theme_${theme}`);
};
//切换主题
const changeTheme = () => {
    if (!isDev) return false;
    // debugger;
    getTheme('app', theme.value);
    //将主题缓存在前端
    localStorage.setItem('theme', theme.value);
};
onMounted(() => {
    //切换语言回调主应用方法
    if (isQianKun) {
        sharedActions.actions.onGlobalStateChange((state: any) => {
            const { language, token, isLogout, themeValue } = state;
            const { locale } = i18n.global;
            locale.value = language;
            theme.value = themeValue || 'light';
            getTheme('app', theme.value);
            //将主题缓存在前端
            localStorage.setItem('theme', theme.value);
            if (!token) {
                return '/login';
            }
            if (isLogout) {
                proxy.$store.commit('RESET_STATE');
                console.log('退出登录');
            }
        }, true);
    } else {
        //获取当前主题
        let themeName = localStorage.getItem('theme');
        if (themeName) {
            theme.value = themeName;
        } else {
            theme.value = 'light';
        }
        getTheme('app', theme.value);
        //将主题缓存在前端
        localStorage.setItem('theme', theme.value);
    }
});
</script>
<style lang="less">
@import url('../../assets/style/variable.less');

.change_theme_overlay_container {
    background: @model-bg-color;
    width: 156px;
    padding: 14px 5px;
    border-radius: 6px;
    box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.38);
}
</style>
