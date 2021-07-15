import React from 'react';

import Loader from '../../components/loader/loader';

const HttpRequestDidSucceed = (WrappedComponent, requestFn, responsePropName, ...urlParams) => {
    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                requestResponse: null,
                error: null,
            }
        }

        async componentDidMount() {
            let filteredUrlParams = [];
            urlParams.map(param => {
                if (this.props.match.params[param])
                    return filteredUrlParams.push(this.props.match.params[param]);
                return null;
            })

            const response = await requestFn(...filteredUrlParams);
            if (response.error) {
                this.setState({
                    error: true,
                });
                return;
            }

            this.setState({
                requestResponse: response,
            });
        }

        render() {
            const { requestResponse, error } = this.state;
            const dynamicProp = { [responsePropName]: requestResponse };
            return (
                requestResponse === null && !error
                    ?
                    <Loader show={requestResponse === null && !error} />
                    :
                    <WrappedComponent {...dynamicProp} error={error} />
            )
        }
    }
}


export default HttpRequestDidSucceed;