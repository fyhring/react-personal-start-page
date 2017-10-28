import { observer } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';


@observer
export default class Notification extends React.Component
{
    // Set to false as default so the first rendering is a hidden rendering.
    state = { show: false };

    // Contains the notifications timer. Used so the timer can be cancelled.
    timer = null;


    /*
        When the component is mounted set the timers that'll make the notification
        visible and a second timer to make it disappear.
    */
    componentWillMount()
    {
        const { show, time } = this.props;

        // If the prop `show` is not set, set it to true.
        if (show === true || typeof show === typeof undefined) {
            
            // First timer which makes the component rerender in ~10 ms.
            setTimeout(() => {
                this.setState({ show: true});
            }, 10);

            // Second timer which makes the component rerender in `${time} * 1000` ms or 1500 ms.
            this.timer = setTimeout(() => {
                this.setState({ show: false });
            }, (time || 1.5) * 1000);
        }
    }


    // Triggered when user clicks on the close button.
    onClose = () => {
        this.setState({ show: false });
        clearTimeout(this.timer);
    }


    render()
    {
        const { message, sender, level, time, index } = this.props;

        // Note this notification has the class `shown` which makes this visible to the user.
        return (
            <div className={ this.state.show ? 'notification shown' : 'notification' } style={{ zIndex: 900 + index}}>
                {message}
                <span className="close" onClick={this.onClose}>&times;</span>
            </div>
        );
    }
}
