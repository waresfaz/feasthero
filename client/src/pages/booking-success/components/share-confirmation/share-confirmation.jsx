import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import Button from '../../../../components/button/button';
import Loader from '../../../../components/loader/loader';

import valsFromRefs from '../../../../helpers/values-from-refs';
import { sendConfirmations } from '../../../../services/booking-success/actions';

import './share-confirmation.scss';

class ShareConfirmation extends React.Component {
    constructor() {
        super();
        const firstInput = React.createRef();
        this.state = {
            inputs: [firstInput],
            loading: false,
        }
    }

    appendInput = () => {
        const ref = React.createRef();
        this.setState(prevState => ({
            inputs: [...prevState.inputs, ref]
        }))
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();
        this.setState({ loading: true });

        const refs = this.state.inputs;
        const emails = valsFromRefs(refs);
        console.log(emails);
        await this.props.sendConfirmations(emails);

        this.setState({ loading: false });
    }

    render() {
        const { inputs, loading } = this.state;
        let didSend;

        if (this.props.confirmationsDidSend === false)
            didSend =  <p className='text-danger text-center mb-0'>Failed to send</p>
        else if (this.props.confirmationsDidSend === true)
            didSend = <p className='text-success text-center mb-0'>Sent</p>
        else
            didSend = <></>


        return (
            <section id='share-confirmation'>
                <Loader show={loading} />
                <form onSubmit={this.handleSubmit}>
                    {
                        inputs.map((ref, i) => {
                            return (
                                <Row>
                                    <Col md={11}>
                                        <Form.Control required placeholder='Email Address' type='email' ref={ref} />
                                    </Col>
                                    {i === 0 ?
                                        <Col md={11} lg={1}>
                                            <FontAwesomeIcon size={'2x'} style={{ color: '#FA7580' }} onClick={this.appendInput} icon={faPlus} />
                                        </Col>
                                        : <></>
                                    }
                                </Row>
                            )
                        })
                    }
                    {didSend}
                    <Row className='justify-content-center'>
                        <Col lg={4}>
                            <Button isButton={true} secondary={true}>Send Confirmation</Button>
                        </Col>
                    </Row>
                </form>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        confirmationsDidSend: state.bookingSuccess.confirmationsDidSend
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendConfirmations: (emails) => dispatch(sendConfirmations(emails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareConfirmation);