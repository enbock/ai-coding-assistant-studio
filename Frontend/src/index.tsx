import ShadowRenderer from '@enbock/ts-jsx/ShadowRenderer';
import Studio from './Application/Studio/View/Studio';
import {Container} from './Application/DependencyInjection/Container';
import factory from './Application/DependencyInjection/Container';

function start(): void {
    const container: Container = factory();

    void container.workspaceController.initialize();
    void container.studioController.initialize();

    const node: HTMLElement = ShadowRenderer.render(<Studio/>);
    document.body.appendChild(node);
}

document.addEventListener('DOMContentLoaded', start);
