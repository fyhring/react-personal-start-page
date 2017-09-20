import React from 'react';
import { observer } from 'mobx-react';
import appState from '../appState';

@observer
export default class Background extends React.Component
{
    currentBackground = null;
    classOne = null;
    classTwo = null;

    componentWillUpdate()
    {
        if (appState.currentBackground != this.currentBackground) {
            this.classTwo = appState.currentBackground + ' background show';

            setTimeout(() => {
                this.classOne = appState.currentBackground + ' background';
                this.classTwo = appState.currentBackground + ' background';

                this.forceUpdate();
            }, 1000);
        }
    }

    render()
    {
        this.currentBackground = '' + appState.currentBackground;

        return (
            <div>
                <div id="background" className={this.classOne}></div>
                <div id="background-fade" className={this.classTwo}></div>
            </div>
        );
    }
}
