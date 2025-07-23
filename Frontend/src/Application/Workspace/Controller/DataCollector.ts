import ResponseCollection from './ResponseCollection';
import NodeUseCase from '../../../Core/Node/NodeUseCase/NodeUseCase';

export default class DataCollector {
    constructor(
        private nodeUseCase: NodeUseCase
    ) {
    }

    public collectData(): ResponseCollection {
        const responseCollection: ResponseCollection = new ResponseCollection();

        this.nodeUseCase.getState(responseCollection.nodeResponse);

        return responseCollection;
    }
}
