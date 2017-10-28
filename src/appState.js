import { observable } from 'mobx';

const appState = observable({

    // Contains the classname for the current background image.
    currentBackground: null,

    // DOM link element which can be used to open new tabs.
    linkElement: null,

    // DOM image element to pre-load background images.
    imageElement: null,

    // Contains the command that are awaiting further input.
    awaitingCommand: null,

    // This computed property determines wheater we're waiting for further input.
    get isAwaitingInput() { // computed prop
        return this.awaitingCommand !== null;
    },

    // Contains all callable commands from the smart-search field.
    commands: [],

    // Instance of the Commander class.
    commander: null,

    // List of all notifications. Push new ones to this to make them appear.
    notifications: [],

    // Contains the current tick object. Which includes a date.
    tick: null,

    // Contains the current theme.
    theme: 'light'

});

// @TODO REMOVE THIS!!
window.xxx = appState;

export default appState;
