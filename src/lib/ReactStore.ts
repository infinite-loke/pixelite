export class ReactStore<T> {
    private subscriptions: Set<() => void>;
    protected state: T

    constructor(state: T) {
        this.state = state;
        this.subscriptions = new Set<() => void>()
        this.setState.bind(this)
    }

    subscribe = (subscription: () => void) => {
        this.subscriptions.add(subscription);
        return () => this.subscriptions.delete(subscription);
    }

    private emit() {
        this.subscriptions.forEach((fn) => fn());
    }

    getState = () => {
        return this.state
    }

    setState(updater: (prev: typeof this.state) => typeof this.state) {
        this.state = updater(this.state);
        this.emit();
    }

}