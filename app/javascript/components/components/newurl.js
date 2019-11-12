import React, { Component } from 'react';
import {Grid, Cell, DataTable, TableHeader, Textfield, Button} from 'react-mdl';
import Notiflix from "notiflix-react";

class NewUrl extends Component {

    constructor(props) {
       super(props)
        this.state = {
           inputNewURL: ''
        }
    }


    goToBack = (e) => {
        window.location.href = "/";
    }

    saveNewURL = (e) => {
        if (this.state.inputNewURL == "") {
            Swal.fire({
                icon: 'error',
                title: "Please, enter a URL.",
                text: 'This field is required',
            });
        } else {
            Notiflix.Loading.Dots('Saving URL...');
            setTimeout(() => {
                fetch('http://localhost:3000/api/v1/short_urls', {
                    method: 'POST',
                    body: JSON.stringify({full_url: this.state.inputNewURL}),
                    headers: {'Content-Type': 'application/json'}
                }).then(res => res.json())
                    .then(data => {
                        Notiflix.Loading.Remove();
                        if ( data['error'] == null) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Your New Shortened URL is: http://localhost:3000/short-code/' + data['short_code'],
                                text: 'New Shortened URL Saved!',
                            });
                            this.setState({ inputNewURL: '' })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: data['error'],
                                text: 'Oops... Something went wrong',
                            });
                        }
                    })
            },2000)
        }

    }

    componentDidMount() {
        Notiflix.Loading.Init({ svgColor: '#F0F8FF' });
    }

    render() {
        return(
            <div className="form-body body-color">
                <Grid className="form-grid">
                    <Cell col={12}>
                        <h3>New Shortened URL</h3>
                    </Cell>
                </Grid>
                <Grid className="form-grid">
                    <Cell col={12}>
                        <Textfield
                            label="Enter a Full URL, example: https://www.test.com"
                            floatingLabel
                            onChange={ e => this.setState({inputNewURL: e.target.value }) }
                            style={{width: '95%'}}
                            required={true}
                            value={this.state.inputNewURL}
                        />
                    </Cell>
                    <Cell col={12}>
                        <Grid>
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
                            <Cell col={6}>
                                <Button
                                    colored
                                    className="bg-primary"
                                    onClick={ this.saveNewURL }
                                    raised
                                    style={{width: '100%'}}
                                >
                                    Save URL
                                </Button>
                            </Cell>
                        </Grid>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default NewUrl;
