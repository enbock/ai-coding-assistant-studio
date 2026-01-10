import RootView from '../../RootView';
import EmptyView from '../View/EmptyView';

export default class ContentRegistry {
    private contentMap: Map<number, RootView> = new Map();

    public registerContent(contentId: number, viewComponent: RootView): void {
        this.contentMap.set(contentId, viewComponent);
    }

    public getViewComponent(contentId: number): RootView {
        const entry: RootView | undefined = this.contentMap.get(contentId);
        return entry ? entry : EmptyView;
    }
}

