import React from 'react';
import { observer } from 'mobx-react';
import appState from '../appState';
import Helper from '../helper';

@observer
export default class StatusBar extends React.Component
{
    render()
    {
        let time = '';

        if (appState.tick !== null) {
            let tick = new Date(appState.tick.timestamp);
            time = ''+ Helper.addZero(tick.getHours());
            time += ':'+ Helper.addZero(tick.getMinutes());
            time += ':'+ Helper.addZero(tick.getSeconds());
        }

        return (
            <div id="status-wrapper">
                <div className="status-item">
                    <div className="status-key">Time</div>
                    <div className="status-value">{ time }</div>
                </div>
                <div className="status-item">
                    <div className="status-key">Time</div>
                    <div className="status-value">13:37</div>
                </div>
                <div className="status-item">
                    <div className="status-key">Time</div>
                    <div className="status-value">12:32</div>
                </div>
            </div>
        );
    }
}
