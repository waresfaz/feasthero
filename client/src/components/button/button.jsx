import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import './button.scss'

class Button extends React.Component {
    render() {
        const {isButton, primary, secondary, className, ...props} = this.props;
        const buttonClasses = this.props.secondary ? `button-secondary ${className}` : `button-primary ${className}`
        return (
            <>
                {
                    isButton
                        ?
                        <button className={buttonClasses} {...props}>
                            {this.props.children}
                        </button>
                        :
                        <Link smooth className={buttonClasses} {...props}>
                            {this.props.children}
                        </Link>
                }

            </>

        )
    }
}

export default Button;