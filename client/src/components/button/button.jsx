import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import PropTypes from 'prop-types';

import './button.scss'

/**
 * A generic FeastHero button.
 * 
 * @since 2.0.0
 */
class Button extends React.Component {
    static propTypes = {
        /**
         * should render a button instead of link
         */
        isButton: PropTypes.bool,

        /**
         * should use the primary color scheme
         * default color scheme is primary
         */
        primary: PropTypes.bool,

        /**
         * should use the secondary color scheme
         */
        secondary: PropTypes.bool,

        /**
         * sass classes to apply
         */
        className: PropTypes.string
    }

    render() {
        const { isButton, primary, secondary, className, ...props } = this.props;
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