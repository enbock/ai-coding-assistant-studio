import Component from '@enbock/ts-jsx/Component';
import {ComponentProperties} from '@enbock/ts-jsx/Component';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import StudioModel from './StudioModel';
import RootView from '../../RootView';

export default class Studio extends Component<ComponentProperties> {
    private modelInstance: StudioModel = new StudioModel();

    public get model(): StudioModel {
        return this.modelInstance;
    }

    public set model(model: StudioModel) {
        this.modelInstance = model;
        this.renderShadow();
    }

    constructor(
        props: ComponentProperties
    ) {
        super(props);
    }

    public render(): ShadowDomElement | ShadowDomElement[] {
        return (
            <>
                {this.renderContent()}
            </>
        );
    }

    private renderContent(): ShadowDomElement | ShadowDomElement[] {
        // noinspection JSUnusedLocalSymbols used in Renderign below
        const DisplayedView: RootView = this.model.view;

        return <DisplayedView/>;
    }
}

