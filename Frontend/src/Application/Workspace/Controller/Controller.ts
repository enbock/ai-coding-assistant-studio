import ControllerHandler from '../../../ControllerHandler';
import {PresentDataCallback} from '../../../ControllerHandler';
import Workspace from '../View/Workspace';
import DataCollector from './DataCollector';
import ResponseCollection from './ResponseCollection';
import WorkspacePresenter from '../View/WorkspacePresenter';
import WorkspaceModel from '../View/WorkspaceModel';

export default class Controller {
    private workspaceInstance: Workspace | undefined;

    constructor(
        private handlerList: Array<ControllerHandler>,
        private dataCollector: DataCollector,
        private presenter: WorkspacePresenter
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
        const data: ResponseCollection = this.dataCollector.collectData();
        const model: WorkspaceModel = this.presenter.present(data);

        if (this.workspaceInstance) this.workspaceInstance.model = model;
    }
}
