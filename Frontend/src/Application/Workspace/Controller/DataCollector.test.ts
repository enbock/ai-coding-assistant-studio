import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import {mock} from '../../../../test/mock';
import DataCollector from './DataCollector';
import NodeUseCase from '../../../Core/Node/NodeUseCase/NodeUseCase';
import ResponseCollection from './ResponseCollection';

describe('Application.Workspace.Controller.DataCollector', function (): void {
    let dataCollector: DataCollector,
        nodeUseCase: Mocked<NodeUseCase>
    ;

    beforeEach(function (): void {
        nodeUseCase = mock<NodeUseCase>();

        dataCollector = new DataCollector(nodeUseCase);
    });

    it('should collect data successfully', function (): void {
        nodeUseCase.getState.and.returnValue(<MockedObject>'test::state');

        const result: ResponseCollection = dataCollector.collectData();

        assert.strictEqual(nodeUseCase.getState.mock.calls.length, 1);
        assert.strictEqual(result.nodeResponse, <MockedObject>'test::state');
    });
});


