import Component from '@enbock/ts-jsx/Component';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import NodeModel from './NodeModel';
import Style from './Style.css';

interface Properties {
    model: NodeModel;
}

export default class Node extends Component<Properties> {
    public render(): ShadowDomElement | ShadowDomElement[] {
        const model: NodeModel = this.props.model;
        return (
            <>
                <style>
                    {Style}
                    :host {'{'}
                    left: {model.x}px;
                    top: {model.y}px;
                    {'}'}
                </style>
            </>
        );
    }
}
