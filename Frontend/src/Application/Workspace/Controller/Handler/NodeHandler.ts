import ControllerHandler from '../../../ControllerHandler';
import {RefreshContentCallback} from '../../../ControllerHandler';
import Adapter from '../Adapter';
import NodeUseCase from '../../../../Core/Node/NodeUseCase/NodeUseCase';

export default class NodeHandler implements ControllerHandler {
    constructor(
        private adapter: Adapter,
        private nodeUseCase: NodeUseCase
    ) {
    }

    public async initialize(presentData: RefreshContentCallback): Promise<void> {
        this.presentData = presentData;
        this.adapter.addNode = this.handleAddNode.bind(this);
    }

    private presentData: RefreshContentCallback = () => false as never;

    private handleAddNode(): void {
        this.nodeUseCase.addNode();
        void this.presentData();
    }
}
