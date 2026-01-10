export default class Adapter {
    public navigateToContent: Callback<(contentId: number) => void> = () => <never>false;
}

