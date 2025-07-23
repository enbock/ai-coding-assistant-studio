import WorkspaceController from '../Workspace/Controller/Controller';
import Workspace from '../Workspace/View/Workspace';
import WorkspaceAdapter from '../Workspace/Controller/Adapter';
import NodeDragHandler from '../Workspace/Controller/Handler/NodeDragHandler';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';
import DataCollector from '../Workspace/Controller/DataCollector';
import NodeUseCase from '../../Core/Node/NodeUseCase/NodeUseCase';
import NodeStorageMemory from '../../Infrastructure/Node/NodeStorage/Memory/Memory';
import NodeStorage from '../../Core/Node/NodeStorage';
import WorkspacePresenter from '../Workspace/View/WorkspacePresenter';
import NodePresenter from '../Workspace/View/Node/NodePresenter';

export class Container {
    public readonly workspaceController: WorkspaceController;
    public readonly workspaceAdapter: WorkspaceAdapter = new WorkspaceAdapter();

    constructor() {
        const nodeStorage: NodeStorage = new NodeStorageMemory();
        const nodeUseCase: NodeUseCase = new NodeUseCase(
            nodeStorage
        );
        const nodeDragHandler: NodeDragHandler = new NodeDragHandler(
            this.workspaceAdapter,
            nodeUseCase
        );
        this.workspaceController = new WorkspaceController(
            [
                nodeDragHandler
            ],
            new DataCollector(
                nodeUseCase
            ),
            new WorkspacePresenter(
                new NodePresenter()
            )
        );

        ViewInjection(Workspace, this.workspaceAdapter);
        Workspace.componentReceiver = this.workspaceController;
    }
}

export default function factory(): Container {
    return new Container();
}
