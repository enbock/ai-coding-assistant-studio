import StudioModel from './StudioModel';
import ContentRegistry from '../Controller/ContentRegistry';

export default class StudioPresenter {
    constructor(
        private contentRegistry: ContentRegistry
    ) {
    }

    public present(currentContentId: number): StudioModel {
        const model: StudioModel = new StudioModel();
        model.view = this.contentRegistry.getViewComponent(currentContentId);

        return model;
    }
}

