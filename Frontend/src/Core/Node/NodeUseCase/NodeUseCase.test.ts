import NodeUseCase from './NodeUseCase';
import NodeStorage from '../NodeStorage';
import NodeEntity from '../NodeEntity';
import NodeResponse from './NodeResponse';
import NodeResponseFormatter from './Task/NodeResponseFormatter';
import NodeMoveRequest from './NodeMoveRequest';
import createSpy = jasmine.createSpy;

describe('Core.Node.NodeUseCase.NodeUseCase', function (): void {
    let nodeStorage: Mocked<NodeStorage>,
        nodeResponseFormatter: Mocked<NodeResponseFormatter>,
        generateUuid: jasmine.Spy,
        useCase: NodeUseCase;

    beforeEach(function (): void {
        nodeStorage = mock<NodeStorage>();
        generateUuid = createSpy();
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

        expect(nodeResponseFormatter.formatPositions).toHaveBeenCalledWith([position], 'test::id');
        expect(nodeResponse.nodes).toBe(<MockedObject>'test::formattedNodes');
    });

    it('should start node movement', function (): void {
        useCase.startMovement({nodeId: 'test::id'});
        expect(nodeStorage.setMovedNodeId).toHaveBeenCalledWith('test::id');
    });

    it('should stop node movement', function (): void {
        useCase.stopMovement();
        expect(nodeStorage.setMovedNodeId).toHaveBeenCalledWith('');
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

        expect(nodeStorage.setNodes).toHaveBeenCalledWith([node]);
        expect(node.x).toBe(1);
        expect(node.y).toBe(-2);
    });

    it('should add a new node with generated id and update storage', function (): void {
        const oldNode: NodeEntity = new NodeEntity();
        oldNode.id = 'test::beforeCreatedNode';
        const nodes: Array<NodeEntity> = [oldNode];

        generateUuid.and.returnValue('test::uuid');
        nodeStorage.getNodes.and.returnValue(nodes);
        nodeStorage.setNodes.and.callFake(function (updatedNodes: Array<NodeEntity>): void {
            expect(updatedNodes.length).toBe(2);
            expect(updatedNodes[0].id).toBe('test::beforeCreatedNode');
            expect(updatedNodes[1].id).toBe('test::uuid');
        });

        useCase.addNode();

        expect(nodeStorage.setNodes).toHaveBeenCalled();
    });
});
