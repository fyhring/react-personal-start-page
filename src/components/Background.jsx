import React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import appState from '../appState';

@observer
export default class Background extends React.Component
{
    static token = '70f779bba1a39d026ccd1de18463e6341612285c3e3c2f9d74098a5c32c7d9a4';
    static query = 'dark';

    currentBackground = null;
    cssClass = null;
    styleOne = null;
    styleTwo = null;

    static getRandomBackground()
    {
        const url = `https://api.unsplash.com/photos/random`
            + `?page=1&orientation=landscape&query=`
            + `${this.query}&client_id=${this.token}`;

        axios.get(url)
            .then(response => {
                const image = response.data.urls.full;
                appState.currentBackground = image;
            });
    }

    static saveImage()
    {
        appState.linkElement.setAttribute('href', appState.currentBackground);
        appState.linkElement.click();
    }

    componentWillUpdate()
    {
        if (appState.currentBackground != this.currentBackground) {
            
            this.cssClass = ' background';
            appState.imageElement.setAttribute('src', appState.currentBackground);

            // When the image is assumed to be loaded fade it in.
            setTimeout(() => {
                this.cssClass = ' background show';
                this.styleTwo = {
                    backgroundImage: `url(${appState.currentBackground})`
                };
                this.forceUpdate();
            }, 1000);

            // Change the visible image container and reset the fader.
            setTimeout(() => {
                const imageObj = { backgroundImage: `url(${appState.currentBackground})` };
                
                this.cssClass = ' background';
                this.styleOne = imageObj;
                this.styleTwo = imageObj;
                this.forceUpdate();
            }, 4000);
        }
    }

    render()
    {
        this.currentBackground = '' + appState.currentBackground;

        return (
            <div>
                <div id="background" className="background" style={this.styleOne}></div>
                <div id="background-fade" className={this.cssClass} style={this.styleTwo}></div>
            </div>
        );
    }
}
