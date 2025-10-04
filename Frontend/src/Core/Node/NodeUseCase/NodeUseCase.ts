import NodeMoveRequest from './NodeMoveRequest';
import NodeStorage from '../NodeStorage';
import NodeEntity from '../NodeEntity';
import {NodeId} from '../NodeEntity';
import NodeResponse from './NodeResponse';
import NodeResponseFormatter from './Task/NodeResponseFormatter';
import MovementStartRequest from './MovementStartRequest';
import {v4} from 'uuid';

export default class NodeUseCase {
    constructor(
        private nodeStorage: NodeStorage,
        private nodeResponseFormatter: NodeResponseFormatter,
        private generateUuid: typeof v4
    ) {
    }

    public getState(): NodeResponse {
        const positions: Array<NodeEntity> = this.nodeStorage.getNodes();
        const response: NodeResponse = new NodeResponse();

        response.nodes = this.nodeResponseFormatter.formatPositions(
            positions,
            this.nodeStorage.getMovedNodeId()
        );

        return response;
    }

    public startMovement(request: MovementStartRequest): void {
        this.nodeStorage.setMovedNodeId(request.nodeId);
    }

    public stopMovement(): void {
        this.nodeStorage.setMovedNodeId('');
    }

    public moveNode(request: NodeMoveRequest): void {
        const movingNode: NodeId = this.nodeStorage.getMovedNodeId();
        const nodes: Array<NodeEntity> = this.nodeStorage.getNodes();
        const node: NodeEntity | undefined = nodes.find((n) => n.id === movingNode);

        if (!node) return;

        node.x = request.x;
        node.y = request.y;

        this.nodeStorage.setNodes(nodes);
    }

    public addNode(): void {
        const nodes: Array<NodeEntity> = this.nodeStorage.getNodes();
        const node: NodeEntity = new NodeEntity();
        node.id = this.generateUuid();
        nodes.push(node);
        this.nodeStorage.setNodes(nodes);
    }
}
