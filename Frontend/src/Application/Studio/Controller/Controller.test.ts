import Controller from './Controller';
import Adapter from './Adapter';
import Studio from '../View/Studio';
import StudioPresenter from '../View/StudioPresenter';
import StudioModel from '../View/StudioModel';
import Content from '../Content';

describe('Application.Studio.Controller.Controller', function (): void {
    let adapter: Mocked<Adapter>,
        studioPresenter: Mocked<StudioPresenter>,
        controller: Controller;

    beforeEach(function (): void {
        adapter = mock<Adapter>();
        studioPresenter = mock<StudioPresenter>();

        controller = new Controller(
            adapter,
            studioPresenter
        );
    });

    it('should set component and refresh content with workspace', async function (): Promise<void> {
        const studioView: Mocked<Studio> = mock<Studio>();
        const model: StudioModel = new StudioModel();
        model.view = <MockedObject>'test::view-component';

        studioPresenter.present.and.returnValue(model);

        controller.setComponent(studioView);

        expect(studioPresenter.present).toHaveBeenCalledWith(Content.Workspace);
        expect(studioView.model).toBe(model);
    });

    it('should navigate to content via adapter callback', async function (): Promise<void> {
        const studioView: Mocked<Studio> = mock<Studio>();
        const model: StudioModel = new StudioModel();
        model.view = <MockedObject>'test::view-component';

        studioPresenter.present.and.returnValue(model);

        await controller.initialize();
        controller.setComponent(studioView);
        adapter.navigateToContent(1);

        expect(studioPresenter.present).toHaveBeenCalledWith(1);
        expect(studioView.model).toBe(model);
    });
});

