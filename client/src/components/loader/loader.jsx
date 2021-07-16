import { Component } from 'react'
import { Spinner, Modal } from "react-bootstrap";
import PropTypes from 'prop-types';

import './loader.scss'

/**
 * a loader to display while waiting on an async code block
 * 
 * @since 2.0.0
 */
class Loader extends Component {
    static propTypes = {
        /**
         * whether or not to show the loader
         */
        show: PropTypes.bool,

        /**
         * loader color scheme
         * defaults to primary
         */
        variant: PropTypes.string
    }

    render() {
        return (
            <Modal onHide={() => { }} centered contentClassName='loading-modal' show={this.props.show}>
                <Spinner className='m-auto' variant={this.props.variant ? this.props.variant : 'primary'} animation="border" />
            </Modal>
        )
    }
}

export default Loader