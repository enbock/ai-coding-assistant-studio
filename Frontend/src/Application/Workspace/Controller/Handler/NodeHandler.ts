import ControllerHandler from '../../../../ControllerHandler';
import {PresentDataCallback} from '../../../../ControllerHandler';
import Adapter from '../Adapter';
import NodeUseCase from '../../../../Core/Node/NodeUseCase/NodeUseCase';

export default class NodeHandler implements ControllerHandler {
    constructor(
        private adapter: Adapter,
        private nodeUseCase: NodeUseCase
    ) {
    }

    public async initialize(presentData: PresentDataCallback): Promise<void> {
        this.presentData = presentData;
        this.adapter.addNode = this.handleAddNode.bind(this);
    }

    private presentData: PresentDataCallback = () => false as never;

    private handleAddNode(): void {
        this.nodeUseCase.addNode();
        void this.presentData();
    }
}
