import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import './button.scss'

class Button extends React.Component {
    render() {
        const {isButton, primary, secondary, ...props} = this.props;
        return (
            <>
                {
                    isButton
                        ?
                        <button className={this.props.secondary ? 'button-secondary' : 'button-primary'} {...props}>
                            {this.props.children}
                        </button>
                        :
                        <Link smooth className={this.props.secondary ? 'button-secondary' : 'button-primary'} {...props}>
                            {this.props.children}
                        </Link>
                }

            </>

        )
    }
}

export default Button;