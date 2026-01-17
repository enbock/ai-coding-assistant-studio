import ResponseCollection from '../Controller/ResponseCollection';
import SettingsModel from './SettingsModel';

export default class SettingsPresenter {
    public present(data: ResponseCollection): SettingsModel {
        const model: SettingsModel = new SettingsModel();
        model.workingDirectory = data.workingDirectory;
        return model;
    }
}
