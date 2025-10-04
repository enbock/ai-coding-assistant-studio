import Component from '@enbock/ts-jsx/Component';
import {ComponentProperties} from '@enbock/ts-jsx/Component';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import NodeModel from './NodeModel';
import Style from './Style.css';
import Adapter from '../../Controller/Adapter';

interface Properties extends ComponentProperties {
    model: NodeModel;
    adapter: Adapter;
}

type Offset = { x: number; y: number };

export default class Node extends Component<Properties> {
    private readonly onMouseDownHandler: Callback<(event: MouseEvent) => void>;
    private readonly onMouseMoveHandler: Callback<(event: MouseEvent) => void>;
    private readonly onMouseUpHandler: Callback;
    private offset: Offset = {x: 0, y: 0};

    constructor(props: Properties) {
        super(props);

        this.onMouseDownHandler = this.onMouseDown.bind(this);
        this.onMouseMoveHandler = this.onMouseMove.bind(this);
        this.onMouseUpHandler = this.onMouseUp.bind(this);
    }

    public connectedCallback(): void {
        this.addEventListener('mousedown', this.onMouseDownHandler);
    }

    public disconnectedCallback(): void {
        this.removeEventListener('mousedown', this.onMouseDownHandler);
    }

    public render(): ShadowDomElement | ShadowDomElement[] {
        const model: NodeModel = this.props.model;

        return (
            <>
                <style>
                    {Style}
                    :host {'{'}
                    --position--left: {model.x}px;
                    --position--top: {model.y}px;
                    {'}'}
                </style>

                <diagram-node
                    {...(model.dragging ? {'is-moving': 'true'} : {})}
                >

                </diagram-node>
            </>
        );
    }

    private onMouseDown(event: MouseEvent): void {
        const model: NodeModel = this.props.model;

        this.offset.x = event.clientX - model.x;
        this.offset.y = event.clientY - model.y;

        window.addEventListener('mousemove', this.onMouseMoveHandler);
        window.addEventListener('mouseup', this.onMouseUpHandler);

        this.props.adapter.startNodeDrag(model.nodeId);
    }

    private onMouseMove(event: MouseEvent): void {
        const model: NodeModel = this.props.model;
        if (!model.dragging) return;

        const x: number = event.clientX - this.offset.x;
        const y: number = event.clientY - this.offset.y;

        this.props.adapter.dragNode(x, y);
    }

    private onMouseUp(): void {
        window.removeEventListener('mousemove', this.onMouseMoveHandler);
        window.removeEventListener('mouseup', this.onMouseUpHandler);

        this.props.adapter.stopNodeDrag();
    }
}
