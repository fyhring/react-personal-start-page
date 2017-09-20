import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import appState from '../appState';

import Notification from './Notification';


@observer
export default class Notifications extends React.Component
{
    render()
    {
        return (
            <div>
                {appState.notifications.map((value, i) => {
                    return <Notification key={i} index={i} {...value} />;
                })}
            </div>
        );
    }
}
