import ControllerHandler from '../../../ControllerHandler';
import {PresentDataCallback} from '../../../ControllerHandler';
import Workspace from '../View/Workspace';
import WorkspaceModel from '../View/WorkspaceModel';

export default class Controller {
    private workspaceInstance: Workspace | undefined;

    constructor(
        private handlerList: Array<ControllerHandler>
    ) {
    }

    public async initialize(): Promise<void> {
        const presentData: PresentDataCallback = () => this.presentData();
        for (const handler of this.handlerList) {
            await handler.initialize(presentData);
        }
    }

    // noinspection JSUnusedGlobalSymbols
    public setComponent(view: Workspace): void {
        this.workspaceInstance = view;
    };

    private async presentData(): Promise<void> {
        let model: WorkspaceModel = new WorkspaceModel();

        if (this.workspaceInstance) this.workspaceInstance.model = model;
    }
}
