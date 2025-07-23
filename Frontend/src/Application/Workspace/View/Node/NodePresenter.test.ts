import NodePresenter from './NodePresenter';
import ResponseCollection from '../../Controller/ResponseCollection';
import NodeModel from './NodeModel';
import ScreenConfig from '../../../ScreenConfig';

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
        data.nodeResponse.x = -0.5;
        data.nodeResponse.y = 0.25;
        data.nodeResponse.isMoving = true;

        const result: NodeModel = presenter.present(data);

        expect(result.x).toBe(300);
        expect(result.y).toBe(500);
        expect(result.dragging).toBe(true);
    });
});
