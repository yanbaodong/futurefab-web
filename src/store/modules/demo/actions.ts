import { ActionTree } from 'vuex';
import { States } from './interface';

// 定义actions 处理异步数据
const actions: ActionTree<States, any> = {
    // （多选Site/Fab/Line/Area/Model）  getMultiCondition
    demo: ({ commit }, data: any) => {
    },
};

export default actions;
