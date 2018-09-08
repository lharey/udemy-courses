import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';
import classes from './Layout.css';

class Layout extends Component {
    state = {
        showSideDraw: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDraw: false
        });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDraw: !prevState.showSideDraw };
        });
    }

    render () {
        return (
            <Aux>
                <Toolbar
                    toggleSideDrawHandler={this.sideDrawerToggleHandler}/>
                <SideDraw
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDraw}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
