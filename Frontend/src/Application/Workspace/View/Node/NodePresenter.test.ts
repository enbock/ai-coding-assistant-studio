import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import NodePresenter from './NodePresenter';
import ResponseCollection from '../../Controller/ResponseCollection';
import NodeModel from './NodeModel';
import ScreenConfig from '../../../ScreenConfig';
import {NodeItem} from '../../../../Core/Node/NodeUseCase/NodeResponse';

describe('NodePresenter', function (): void {
    let presenter: NodePresenter,
        screenConfig: ScreenConfig
    ;

    beforeEach(function (): void {
        screenConfig = new ScreenConfig();
        screenConfig.width = 1200;
        screenConfig.height = 800;
        presenter = new NodePresenter(screenConfig);
    });

    it('should present positon and movement flag', async function (): Promise<void> {
        const data: ResponseCollection = new ResponseCollection();

        const nodeItem = new NodeItem();
        nodeItem.nodeId = 'test::id';
        nodeItem.x = -0.5;
        nodeItem.y = 0.25;
        nodeItem.isMoving = true;

        data.nodeResponse.nodes = [nodeItem];

        const result: Array<NodeModel> = presenter.present(data);

        assert.strictEqual(result[0].nodeId, 'test::id');
        assert.strictEqual(result[0].x, 300);
        assert.strictEqual(result[0].y, 500);
        assert.strictEqual(result[0].dragging, true);
    });
});


