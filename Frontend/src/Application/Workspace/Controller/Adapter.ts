export default class Adapter {
    public startNodeDrag: Callback = () => <never>false;
    public stopNodeDrag: Callback = () => <never>false;
    public dragNode: Callback<(x: number, y: number) => void> = () => <never>false;
}
