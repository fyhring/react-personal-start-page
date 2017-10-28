// 3. Party
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { DevTools } from 'mobx-react-devtools';
import React from 'react';
import ReactDOM from 'react-dom';

// Classes
import appState from './appState';
import Helper from './helper.js';
import Commander from './Commander';

// Components
import Background from './components/Background';
import StatusBar from './components/StatusBar';
import SearchBar from './components/SearchBar';
import Notifications from './components/Notifications';

// Commands
import Google from './commands/Google';
import Youtube from './commands/Youtube';
import Context from './commands/Context';

@observer
class App extends React.Component
{

    link = null;
    image = null;
    
    tickInterval = null;

    constructor(props)
    {
        super(props);
        this.tickInterval = setInterval(this.tick, 500);

        setTimeout(() => {
            
        }, 0);
    }

    registerCommands()
    {
        appState.commands = {
            'g': new Google(),
            'y': new Youtube(),
            'ctx': new Context()
        };
    }

    tick = () =>
    {
        appState.tick = { timestamp: Date.now() };
        this.checkThemeConditions();
    }

    checkThemeConditions()
    {
        let date = new Date(appState.tick.timestamp);
        if (date.getHours() > 19 || date.getHours() < 6) {
            appState.theme = 'dark';
        } else {
            appState.theme = 'light';
        }
    }

    render()
    {
        return (
            <div className="wrapper" data-theme={appState.theme}>
                <Notifications />
                <Background />
                <StatusBar />
                <SearchBar />

                <a href="" target="_blank" ref={ link => this.link = link }></a>
                <img src="" width="0" height="0" ref={ image => this.image = image } />
            </div>
        );
    }

    componentDidMount()
    {
        appState.linkElement = this.link;
        appState.imageElement = this.image;
        appState.commander = new Commander();
        this.registerCommands();
        Background.getRandomBackground();
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
