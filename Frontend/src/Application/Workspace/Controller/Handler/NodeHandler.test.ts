import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import {createSpy, mock} from '../../../../../test/mock';
import NodeHandler from './NodeHandler';
import Adapter from '../Adapter';
import NodeUseCase from '../../../../Core/Node/NodeUseCase/NodeUseCase';
import {RefreshContentCallback} from '../../../ControllerHandler';

describe('Application.Workspace.Controller.Handler.NodeHandler', function (): void {
    let adapter: Mocked<Adapter>,
        nodeUseCase: Mocked<NodeUseCase>,
        presentData: MockFunction<RefreshContentCallback>,
        handler: NodeHandler;

    beforeEach(function (): void {
        adapter = mock<Adapter>();
        nodeUseCase = mock<NodeUseCase>();
        presentData = createSpy<RefreshContentCallback>();

        handler = new NodeHandler(adapter, nodeUseCase);
    });

    it('should handle of adding node', async function (): Promise<void> {
        await handler.initialize(presentData);
        adapter.addNode();

        assert.strictEqual(nodeUseCase.addNode.mock.calls.length, 1);
        assert.strictEqual(presentData.mock.calls.length, 1);
    });
});
