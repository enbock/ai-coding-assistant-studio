import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import {mock} from '../../../../test/mock';
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

        assert.strictEqual(nodePresenter.present.mock.calls.length, 1);
        assert.deepStrictEqual(nodePresenter.present.mock.calls[0].arguments[0], data);
        assert.strictEqual(result.nodes, <MockedObject>'test::nodeModels');
    });
});


