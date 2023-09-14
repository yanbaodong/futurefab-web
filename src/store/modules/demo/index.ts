import actions from './actions';
import mutations from './mutations';
import state from './state';

const eqpRegisterModule = {
    namespaced: true,
    state,
    mutations,
    actions,
};

export default eqpRegisterModule;
