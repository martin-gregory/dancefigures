import { LitElement } from 'lit';
export declare class HeroParallax extends LitElement {
    static styles: import("lit").CSSResult;
    layers: Array<{
        src: string;
        speed: number;
        startPos?: string;
        stopPos?: string;
        direction?: string;
    }>;
    private onScroll;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
