import StudioPresenter from './StudioPresenter';
import StudioModel from './StudioModel';
import ContentRegistry from '../Controller/ContentRegistry';

describe('Application.Studio.View.StudioPresenter', function (): void {
    let contentRegistry: Mocked<ContentRegistry>,
        presenter: StudioPresenter;

    beforeEach(function (): void {
        contentRegistry = mock<ContentRegistry>();

        presenter = new StudioPresenter(contentRegistry);
    });

    it('should present current content with view component', function (): void {
        contentRegistry.getViewComponent.and.returnValue(<MockedObject>'test::viewComponent');

        const result: StudioModel = presenter.present(0);

        expect(contentRegistry.getViewComponent).toHaveBeenCalledWith(0);
        expect(result.view).toBe(<MockedObject>'test::viewComponent');
    });
});

