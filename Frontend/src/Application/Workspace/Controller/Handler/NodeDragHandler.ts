import Adapter from '../Adapter';
import {PresentDataCallback} from '../../../../ControllerHandler';
import ControllerHandler from '../../../../ControllerHandler';
import NodeUseCase from '../../../../Core/Node/NodeUseCase/NodeUseCase';
import NodeMoveRequest from './NodeMoveRequest';

export default class NodeDragHandler implements ControllerHandler {
    constructor(
        private adapter: Adapter,
        private nodeUseCase: NodeUseCase
    ) {
    }

    public async initialize(presentData: PresentDataCallback): Promise<void> {
        this.presentData = presentData;

        this.adapter.startNodeDrag = this.handleStartNodeDrag.bind(this);
        this.adapter.stopNodeDrag = this.handleStopNodeDrag.bind(this);
        this.adapter.dragNode = this.handleDragNode.bind(this);
    }

    private presentData: PresentDataCallback = () => false as never;

    private handleStartNodeDrag(): void {
        this.nodeUseCase.startMovement();

        void this.presentData();
    }

    private handleStopNodeDrag(): void {
        this.nodeUseCase.stopMovement();

        void this.presentData();
    }

    private handleDragNode(x: number, y: number): void {
        const request: NodeMoveRequest = new NodeMoveRequest();
        request.x = x;
        request.y = y;

        this.nodeUseCase.moveNode(request);

        void this.presentData();
    }
}
