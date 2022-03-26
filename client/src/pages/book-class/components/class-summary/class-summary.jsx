import React from 'react';
import { Image } from 'react-bootstrap';
import { connect } from 'react-redux';

import truncateString from '../../../../helpers/truncate-string';

import './class-summary.scss';

class ClassSummary extends React.Component {
    constructor() {
        super();
        this.state = {
            truncated: true
        }
    }

    toggleTruncate = () => {
        this.setState(prevState => ({
            truncated: !prevState.truncated
        }))
    }

    render() {
        let { classData } = this.props;
        let { truncated } = this.state;

        return (
            <div id='class-summary'>
                <Image src={classData.chefs[0].profile.photo} />
                <h1>{classData.title}</h1>
                <p id='content'>
                    {
                        this.state.truncated
                        ? truncateString(classData.description, 90)
                        : classData.description
                    }
                </p>
                <p id='toggle-truncate' onClick={this.toggleTruncate}>
                    { truncated ? 'Learn More' : 'Less' }
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        classData: state.booking.classData
    }
}

export default connect(mapStateToProps, null)(ClassSummary);