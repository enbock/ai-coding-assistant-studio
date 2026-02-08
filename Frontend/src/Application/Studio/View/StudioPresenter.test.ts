import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import {mock} from '../../../../test/mock';
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

        assert.strictEqual(contentRegistry.getViewComponent.mock.calls.length, 1);
        assert.strictEqual(contentRegistry.getViewComponent.mock.calls[0].arguments[0], 0);
        assert.strictEqual(result.view, <MockedObject>'test::viewComponent');
    });
});



