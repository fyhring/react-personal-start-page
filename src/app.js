// 3. Party
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';

// Classes
import appState from './appState';
import Commander from './Commander';

// Components
import Background from './components/Background';
import StatusBar from './components/StatusBar';
import SearchBar from './components/SearchBar';
import Notifications from './components/Notifications';

// Commands
import Google from './commands/Google';
import Youtube from './commands/Youtube';


class App extends React.Component
{

    link = null;

    registerCommands()
    {
        appState.commands = {
            'g': new Google(),
            'y': new Youtube()
        };
    }

    render()
    {
        return (
            <div className="wrapper">
                <Notifications />
                <Background />
                <StatusBar />
                <SearchBar />

                <a href="" target="_blank" ref={ link => this.link = link }></a>
            </div>
        );
    }

    componentDidMount()
    {
        appState.currentBackground = 'image1';
        appState.linkElement = this.link;
        appState.commander = new Commander();
        this.registerCommands();
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
