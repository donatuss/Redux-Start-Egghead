export const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem("todosAppState");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem("todosAppState", serializedState);
    } catch (err) {
    }
};