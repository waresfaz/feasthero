import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { getAllClasses } from '../../../services/classes/actions';

import OrderProgressBar from '../../../components/order-progress/order-progress-bar';
import Loader from '../../../components/loader/loader';
import ClassSummary from './components/class-summary/class-summary';
import BookingDetails from './containers/booking-details/booking-details';
import BookingSummary from './containers/booking-summary/booking-summary';

import './book-class.scss';

class BookClass extends React.Component {
  constructor() {
    super();
    this.state = {
      classData: null,
    }
  }

  componentDidMount() {
    if (!this.props.allClasses) {
      this.props.getAllClasses();
    } else {
      this.setState({ classData: this.initClassData(this.props) });
    }
  }

  // I might have to refactor the wasy class data is being retrieved if there are lots of classes
  // right now it works well retrieving all of the classes then filtering based on the id url parameter
  // it would more efficient to use sessions if there are lots of classes
  initClassData = (props) => {
    return props.allClasses.find(class_ => class_._id === props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    const hasChanged = this.props.allClasses !== prevProps.allClasses
    if (hasChanged) {
      this.setState({
        classData: this.initClassData(this.props)
      })
    }
  }

  render() {
    let { classData } = this.state;

    return (
      <>
        {
          classData !== null
            ?
            classData === false
              ?
              <p className='error'>Error loading class</p>
              :
              <>
                <OrderProgressBar bookingDetails />
                <ClassSummary classData={classData} chef={classData.chefs[0]} />
                <Row className='justify-content-center' id='booking-container'>
                  <Col lg={5}>
                    <BookingDetails classData={classData} />
                  </Col>
                  <Col lg={5}>
                    <BookingSummary classData={classData} />
                  </Col>
                </Row>
              </>
            :
            <Loader show={this.state.classData === null} />
        }


      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allClasses: state.classes.allClasses,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllClasses: () => dispatch(getAllClasses()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookClass);;