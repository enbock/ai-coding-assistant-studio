import Node from './Node';
import NodeModel from './NodeModel';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';
import Adapter from '../../Controller/Adapter';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;

describe('Node', function (): void {
    let model: NodeModel,
        adapter: Mocked<Adapter>,
        nodeAddEventListener: Spy<Callback<(event: string, callback: Callback) => void>>,
        nodeEventRemoveListener: Spy<Callback<(event: string, callback: Callback) => void>>,
        windowAddEventListener: Spy<Callback<(event: string, callback: Callback) => void>>,
        windowRemoveEventListener: Spy<Callback<(event: string, callback: Callback) => void>>
    ;

    beforeEach(function (): void {
        nodeAddEventListener = createSpy();
        nodeEventRemoveListener = createSpy();

        windowAddEventListener = spyOn(window, 'addEventListener');
        windowRemoveEventListener = spyOn(window, 'removeEventListener');

        model = new NodeModel();
        adapter = mock<Adapter>();
    });

    afterEach(function (): void {
        restoreModules();
    });

    function createUi(): Node {
        const node = TestRenderer.render(<Node model={model} adapter={adapter}/>) as Node;

        node.addEventListener = nodeAddEventListener;
        node.removeEventListener = nodeEventRemoveListener;

        node.connectedCallback();

        return node;
    }

    it('should display the current position in teh css text', function (): void {
        model.x = 1;
        model.y = 2;

        const result: HTMLElement = createUi();

        expect(result.innerHTML).toContain('left: 1px;');
        expect(result.innerHTML).toContain('top: 2px;');
    });

    it('should get the mouse down callback', async function (): Promise<void> {
        let mouseDownHandler: Callback<(event: MouseEvent) => void>;

        nodeAddEventListener.and.callFake(
            function (event: string, callback: Callback): void {
                expect(event).toBe('mousedown');
                mouseDownHandler = callback;
            }
        );

        const node: Node = createUi();
        expect(mouseDownHandler!).toBeDefined();

        node.disconnectedCallback();
        expect(nodeEventRemoveListener).toHaveBeenCalledWith('mousedown', mouseDownHandler!);
    });

    it('should drag the node', async function (): Promise<void> {
        let mouseDownHandler: Callback<(event: MouseEvent) => void> = () => false as never;
        let mouseMoveHandler: Callback<(event: MouseEvent) => void>;
        let mouseUpHandler: Callback<(event: MouseEvent) => void>;

        nodeAddEventListener.and.callFake(
            function (event: string, callback: Callback): void {
                if (event === 'mousedown') {
                    mouseDownHandler = callback;
                }
            }
        );
        windowAddEventListener.and.callFake(
            function (event: string, callback: Callback): void {
                if (event === 'mousemove') {
                    mouseMoveHandler = callback;
                }
                if (event === 'mouseup') {
                    mouseUpHandler = callback;
                }
            }
        );

        createUi();
        model.dragging = true;

        const mouseDownEvent: MouseEvent = new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 200
        });
        mouseDownHandler(mouseDownEvent);
        expect(mouseMoveHandler!).toBeDefined();
        expect(mouseUpHandler!).toBeDefined();
        expect(adapter.startNodeDrag).toHaveBeenCalled();

        const mouseMoveEvent: MouseEvent = new MouseEvent('mousemove', {
            clientX: 150,
            clientY: 240
        });
        mouseMoveHandler!(mouseMoveEvent);
        expect(adapter.dragNode).toHaveBeenCalledWith(50, 40);

        const mouseUpEvent: MouseEvent = new MouseEvent('mouseup');
        mouseUpHandler!(mouseUpEvent);
        expect(windowRemoveEventListener).toHaveBeenCalledWith('mousemove', mouseMoveHandler!);
        expect(windowRemoveEventListener).toHaveBeenCalledWith('mouseup', mouseUpHandler!);
        expect(adapter.stopNodeDrag).toHaveBeenCalled();
    });
});
