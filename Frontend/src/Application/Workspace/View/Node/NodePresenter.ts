import NodeModel from './NodeModel';
import ResponseCollection from '../../Controller/ResponseCollection';
import {NodeItem} from '../../../../Core/Node/NodeUseCase/NodeResponse';
import ScreenConfig from '../../../ScreenConfig';

export default class NodePresenter {
    constructor(
        private screenConfig: ScreenConfig
    ) {
    }

    public present(data: ResponseCollection): Array<NodeModel> {
        return data.nodeResponse.nodes.map((node) => this.presentNode(node));
    }

    public presentNode(item: NodeItem): NodeModel {
        const model: NodeModel = new NodeModel();

        model.nodeId = item.nodeId;
        model.dragging = item.isMoving == true;
        model.x = Math.round((this.screenConfig.width / 2.0) * (item.x + 1.0));
        model.y = Math.round((this.screenConfig.height / 2.0) * (item.y + 1.0));

        return model;
    }
}
