export class NodeItem {
    public x: number = 0;
    public y: number = 0;
    public isMoving: boolean = false;
    public nodeId: string = '';
}

export default class NodeResponse {
    public nodes: Array<NodeItem> = [];
}
