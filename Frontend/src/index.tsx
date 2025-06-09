import ShadowRenderer from '@enbock/ts-jsx/ShadowRenderer';
import Workspace from './Application/Workspace/View/Workspace';

function start(): void {
    const node: HTMLElement = ShadowRenderer.render(<Workspace/>);
    document.body.appendChild(node);
}

document.addEventListener('DOMContentLoaded', start);
