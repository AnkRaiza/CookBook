import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import {LoadingDots} from './LoadingDots';
import styles from '../../styles/styles.css';

export const Header = ({loading}) => {
    return (
        <nav className={styles.background_color}>
            <div className="nav-wrapper">
                <a href="#" className="brand-logo">Rey Castañeda</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                    <li><Link to="/recipes" activeClassName="active">Recipes</Link></li>
                    <li><Link to="/about" activeClassName="active">About</Link></li>
                    {loading && <LoadingDots interval={100} dots={20}/>}
                </ul>
            </div>
        </nav>
    );
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}
