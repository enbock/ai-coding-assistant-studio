import NodeResponseInterface from '../../../Core/Node/NodeUseCase/NodeResponse';

export default class NodeResponse implements NodeResponseInterface {
    public x: number = 0;
    public y: number = 0;
    public isMoving: boolean = false;
}
