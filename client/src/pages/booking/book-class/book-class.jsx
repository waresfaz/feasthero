import React from 'react';
import { connect } from 'react-redux';

import { fetchClass } from '../../../services/classes/api';

import OrderProgressBar from '../../../components/order-progress/progress-bar/order-progress-bar';
import Loader from '../../../components/loader/loader';

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

    this.setState({
      classData: classData
    })
  }

  async loadClass() {
    return await fetchClass(this.props.match.params.id);
  }

  render() {
    return (
      <>
        {
          this.state.classData !== null
            ?
            this.state.classData === false
              ?
              <p className='error'>Error loading class</p>
              :
              <>
                <OrderProgressBar bookingDetails />
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