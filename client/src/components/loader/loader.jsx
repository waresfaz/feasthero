import { Component } from 'react'
import { Spinner, Modal } from "react-bootstrap";


import './loader.scss'

class Loader extends Component {
    render() {
        return (
            <Modal onHide={() => { }} centered contentClassName='loading-modal' show={this.props.show}>
                <Spinner className='m-auto' variant={this.props.variant ? this.props.variant : 'primary'} animation='grow' />
            </Modal>
        )
    }
}

export default Loader