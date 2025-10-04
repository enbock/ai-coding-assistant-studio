import ResponseCollection from './ResponseCollection';
import NodeUseCase from '../../../Core/Node/NodeUseCase/NodeUseCase';

export default class DataCollector {
    constructor(
        private nodeUseCase: NodeUseCase
    ) {
    }

    public collectData(): ResponseCollection {
        const responseCollection: ResponseCollection = new ResponseCollection();

        responseCollection.nodeResponse = this.nodeUseCase.getState();

        return responseCollection;
    }
}
