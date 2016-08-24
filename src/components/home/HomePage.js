import React from 'react';
import {Link} from 'react-router';

export class HomePage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>COOK BOOK</h1>
                <p>React, Redux and React Router in ES6 Materialize css</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
            </div>
        );
    }
}