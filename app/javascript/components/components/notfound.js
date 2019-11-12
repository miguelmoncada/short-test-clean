import React, { Component } from 'react';
import {Grid, Cell, Button} from 'react-mdl';

class NotFound extends Component {


    goToBack = (e) => {
        window.location.href = "/";
    }


    render() {
        return(
            <div className="form-body body-color">
                <Grid className="form-grid">
                    <Cell col={12}>
                        <h3>404 - URL NOT FOUND</h3>
                        <p>The link is not registered.</p>
                    </Cell>
                </Grid>
                <Grid className="form-grid">
                    <Cell col={6}>
                        <Button
                            accent
                            className="bg-danger"
                            onClick={ this.goToBack }
                            raised
                            style={{width: '100%'}}
                        >
                            Back to home
                        </Button>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default NotFound;
