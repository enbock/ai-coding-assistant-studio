import Component from '@enbock/ts-jsx/Component';
import {ComponentProperties} from '@enbock/ts-jsx/Component';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import RootView from '../../RootView';

export default class EmptyView extends Component<ComponentProperties> implements RootView {
    public render(): ShadowDomElement | ShadowDomElement[] {
        return (
            <empty-content/>
        );
    }
}
