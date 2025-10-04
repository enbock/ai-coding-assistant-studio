import NodeStorage from '../../../../Core/Node/NodeStorage';
import NodeEntity from '../../../../Core/Node/NodeEntity';
import {NodeId} from '../../../../Core/Node/NodeEntity';

export default class Memory implements NodeStorage {
    private movingNodeId: string = '';
    private nodes: Array<NodeEntity> = [];

    public getMovedNodeId(): NodeId {
        return this.movingNodeId;
    }

    public setMovedNodeId(isMoving: NodeId): void {
        this.movingNodeId = isMoving;
    }

    public getNodes(): Array<NodeEntity> {
        return this.nodes;
    }

    public setNodes(nodes: Array<NodeEntity>): void {
        this.nodes = nodes;
    }
}
