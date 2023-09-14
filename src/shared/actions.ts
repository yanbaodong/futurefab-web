const emptyAction = (...args: any) => {
    console.warn('Current execute action is empty!');
};
class Actions {
    actions = {
        onGlobalStateChange: emptyAction,
        setGlobalState: emptyAction,
    };
    setActions(actions: any) {
        this.actions = actions;
    }
    onGlobalStateChange(callback: Function, fireImmediately?: boolean) {
        return this.actions.onGlobalStateChange(callback);
    }
    setGlobalState(state: any) {
        return this.actions.setGlobalState(state);
    }
}

const sharedActions = new Actions();
export default sharedActions;
