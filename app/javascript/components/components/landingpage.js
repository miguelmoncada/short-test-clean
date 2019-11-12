import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Notiflix from "notiflix-react";
import { createConsumer } from "@rails/actioncable"

const CustomHeader = (props) => (
    <div className={ "th text-center col-md-" + props.columns }>
        <p className="mt-3 mb-3 text-bold">{props.title}</p>
    </div>
);

const CustomContentCell = (props) => (
    <div className={"td text-center col-sm-12 col-md-6 col-lg-" + props.columns}>
        <p className="mt-2 mb-2 d-lg-none font-weight-bold">{props.title}</p>
        {props.children}
    </div>
);

const CustomCell = (props) => (
    <CustomContentCell
        columns={props.columns}
        title={props.title}
    >
        <p className={"mt-md-2 mb-md-2" + (props.textBold ? " text-bold" : "") }>{props.text}</p>
    </CustomContentCell>
);

const CustomSmallButton = (props) => (
    <button className="btn btn-sm btn-light" data-toggle="tooltip"
        title={props.tooltipTitle}
        onClick={ props.onClick}
    >
        {props.children}
    </button>
);

class Landing extends Component {

    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = { urls: [] }
        this._createSocket();
    }

    _createSocket = () => {
        let cable = createConsumer('http://localhost:3000/cable');
        this.urls = cable.subscriptions.create("UrlsListChannel", {
            connected: () => {},
            received: (data) => {
                if (this._isMounted) {
                    this.setState( { urls: data['urls']  });
                }
            },
        });

    }

    _fetchUrlsList = () => {
        fetch('http://localhost:3000/api/v1/short_urls.json')
            .then(res => res.json())
            .then(data => {
                this.setState( { urls: data['urls']  });
                Notiflix.Loading.Remove();
            })
    }

    openShortCode = (short_code) => {
        window.open( "http://localhost:3000/short-code/" + short_code, '_blank')
    }

    showInfoURL= (short_code) => {
        Swal.fire({
            icon: 'info',
            title: "Your new URL is: http://localhost:3000/short-code/" + short_code ,
            text: 'You can type this URL in the browser and see the result',
        });
    }

    componentDidMount() {
        Notiflix.Loading.Init({ svgColor: '#F0F8FF' });
        Notiflix.Loading.Dots('Loading URLs...');
        this._isMounted = true;
        this._fetchUrlsList()
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (JSON.stringify(this.state.urls) == JSON.stringify(nextState.urls)) {
            return false
        }
        return true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            <div className="home-body body-color">
                <Grid className="home-grid">
                    <Cell col={12}>
                        <h3>
                            100 Most Frequently URLs
                        </h3>
                    </Cell>
                </Grid>
                <Grid className="home-grid">
                    <Cell col={12}>
                        <div className="row d-none d-lg-flex text-bold">
                            <CustomHeader
                                columns="1"
                                title="POSITION"
                            />
                            <CustomHeader
                                columns="3"
                                title="TITLE"
                            />
                            <CustomHeader
                                columns="3"
                                title="URL"
                            />
                            <CustomHeader
                                columns="2"
                                title="CLICK COUNTER"
                            />
                            <CustomHeader
                                columns="2"
                                title="SHORT CODE"
                            />
                            <CustomHeader
                                columns="1"
                                title="ACTIONS"
                            />
                        </div>
                        {(this.state.urls).map( (url , index) => (
                            <div key={url.short_code}>
                                <div className="row mt-2">
                                    <CustomCell
                                        columns="1"
                                        text={index + 1}
                                        textBold={true}
                                        title="Position:"
                                    />
                                    <CustomCell
                                        columns="3"
                                        text={url.title}
                                        title="Title:"
                                    />
                                    <CustomCell
                                        columns="3"
                                        text={url.full_url}
                                        title="URL:"
                                    />
                                    <CustomCell
                                        columns="2"
                                        text={url.click_count}
                                        title="Click Counter:"
                                    />
                                    <CustomCell
                                        columns="2"
                                        text={url.short_code}
                                        title="Short Code:"
                                    />
                                    <CustomContentCell
                                        columns="1"
                                        title="Actions"
                                    >
                                        <div className="btn-group mt-2">
                                            <CustomSmallButton
                                                tooltipTitle="Open link"
                                                onClick={ () => this.openShortCode(url.short_code) }
                                            >
                                                <i className="fa fa-link"></i>
                                            </CustomSmallButton>
                                            <CustomSmallButton
                                                tooltipTitle="Show Info"
                                                onClick={ () => this.showInfoURL(url.short_code) }
                                            >
                                                <i className="fa fa-eye"></i>
                                            </CustomSmallButton>
                                        </div>
                                    </CustomContentCell>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </Cell>
                </Grid>
            </div>
        );
    }

}

export default Landing;
