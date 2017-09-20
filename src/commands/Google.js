import ICommand from './ICommand';
import appState from '../appState';

export default class Google extends ICommand
{

    commands = [
        'gmail',
        'images',
        'console',
        'quiz'
    ];

    activeCommand = null;

    // Called each time Google command is called.
    init(sender)
    {
        sender.clear('Google..');
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
        appState.notifications.push({
            message: `Searching Google for '${query}'`,
            time: 5
        });

        appState.linkElement.setAttribute('href', `https://www.google.dk/search?q=${ encodeURIComponent(query) }&hl=da`);
        appState.linkElement.click();
    }

    gmail()
    {
        console.log('gmail');
    }

    images(query, sender)
    {
        if (query === null) {
            sender.clear('Image search..');
            return;
        }

        appState.notifications.push({
            message: `Searching Google Images for '${query}'`,
            time: 5
        });

        appState.linkElement.setAttribute('href', `https://www.google.com/search?tbm=isch&q=${ encodeURIComponent(query) }&hl=da`);
        appState.linkElement.click();

        sender.cancel();
    }

    console()
    {
        console.log('google console');
    }


    quiz(query, sender)
    {
        if (query === null) {
            sender.clear('Ask me any question..');
            return;
        }

        appState.notifications.push({
            message: `I don't know..`,
            time: 2
        });

        sender.clear('Okay, ask me another one..');
    }

}
