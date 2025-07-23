import NodeModel from './NodeModel';
import ResponseCollection from '../../Controller/ResponseCollection';
import NodeResponse from '../../Controller/NodeResponse';
import ScreenConfig from '../../../ScreenConfig';

export default class NodePresenter {
    constructor(
        private screenConfig: ScreenConfig
    ) {
    }

    public present(data: ResponseCollection): NodeModel {
        const model: NodeModel = new NodeModel();
        const nodeResponse: NodeResponse = data.nodeResponse;

        model.dragging = nodeResponse.isMoving == true;
        model.x = Math.round((this.screenConfig.width / 2.0) * (nodeResponse.x + 1.0));
        model.y = Math.round((this.screenConfig.height / 2.0) * (nodeResponse.y + 1.0));

        return model;
    }
}
