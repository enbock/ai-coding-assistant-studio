import ControllerHandler from '../../../ControllerHandler';
import {PresentDataCallback} from '../../../ControllerHandler';
import Workspace from '../View/Workspace';
import WorkspaceModel from '../View/WorkspaceModel';
import NodeModel from '../View/Node/NodeModel';
import NodeDragHandler from './Handler/NodeDragHandler';

export default class Controller {
    /**
     * @deprecated
     */
    private tempNodeModel: NodeModel = new NodeModel();

    private workspaceInstance: Workspace | undefined;

    constructor(
        private handlerList: Array<ControllerHandler>
    ) {
    }

    public async initialize(): Promise<void> {
        const presentData: PresentDataCallback = () => this.presentData();
        for (const handler of this.handlerList) {
            await handler.initialize(presentData);
            (<NodeDragHandler>handler).setViewModel(this.tempNodeModel);
        }
    }

    // noinspection JSUnusedGlobalSymbols
    public setComponent(view: Workspace): void {
        this.workspaceInstance = view;
    };

    private async presentData(): Promise<void> {
        let model: WorkspaceModel = new WorkspaceModel();
        model.node = this.tempNodeModel;

        if (this.workspaceInstance) this.workspaceInstance.model = model;
    }
}
