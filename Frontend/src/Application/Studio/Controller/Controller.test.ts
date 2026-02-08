import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import {mock} from '../../../../test/mock';
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

    it('should set component and refresh content', async function (): Promise<void> {
        const studioView: Mocked<Studio> = mock<Studio>();
        const model: StudioModel = new StudioModel();
        model.view = <MockedObject>'test::view-component';

        studioPresenter.present.and.returnValue(model);

        controller.setComponent(studioView);

        assert.strictEqual(studioPresenter.present.mock.calls.length, 1);
        assert.strictEqual(studioPresenter.present.mock.calls[0].arguments[0], Content.Empty);
        assert.strictEqual(studioView.model, model);
    });

    it('should navigate to content via adapter callback', async function (): Promise<void> {
        const studioView: Mocked<Studio> = mock<Studio>();
        const model: StudioModel = new StudioModel();
        model.view = <MockedObject>'test::view-component';

        studioPresenter.present.and.returnValue(model);

        await controller.initialize();
        controller.setComponent(studioView);
        adapter.navigateToContent(1);

        assert.strictEqual(studioPresenter.present.mock.calls.length, 2);
        assert.strictEqual(studioPresenter.present.mock.calls[1].arguments[0], 1);
        assert.strictEqual(studioView.model, model);
    });
});
