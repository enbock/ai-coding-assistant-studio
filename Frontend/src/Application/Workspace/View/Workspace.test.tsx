import Workspace from './Workspace';
import WorkspaceModel from './WorkspaceModel';
import TestRenderer from '@enbock/ts-jsx/TestRenderer';
import Adapter from '../Controller/Adapter';
import Node from './Node/Node';
import NodeModel from './Node/NodeModel';
import ViewInjection from '@enbock/ts-jsx/ViewInjection';

describe('Workspace', function () {
    let model: WorkspaceModel,
        adapter: Adapter
    ;
    beforeEach(function () {
        mockModule(
            './Node/Node',
            function factory(module: any): Object {
                const Component: typeof Node = module.default;
                return {
                    default: class MockedNode extends Component {
                        public render(): JSX.Element {
                            this.innerHTML =
                                'test::Node:[' +
                                String(this.props.model) +
                                ',' +
                                String(this.props.adapter) +
                                ']';
                            return '';
                        }
                    }
                };
            }
        );

        model = new WorkspaceModel();
        model.node = 'test::nodeModel' as unknown as NodeModel;
        adapter = 'test::adapter' as unknown as Adapter;

        ViewInjection(Workspace, adapter);
    });

    afterEach(function (): void {
        restoreModules();
    });

    function createUi(): Workspace {
        const workspace: Workspace = TestRenderer.render(<Workspace/>) as Workspace;
        workspace.model = model;

        return workspace;
    }

    it('should render the node', function () {
        const result: HTMLElement = createUi();

        expect(result.innerHTML).toContain('test::Node:[test::nodeModel,test::adapter]');
    });
});
