import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withJob } from 'react-jobs/ssr';
import appstate from '../stores/appstate'

@observer(['appstate'])
class Root extends Component {

    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);

        console.log(typeof window === 'object' ? 'client-side' : 'server-side');
    }

    addItem() {
        this.props.appstate.addItem('foobar');
    }

    render() {

        const { appstate } = this.props;
        console.log(appstate);
        const user = appstate.user || { firstName: 'null', lastName: 'null' }

        return (
            <div>
                <div>{user.firstName} {user.lastName}</div>
                <button onClick={this.addItem}>foobar</button>
                <ul>
                    {appstate.items.map((item, key) => <li key={key}>{item}</li>)}
                </ul>
            </div>
        );
    }
}

export default withJob(
    (props) => appstate.loadUser()
)(Root);