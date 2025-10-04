import ResponseCollection from '../Controller/ResponseCollection';
import WorkspaceModel from './WorkspaceModel';
import NodePresenter from './Node/NodePresenter';
import WorkspacePresenter from './WorkspacePresenter';

describe('WorkspacePresenter', function (): void {
    let nodePresenter: Mocked<NodePresenter>,
        presenter: WorkspacePresenter
    ;

    beforeEach(function (): void {
        nodePresenter = mock<NodePresenter>();

        presenter = new WorkspacePresenter(nodePresenter);
    });

    it('should create a WorkspaceModel with applied visual rules', function (): void {
        const data = new ResponseCollection();
        data.nodeResponse = <MockedObject>'test::nodeResponse';

        nodePresenter.present.and.returnValue(<MockedObject>'test::nodeModels');

        const result: WorkspaceModel = presenter.present(data);

        expect(nodePresenter.present).toHaveBeenCalledWith(data);
        expect(result.nodes).toBe(<MockedObject>'test::nodeModels');
    });
});
