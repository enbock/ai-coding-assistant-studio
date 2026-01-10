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
import ScreenConfig from '../ScreenConfig';
import ScreenConfigHandler from '../Workspace/Controller/Handler/ScreenConfigHandler';
import NodeUseCaseNodeResponseFormatter from '../../Core/Node/NodeUseCase/Task/NodeResponseFormatter';
import {v4} from 'uuid';
import WorkspaceControllerNodeHandler from '../Workspace/Controller/Handler/NodeHandler';
import StudioController from '../Studio/Controller/Controller';
import StudioAdapter from '../Studio/Controller/Adapter';
import Studio from '../Studio/View/Studio';
import StudioControllerContentRegistry from '../Studio/Controller/ContentRegistry';
import StudioPresenter from '../Studio/View/StudioPresenter';
import Content from '../Studio/Content';

export class Container {
    public readonly studioController: StudioController;
    public readonly workspaceController: WorkspaceController;

    constructor() {
        const studioAdapter: StudioAdapter = new StudioAdapter();
        const workspaceAdapter: WorkspaceAdapter = new WorkspaceAdapter();
        const screenConfig: ScreenConfig = new ScreenConfig();
        const nodeStorage: NodeStorage = new NodeStorageMemory();
        const nodeUseCase: NodeUseCase = new NodeUseCase(
            nodeStorage,
            new NodeUseCaseNodeResponseFormatter(),
            v4
        );
        const nodeDragHandler: NodeDragHandler = new NodeDragHandler(
            workspaceAdapter,
            nodeUseCase,
            screenConfig
        );
        const screenConfigHandler: ScreenConfigHandler = new ScreenConfigHandler(
            screenConfig,
            window
        );
        const workspaceControllerNodeHandler: WorkspaceControllerNodeHandler = new WorkspaceControllerNodeHandler(
            workspaceAdapter,
            nodeUseCase
        );
        this.workspaceController = new WorkspaceController(
            [
                screenConfigHandler,
                nodeDragHandler,
                workspaceControllerNodeHandler
            ],
            new DataCollector(
                nodeUseCase
            ),
            new WorkspacePresenter(
                new NodePresenter(
                    screenConfig
                )
            )
        );

        const contentRegistry: StudioControllerContentRegistry = new StudioControllerContentRegistry();
        contentRegistry.registerContent(Content.Workspace, Workspace);

        this.studioController = new StudioController(
            studioAdapter,
            new StudioPresenter(
                contentRegistry
            )
        );

        ViewInjection(Studio, studioAdapter);
        Studio.componentReceiver = this.studioController;

        ViewInjection(Workspace, workspaceAdapter);
        Workspace.componentReceiver = this.workspaceController;
    }
}

export default function factory(): Container {
    return new Container();
}
