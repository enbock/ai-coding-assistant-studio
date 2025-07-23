import ResponseCollection from '../Controller/ResponseCollection';
import WorkspaceModel from './WorkspaceModel';
import NodePresenter from './Node/NodePresenter';

export default class WorkspacePresenter {
    constructor(
        private nodePresenter: NodePresenter
    ) {
    }

    public present(data: ResponseCollection): WorkspaceModel {
        const model: WorkspaceModel = new WorkspaceModel();

        model.node = this.nodePresenter.present(data);

        return model;
    }
}
