import ShadowRenderer from '@enbock/ts-jsx/ShadowRenderer';
import Workspace from './Application/Workspace/View/Workspace';
import {Container} from './Application/DependencyInjection/Container';
import factory from './Application/DependencyInjection/Container';

function start(): void {
    const container: Container = factory();
    void container.workspaceController.initialize();

    const node: HTMLElement = ShadowRenderer.render(<Workspace/>);
    document.body.appendChild(node);
}

document.addEventListener('DOMContentLoaded', start);
