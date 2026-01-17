import ControllerHandler from '../../../ControllerHandler';
import {RefreshContentCallback} from '../../../ControllerHandler';
import Adapter from '../Adapter';
import SettingsUseCase from '../../../../Core/Settings/SettingsUseCase/SettingsUseCase';

export default class SettingsHandler implements ControllerHandler {

    constructor(
        private adapter: Adapter,
        private settingsUseCase: SettingsUseCase
    ) {
    }

    public async initialize(refreshContent: RefreshContentCallback): Promise<void> {
        this.refreshContent = refreshContent;

        this.adapter.updateWorkingDirectory = this.handleUpdateWorkingDirectory.bind(this);

        await this.settingsUseCase.loadSettings();
    }

    private refreshContent: RefreshContentCallback = () => <never>false;

    private async handleUpdateWorkingDirectory(directory: string): Promise<void> {
        await this.settingsUseCase.updateWorkingDirectory({workingDirectory: directory});
        await this.refreshContent();
    }
}
