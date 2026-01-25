import Component from '@enbock/ts-jsx/Component';
import {ComponentProperties} from '@enbock/ts-jsx/Component';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import StudioModel from './StudioModel';
import RootView from '../../RootView';
import Navigation from './Navigation/Navigation';
import Adapter from '../Controller/Adapter';
import Style from './Style.css';

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
        props: ComponentProperties,
        private adapter: Adapter
    ) {
        super(props);
    }

    public render(): ShadowDomElement | ShadowDomElement[] {
        return (
            <>
                <style>{Style}</style>
                <Navigation adapter={this.adapter}/>
                {this.renderContent()}
            </>
        );
    }

    private renderContent(): ShadowDomElement | ShadowDomElement[] {
        // noinspection JSUnusedLocalSymbols used in rendering below
        const DisplayedView: RootView = this.model.view;

        return <main>
            <DisplayedView/>
        </main>;
    }
}

