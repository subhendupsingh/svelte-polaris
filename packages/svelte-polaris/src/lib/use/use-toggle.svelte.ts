export function useToggle(initialState: boolean) {
    let value = $state(initialState);

    const toggle = () => {
        value = !value;
    }

    const setTrue = () => {
        value = true;
    }

    const setFalse = () => {
        value = false;
    }

    return {
        get value() { return value; },
        toggle,
        setTrue,
        setFalse
    }
}