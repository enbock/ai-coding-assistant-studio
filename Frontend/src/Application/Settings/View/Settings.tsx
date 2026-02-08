import Component from '@enbock/ts-jsx/Component';
import {ComponentProperties} from '@enbock/ts-jsx/Component';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import Style from './Style.css';
import SettingsModel from './SettingsModel';
import Adapter from '../Controller/Adapter';
import RootView from '../../RootView';

export default class Settings extends Component<ComponentProperties> implements RootView {
    public modelInstance: SettingsModel = new SettingsModel();

    public get model(): SettingsModel {
        return this.modelInstance;
    }

    public set model(model: SettingsModel) {
        this.modelInstance = model;
        this.renderShadow();
    }

    constructor(
        props: ComponentProperties,
        private adapter: Adapter
    ) {
        super(props);
    }

    public render(): ShadowDomElement | ShadowDomElement[] {
        return (
            <>
                <style>{Style}</style>
                <label className="settings-label">
                    Arbeitsverzeichnis:
                    <input
                        type="text"
                        className="settings-input"
                        value={this.model.workingDirectory}
                        onChange={(e: Event) => this.handleInput(e)}
                    />
                </label>
            </>
        );
    }

    private async handleInput(event: Event): Promise<void> {
        const targetDirectory: string = (event.target as HTMLInputElement).value;
        await this.adapter.updateWorkingDirectory(targetDirectory);
    }
}
