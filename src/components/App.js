// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import {Header} from './common/Header';
import {connect} from 'react-redux';
import materializecss from 'materialize-css';
import styles from '../styles/styles.css'; //Webpack can import CSS files

class App extends React.Component {
    render() {
        return (
            <div className={styles.app + ' ' + "container-fluid"} >
                <Header
                    loading={this.props.loading}
                    />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps)(App);
