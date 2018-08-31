// An alternative method to the other WithClass.js
import React, {Component} from 'react';

// const withClass = (WrappedComponent, className) => {
//     return (props) => (
//         <div className={className}>
//             <WrappedComponent {...props} />
//         </div>
//     );
// };

// This one is when no references are involved

const withClass = (WrappedComponent, className) => {
    return class extends Component {
        render () {
            return (
                <div className={className}>
                    <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
                </div>
            );
        }
    };
};

// If what to allow for references

// const withClass = (WrappedComponent, className) => {
//     const WithClass = class extends Component {
//         render () {
//             return (
//                 <div className={className}>
//                     <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
//                 </div>
//             );
//         }
//     };

//     return React.forwardRef((props, ref) => {
//         return <WithClass {...props} forwardedRef={ref} />;
//     });
// };

export default withClass;
