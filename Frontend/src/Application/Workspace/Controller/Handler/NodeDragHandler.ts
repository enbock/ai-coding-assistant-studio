import Adapter from '../Adapter';
import {PresentDataCallback} from '../../../../ControllerHandler';
import ControllerHandler from '../../../../ControllerHandler';
import NodeModel from '../../View/Node/NodeModel';

export default class NodeDragHandler implements ControllerHandler {
    /**
     * @deprecated
     */
    private tempNodeModel: NodeModel = new NodeModel();

    constructor(
        private adapter: Adapter
    ) {
    }

    public async initialize(presentData: PresentDataCallback): Promise<void> {
        this.presentData = presentData;

        this.adapter.startNodeDrag = () => this.handleStartNodeDrag();
        this.adapter.stopNodeDrag = () => this.handleStopNodeDrag();
        this.adapter.dragNode = this.handleDragNode.bind(this);
    }

    /**
     * @deprecated
     */
    public setViewModel(model: NodeModel): void {
        this.tempNodeModel = model;
    }

    private presentData: PresentDataCallback = () => false as never;

    private handleStartNodeDrag(): void {
        this.tempNodeModel.dragging = true;
        void this.presentData();
    }

    private handleStopNodeDrag(): void {
        this.tempNodeModel.dragging = false;
        void this.presentData();
    }

    private handleDragNode(x: number, y: number): void {
        this.tempNodeModel.x = x;
        this.tempNodeModel.y = y;
        void this.presentData();
    }
}
