import ShadowRenderer from '@enbock/ts-jsx/ShadowRenderer';

function start(): void {
    const node: HTMLElement = ShadowRenderer.render(<div>Hello World!</div>);
    document.body.appendChild(node);
}

document.addEventListener('DOMContentLoaded', start);
