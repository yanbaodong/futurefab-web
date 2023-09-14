/**
 * 可以获取挂载在全局的属性和获取上下文
 */
import { ComponentInternalInstance, getCurrentInstance } from 'vue';
const useCurrentInstance = (): any => {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    return {
        proxy,
    };
};
export default useCurrentInstance;
