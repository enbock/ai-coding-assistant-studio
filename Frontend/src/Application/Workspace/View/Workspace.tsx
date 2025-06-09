import Component from '@enbock/ts-jsx/Component';
import {ComponentProperties} from '@enbock/ts-jsx/Component';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import Style from './Style.css';
import WorkspaceModel from './WorkspaceModel';
import Node from './Node/Node';

export default class Workspace extends Component<ComponentProperties> {
    public modelInstance: WorkspaceModel = new WorkspaceModel();
    private dragging = false;
    private offset = {x: 0, y: 0};

    public get model(): WorkspaceModel {
        return this.modelInstance;
    }

    public set model(model: WorkspaceModel) {
        this.modelInstance = model;
        this.renderShadow();
    }

    constructor(props: ComponentProperties) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    public render(): ShadowDomElement | ShadowDomElement[] {
        return (
            <>
                <style>{Style}</style>
                <div onMouseDown={this.onMouseDown}>
                    <Node
                        model={this.model.node}
                    />
                </div>

            </>
        );
    }

    private onMouseDown(event: MouseEvent) {
        this.dragging = true;
        const node = this.model.node;
        this.offset = {
            x: event.clientX - node.x,
            y: event.clientY - node.y
        };
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    private onMouseMove(event: MouseEvent) {
        if (!this.dragging) return;
        this.model.node.x = event.clientX - this.offset.x;
        this.model.node.y = event.clientY - this.offset.y;
        this.renderShadow();
    }

    private onMouseUp() {
        this.dragging = false;
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    }
}
