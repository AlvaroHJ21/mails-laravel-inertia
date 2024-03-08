export class Timer {
    private callback: Function;

    private timerId: number;
    private start: number;
    private remaining: number;

    constructor(callback: Function, delay: number) {
        this.callback = callback;
        this.remaining = delay;
        this.timerId = -1;
        this.start = -1;

        this.resume();
    }

    resume() {
        this.start = Date.now();
        window.clearTimeout(this.timerId);
        this.timerId = window.setTimeout(this.callback, this.remaining);
    }

    pause() {
        window.clearTimeout(this.timerId);
        this.remaining -= Date.now() - this.start;
    }
}
