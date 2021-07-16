import React from 'react';

import Loader from '../../components/loader/loader';

/**
 * @summary ensure that an http request succeeds.
 * @description in order for devs to not have to worry about error handling logic
 * and edge casses, they can wrap a component with this hoc. A function that performs a request
 * will also be passed. This hoc will run that function and perform all the error handling then 
 * pass in the result to the wrapped component as a prop. If the passed function fails, an error
 * will be passed as a prop.
 * 
 * @param {React.Component} WrappedComponent - component this hoc will render
 * @param {Function} requestFn - function that will be run and handled
 * @param {String} responsePropName - name of result prop passed to wrapped component
 * @param {String} ...urlParams - if url params are needed for the function, pass them in
 * 
 * @returns {React.Component} - component that renders the wrapped component
 */
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