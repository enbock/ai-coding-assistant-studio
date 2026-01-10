import Adapter from '../Adapter';
import {RefreshContentCallback} from '../../../ControllerHandler';
import ControllerHandler from '../../../ControllerHandler';
import NodeUseCase from '../../../../Core/Node/NodeUseCase/NodeUseCase';
import ScreenConfig from '../../../ScreenConfig';
import NodeMoveRequest from '../../../../Core/Node/NodeUseCase/NodeMoveRequest';
import {NodeId} from '../../../../Core/Node/NodeEntity';

export default class NodeDragHandler implements ControllerHandler {
    constructor(
        private adapter: Adapter,
        private nodeUseCase: NodeUseCase,
        private screenConfig: ScreenConfig
    ) {
    }

    public async initialize(refreshContent: RefreshContentCallback): Promise<void> {
        this.refreshContent = refreshContent;

        this.adapter.startNodeDrag = this.handleStartNodeDrag.bind(this);
        this.adapter.stopNodeDrag = this.handleStopNodeDrag.bind(this);
        this.adapter.dragNode = this.handleDragNode.bind(this);
    }

    private refreshContent: RefreshContentCallback = () => false as never;

    private handleStartNodeDrag(nodeId: string): void {
        this.nodeUseCase.startMovement({nodeId: <NodeId>nodeId});

        void this.refreshContent();
    }

    private handleStopNodeDrag(): void {
        this.nodeUseCase.stopMovement();

        void this.refreshContent();
    }

    private handleDragNode(x: number, y: number): void {
        const request: NodeMoveRequest = {
            x: ((2.0 / this.screenConfig.width) * x) - 1.0,
            y: ((2.0 / this.screenConfig.height) * y) - 1.0
        };

        this.nodeUseCase.moveNode(request);

        void this.refreshContent();
    }
}
