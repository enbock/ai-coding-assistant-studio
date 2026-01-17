import ControllerHandler from '../../ControllerHandler';
import {RefreshContentCallback} from '../../ControllerHandler';
import Settings from '../View/Settings';
import DataCollector from './DataCollector';
import ResponseCollection from './ResponseCollection';
import SettingsPresenter from '../View/SettingsPresenter';
import SettingsModel from '../View/SettingsModel';

export default class Controller {
    private settingsInstance: Settings | undefined;

    constructor(
        private handlerList: Array<ControllerHandler>,
        private dataCollector: DataCollector,
        private presenter: SettingsPresenter
    ) {
    }

    public async initialize(): Promise<void> {
        const refreshContent: RefreshContentCallback = () => this.refreshContent();

        for (const handler of this.handlerList) {
            await handler.initialize(refreshContent);
        }

        void this.refreshContent();
    }

    public setComponent(view: Settings): void {
        this.settingsInstance = view;
        void this.refreshContent();
    }

    private async refreshContent(): Promise<void> {
        const data: ResponseCollection = this.dataCollector.collectData();
        const model: SettingsModel = this.presenter.present(data);

        if (this.settingsInstance) this.settingsInstance.model = model;
    }
}
