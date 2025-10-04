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

        expect(result[0].nodeId).toBe('test::id');
        expect(result[0].x).toBe(300);
        expect(result[0].y).toBe(500);
        expect(result[0].dragging).toBe(true);
    });
});
