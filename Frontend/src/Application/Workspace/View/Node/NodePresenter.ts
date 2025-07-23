import NodeModel from './NodeModel';
import ResponseCollection from '../../Controller/ResponseCollection';
import NodeResponse from '../../Controller/NodeResponse';

export default class NodePresenter {
    public present(data: ResponseCollection): NodeModel {
        const model: NodeModel = new NodeModel();
        const nodeResponse: NodeResponse = data.nodeResponse;

        model.dragging = nodeResponse.isMoving == true;
        model.x = nodeResponse.x;
        model.y = nodeResponse.y;

        return model;
    }
}
