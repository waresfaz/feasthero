import React from 'react';
import PropTypes from 'prop-types';

import './title.scss'

/**
 * generic title component with premade breakpoints.
 * 
 * @since 2.0.0
 */
class Title extends React.Component {
    static propTypes = {
        /**
         * sass classes to apply
         */
        className: PropTypes.string,
    }

    render() {
        const { className, ...props } = this.props;
        return (
            <h2 className={`title ${className}`} {...props}>
                {this.props.children}
            </h2>
        )
    }
}

export default Title;