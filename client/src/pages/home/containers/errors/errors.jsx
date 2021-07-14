import React from 'react';

import { connect } from 'react-redux';

class Errors extends React.Component {
    render() {
        console.log(this.props.errors)
        return (
            <>
                {
                    this.props.errors
                        ?
                        <h4 className='text-danger text-center'>{this.props.errors}</h4>
                        :
                        <></>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.feastHero.error
    }
}

export default connect(mapStateToProps)(Errors);