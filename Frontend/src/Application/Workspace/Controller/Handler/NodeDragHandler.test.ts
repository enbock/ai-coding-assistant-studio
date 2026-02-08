import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import {createSpy, mock} from '../../../../../test/mock';
import NodeDragHandler from './NodeDragHandler';
import Adapter from '../Adapter';
import NodeUseCase from '../../../../Core/Node/NodeUseCase/NodeUseCase';
import ScreenConfig from '../../../ScreenConfig';
import {RefreshContentCallback} from '../../../ControllerHandler';

describe('Application.Workspace.Controller.Handler.NodeDragHandler', function (): void {
    let handler: NodeDragHandler,
        adapter: Mocked<Adapter>,
        nodeUseCase: Mocked<NodeUseCase>,
        presentData: MockFunction<RefreshContentCallback>,
        screenConfig: ScreenConfig
    ;

    beforeEach(function (): void {
        adapter = mock<Adapter>();
        nodeUseCase = mock<NodeUseCase>();
        presentData = createSpy<RefreshContentCallback>();
        screenConfig = new ScreenConfig();
        screenConfig.width = 1200;
        screenConfig.height = 800;

        handler = new NodeDragHandler(
            adapter,
            nodeUseCase,
            screenConfig
        );
    });

    it('should start node movement', async function (): Promise<void> {
        await handler.initialize(presentData);
        adapter.startNodeDrag('test::id');

        assert.strictEqual(nodeUseCase.startMovement.mock.calls.length, 1);
        assert.deepStrictEqual(nodeUseCase.startMovement.mock.calls[0].arguments[0], {nodeId: 'test::id'});
        assert.strictEqual(presentData.mock.calls.length, 1);
    });

    it('should stop node movement', async function (): Promise<void> {
        await handler.initialize(presentData);
        adapter.stopNodeDrag();

        assert.strictEqual(nodeUseCase.stopMovement.mock.calls.length, 1);
        assert.strictEqual(presentData.mock.calls.length, 1);
    });

    it('should move the node', async function (): Promise<void> {
        await handler.initialize(presentData);
        adapter.dragNode(300, 500);

        assert.strictEqual(nodeUseCase.moveNode.mock.calls.length, 1);
        assert.deepStrictEqual(nodeUseCase.moveNode.mock.calls[0].arguments[0], {x: -0.5, y: 0.25});
        assert.strictEqual(presentData.mock.calls.length, 1);
    });
});


