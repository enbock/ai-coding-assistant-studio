import Component from '@enbock/ts-jsx/Component';
import {ShadowDomElement} from '@enbock/ts-jsx/ShadowDom';
import Style from './Styles/Style.css';
import Adapter from '../../Controller/Adapter';
import Content from '../../Content';

interface Properties {
    adapter: Adapter;
}

export default class Navigation extends Component<Properties> {
    public render(): ShadowDomElement | ShadowDomElement[] {
        return (
            <>
                <style>{Style}</style>
                <nav>
                    <ul>
                        <li>
                            <a title="Zu den Einstellungen">
                                <nav-icon
                                    image="settings"
                                    onClick={this.onSettingsClick.bind(this)}
                                />
                            </a>
                        </li>
                        <li>
                            <a title="Zum Workspace">
                                <nav-icon
                                    image="workspace"
                                    onClick={this.onWorkspaceClick.bind(this)}
                                />
                            </a>
                        </li>
                    </ul>
                </nav>
            </>
        );
    }

    private onSettingsClick(): void {
        this.props.adapter.navigateToContent(Content.Settings);
    }

    private onWorkspaceClick(): void {
        this.props.adapter.navigateToContent(Content.Workspace);
    }
}
