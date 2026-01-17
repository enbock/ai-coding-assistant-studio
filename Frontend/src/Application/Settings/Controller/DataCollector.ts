import SettingsUseCase from '../../../Core/Settings/SettingsUseCase/SettingsUseCase';
import SettingsResponse from '../../../Core/Settings/SettingsUseCase/SettingsResponse';
import ResponseCollection from './ResponseCollection';

export default class DataCollector {
    constructor(
        private settingsUseCase: SettingsUseCase
    ) {
    }

    public collectData(): ResponseCollection {
        const settingsResponse: SettingsResponse = new SettingsResponse();
        this.settingsUseCase.getSettings(settingsResponse);

        const collection: ResponseCollection = new ResponseCollection();
        collection.workingDirectory = settingsResponse.workingDirectory;

        return collection;
    }
}
