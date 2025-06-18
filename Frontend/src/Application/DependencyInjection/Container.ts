import WorkspaceController from '../Workspace/Controller/Controller';
import Workspace from '../Workspace/View/Workspace';
import WorkspaceAdapter from '../Workspace/Controller/Adapter';
import NodeDragHandler from '../Workspace/Controller/Handler/NodeDragHandler';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';

export class Container {
    public readonly workspaceController: WorkspaceController;
    public readonly workspaceAdapter: WorkspaceAdapter = new WorkspaceAdapter();

    constructor() {
        this.workspaceController = new WorkspaceController(
            [
                new NodeDragHandler(
                    this.workspaceAdapter
                )
            ]
        );

        ViewInjection(Workspace, this.workspaceAdapter);
        Workspace.componentReceiver = this.workspaceController;
    }
}

export default function factory(): Container {
    return new Container();
}
