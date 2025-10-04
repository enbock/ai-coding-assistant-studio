import NodeEntity from '../../NodeEntity';
import {NodeId} from '../../NodeEntity';
import {NodeItem} from '../NodeResponse';

export default class NodeResponseFormatter {
    public formatPositions(nodes: Array<NodeEntity>, idOfMovingNode: NodeId): Array<NodeItem> {
        return nodes.map((p) => this.formatNode(p, idOfMovingNode));
    }

    private formatNode(node: NodeEntity, idOfMovingNode: NodeId): NodeItem {
        const item: NodeItem = new NodeItem();

        item.nodeId = node.id;
        item.x = node.x;
        item.y = node.y;
        item.isMoving = node.id === idOfMovingNode;

        return item;
    }
}
