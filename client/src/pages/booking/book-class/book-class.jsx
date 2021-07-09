import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { fetchClass } from '../../../services/classes/api';
import ClassDateTime from '../../../services/schedule/models/class-date-time';

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
      classData: null
    }
  }

  async componentDidMount() {
    let classData = null;

    if (!this.props.allClasses) {
      classData = await fetchClass(this.props.match.params.id)
    } else {
      classData = this.props.allClasses.find(class_ => class_.id === this.props.match.params.id)
    }

    classData.schedule = classData.schedule.map(dateTime => ClassDateTime.fromJson(dateTime))

    this.setState({
      classData: classData
    })
  }

  async loadClass() {
    return await fetchClass(this.props.match.params.id);
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

export default connect(mapStateToProps)(BookClass);;