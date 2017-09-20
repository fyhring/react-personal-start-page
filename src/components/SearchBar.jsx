import React from 'react';
import { observer } from 'mobx-react';
import appState from '../appState';


export default class SearchBar extends React.Component
{
    defaultPlaceholder = 'Smart Search..';

    state = {
        inputValue: '',
        placeHolder: this.defaultPlaceholder
    }

    cancel = () => {
        appState.awaitingCommand = null;
        this.clear();
    }

    clear = (placeholder) => {

        let _placeholder = (typeof placeholder !== typeof undefined) ? placeholder : this.defaultPlaceholder;

        this.setState({
            inputValue: '',
            placeHolder: _placeholder
        });
    }

    onInput = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };

    readInput = (event) => {

        const key = event.keyCode ? event.keyCode : event.charCode;
        const command = this.state.inputValue;

        if (key != 13 || command == '') {
            return;
        }

        if (appState.isAwaitingInput) {
            if (command == 'x') {
                this.cancel();
                return;
            }

            appState.commands[appState.awaitingCommand].run(command, this);
            return;
        }

        // Check command exists
        if (!appState.commands.hasOwnProperty(command)) {
            // Push new notification
            appState.notifications.push({
                message: `Command '${command}' not found!`,
                sender: this
            });

            this.clear();
            return;
        }

        if (command === 'x') {
            this.clear();
            return;
        }

        appState.awaitingCommand = command;
        appState.commands[command].init(this);
    }

    render()
    {
        return (
            <div>
                <input type="text" id="search" tabIndex="1" autoComplete="off" 
                    placeholder={this.state.placeHolder}
                    value={this.state.inputValue}
                    onChange={this.onInput}
                    onKeyPress={this.readInput}
                />
            </div>
        );
    }
}
