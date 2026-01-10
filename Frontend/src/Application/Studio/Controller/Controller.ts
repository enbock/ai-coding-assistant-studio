import Studio from '../View/Studio';
import Adapter from './Adapter';
import StudioPresenter from '../View/StudioPresenter';
import Content from '../Content';
import Base from '../../Controller';

export default class Controller implements Base {
    private studioInstance: Studio | undefined;

    constructor(
        private adapter: Adapter,
        private studioPresenter: StudioPresenter
    ) {
    }

    public async initialize(): Promise<void> {
        this.adapter.navigateToContent = (contentId: number) => this.handleNavigateToContent(contentId);
        await this.refreshContent(Content.Workspace);
    }

    public setComponent(view: Studio): void {
        this.studioInstance = view;
        void this.refreshContent(Content.Workspace);
    }

    private handleNavigateToContent(contentId: number): void {
        void this.refreshContent(contentId);
    }

    private async refreshContent(contentId: Content): Promise<void> {
        if (this.studioInstance == undefined) return;

        this.studioInstance.model = this.studioPresenter.present(contentId);
    }
}

