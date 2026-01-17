export default class Adapter {
    public updateWorkingDirectory: (directory: string) => Promise<void> = () => <never>false;
}
