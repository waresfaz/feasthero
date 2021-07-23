import React from 'react';

import './order-progress-circle.scss';

class OrderProgressCircle extends React.Component {
    render() {
        return (
            <div>
                <div className={`circle ${this.props.active ? 'active' : 'inactive'}`}>
                    <span>{this.props.number}</span>
                </div>
                <p className='text-center'>{this.props.step}</p>
            </div>
        )
    }
}

export default OrderProgressCircle