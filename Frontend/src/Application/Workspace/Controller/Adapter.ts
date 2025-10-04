export default class Adapter {
    public startNodeDrag: Callback<(nodeId: string) => void> = () => <never>false;
    public stopNodeDrag: Callback = () => <never>false;
    public dragNode: Callback<(x: number, y: number) => void> = () => <never>false;
    public addNode: Callback = () => <never>false;
}
