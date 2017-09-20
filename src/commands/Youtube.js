import ICommand from './ICommand';
import appState from '../appState';

export default class Google extends ICommand
{

    userName = 'fyhring4u';

    commands = [
        'me',
        'pl'
    ];

    activeCommand = null;

    // Called each time Youtube command is called.
    init(sender)
    {
        sender.clear('Youtube..');
        this.activeCommand = null;
    }

    reset(sender)
    {
        sender.cancel();
        this.activeCommand = null;
    }

    // When awaiting for further input, this method gets called.
    run(query, sender)
    {
        if (this.activeCommand !== null) {
            return this[this.commands[this.activeCommand]](query, sender);
        }

        let position = this.commands.indexOf(query);
        if (position !== -1) {
            this.activeCommand = position;
            return this[this.commands[position]](null, sender);
        }

        this.search(query);
        sender.cancel();
        this.activeCommand = null;
    }

    search(query)
    {
        appState.linkElement.setAttribute('href', `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
        appState.linkElement.click();
    }

    me(query, sender)
    {
        appState.linkElement.setAttribute('href', `https://www.youtube.com/user/${this.userName}`);
        appState.linkElement.click();

        this.reset(sender);
    }

    pl(query, sender)
    {
        appState.linkElement.setAttribute('href', `https://www.youtube.com/user/${this.userName}/playlists?view=1&sort=dd&shelf_id=0`);
        appState.linkElement.click();

        this.reset(sender);
    }
    
}
