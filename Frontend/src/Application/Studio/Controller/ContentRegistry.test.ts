import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import ContentRegistry from './ContentRegistry';
import RootView from '../../RootView';
import EmptyView from '../View/EmptyView';

describe('Application.Studio.Controller.ContentRegistry', function (): void {
    let contentRegistry: ContentRegistry;

    beforeEach(function (): void {
        contentRegistry = new ContentRegistry();
    });

    it('should register content successfully', function (): void {
        const viewComponent: RootView = <MockedObject>'test::view-component';

        contentRegistry.registerContent(1, viewComponent);

        const result: RootView = contentRegistry.getViewComponent(1);
        
        assert.strictEqual(result, viewComponent);
    });

    it('should get registered view component by content id', function (): void {
        const viewComponent: RootView = <MockedObject>'test::view-component';

        contentRegistry.registerContent(42, viewComponent);

        const result: RootView = contentRegistry.getViewComponent(42);

        assert.strictEqual(result, viewComponent);
    });

    it('should return empty view for unregistered content id', function (): void {
        const result: RootView = contentRegistry.getViewComponent(999);

        assert.strictEqual(result, EmptyView);
    });
});



