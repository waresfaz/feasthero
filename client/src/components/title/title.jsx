import React from 'react';

import './title.scss'


class Title extends React.Component {

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