import Component from '@enbock/ts-jsx/Component';
import {ComponentProperties} from '@enbock/ts-jsx/Component';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import Style from './Style.css';
import WorkspaceModel from './WorkspaceModel';
import Node from './Node/Node';
import Adapter from '../Controller/Adapter';

export default class Workspace extends Component<ComponentProperties> {
    public modelInstance: WorkspaceModel = new WorkspaceModel();

    public get model(): WorkspaceModel {
        return this.modelInstance;
    }

    public set model(model: WorkspaceModel) {
        this.modelInstance = model;
        this.renderShadow();
    }

    constructor(
        props: ComponentProperties,
        private adapter: Adapter
    ) {
        super(props);
    }

    public render(): ShadowDomElement | ShadowDomElement[] {
        return (
            <>
                <style>{Style}</style>
                <button onClick={() => this.adapter.addNode()}>AddNode</button>
                {this.model.nodes.map(node => (
                    <Node
                        model={node}
                        adapter={this.adapter}
                    />
                ))}
            </>
        );
    }
}
