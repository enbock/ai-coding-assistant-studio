import NodeEntity from './NodeEntity';
import {NodeId} from './NodeEntity';

export default interface NodeStorage {
    getMovedNodeId(): NodeId;

    setMovedNodeId(isMoving: NodeId): void;

    getNodes(): Array<NodeEntity>;

    setNodes(nodes: Array<NodeEntity>): void;
}
