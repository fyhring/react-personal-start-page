import React from 'react';

export default class StatusBar extends React.Component
{
    render()
    {
        return (
            <div id="status-wrapper">
                <div className="status-item">
                    <div className="status-key">Time</div>
                    <div className="status-value">12:32</div>
                </div>
                <div className="status-item">
                    <div className="status-key">Time</div>
                    <div className="status-value">12:32</div>
                </div>
                <div className="status-item">
                    <div className="status-key">Time</div>
                    <div className="status-value">12:32</div>
                </div>
            </div>
        );
    }
}
