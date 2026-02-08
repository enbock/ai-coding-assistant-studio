import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import {createSpy, mock} from '../../../../test/mock';
import NodeUseCase from './NodeUseCase';
import NodeStorage from '../NodeStorage';
import NodeEntity from '../NodeEntity';
import NodeResponse from './NodeResponse';
import NodeResponseFormatter from './Task/NodeResponseFormatter';
import NodeMoveRequest from './NodeMoveRequest';

describe('Core.Node.NodeUseCase.NodeUseCase', function (): void {
    let nodeStorage: Mocked<NodeStorage>,
        nodeResponseFormatter: Mocked<NodeResponseFormatter>,
        generateUuid: MockFunction<() => string>,
        useCase: NodeUseCase;

    beforeEach(function (): void {
        nodeStorage = mock<NodeStorage>();
        generateUuid = createSpy<() => string>();
        nodeResponseFormatter = mock<NodeResponseFormatter>();

        useCase = new NodeUseCase(
            nodeStorage,
            nodeResponseFormatter,
            generateUuid
        );
    });

    it('should get current state', async function (): Promise<void> {
        const position: NodeEntity = new NodeEntity();
        position.x = 1;
        position.y = -2;

        nodeStorage.getNodes.and.returnValue([position]);
        nodeStorage.getMovedNodeId.and.returnValue('test::id');
        nodeResponseFormatter.formatPositions.and.returnValue(<MockedObject>'test::formattedNodes');

        const nodeResponse: NodeResponse = useCase.getState();

        assert.strictEqual(nodeResponseFormatter.formatPositions.mock.calls.length, 1);
        assert.deepStrictEqual(nodeResponseFormatter.formatPositions.mock.calls[0].arguments[0], [position]);
        assert.strictEqual(nodeResponseFormatter.formatPositions.mock.calls[0].arguments[1], 'test::id');
        assert.strictEqual(nodeResponse.nodes, <MockedObject>'test::formattedNodes');
    });

    it('should start node movement', function (): void {
        useCase.startMovement({nodeId: 'test::id'});
        assert.strictEqual(nodeStorage.setMovedNodeId.mock.calls.length, 1);
        assert.strictEqual(nodeStorage.setMovedNodeId.mock.calls[0].arguments[0], 'test::id');
    });

    it('should stop node movement', function (): void {
        useCase.stopMovement();
        assert.strictEqual(nodeStorage.setMovedNodeId.mock.calls.length, 1);
        assert.strictEqual(nodeStorage.setMovedNodeId.mock.calls[0].arguments[0], '');
    });

    it('should move node to given position', function (): void {
        const request: NodeMoveRequest = {
            x: 1,
            y: -2
        };

        const node: NodeEntity = new NodeEntity();
        node.id = 'test::id';

        nodeStorage.getMovedNodeId.and.returnValue('test::id');
        nodeStorage.getNodes.and.returnValue([node]);

        useCase.moveNode(request);

        assert.strictEqual(nodeStorage.setNodes.mock.calls.length, 1);
        assert.deepStrictEqual(nodeStorage.setNodes.mock.calls[0].arguments[0], [node]);
        assert.strictEqual(node.x, 1);
        assert.strictEqual(node.y, -2);
    });

    it('should add a new node with generated id and update storage', function (): void {
        const oldNode: NodeEntity = new NodeEntity();
        oldNode.id = 'test::beforeCreatedNode';
        const nodes: Array<NodeEntity> = [oldNode];

        generateUuid.and.returnValue('test::uuid');
        nodeStorage.getNodes.and.returnValue(nodes);
        nodeStorage.setNodes.and.callFake(function (updatedNodes: Array<NodeEntity>): void {
            assert.strictEqual(updatedNodes.length, 2);
            assert.strictEqual(updatedNodes[0].id, 'test::beforeCreatedNode');
            assert.strictEqual(updatedNodes[1].id, 'test::uuid');
        });

        useCase.addNode();

        assert.strictEqual(nodeStorage.setNodes.mock.calls.length, 1);
    });
});
