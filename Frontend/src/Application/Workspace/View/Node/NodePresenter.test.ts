import NodePresenter from './NodePresenter';
import ResponseCollection from '../../Controller/ResponseCollection';
import NodeModel from './NodeModel';

describe('NodePresenter', function (): void {
    let presenter: NodePresenter;

    beforeEach(function (): void {
        presenter = new NodePresenter();
    });

    it('should present positon and movement flag', async function (): Promise<void> {
        const data: ResponseCollection = new ResponseCollection();
        data.nodeResponse.x = 1;
        data.nodeResponse.y = -2;
        data.nodeResponse.isMoving = true;

        const result: NodeModel = presenter.present(data);

        expect(result.x).toBe(1);
        expect(result.y).toBe(-2);
        expect(result.dragging).toBe(true);
    });
});
