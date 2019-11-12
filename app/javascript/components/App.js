import React from 'react';
import './App.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Content, Drawer, Header, Layout, Navigation} from "react-mdl";
import { Link } from "react-router-dom";
import { BrowserRouter} from "react-router-dom";
import Main from './components/Main';

class App extends React.Component {

    render() {
        return(
            <BrowserRouter>
                <div className="demo-big-content">
                    <Layout>
                        <Header className="header-color" title={<Link style={{textDecoration: 'none', color: 'white'}} to="/">URL SHORTENER</Link>} scroll>
                            <Navigation>
                                <Link className="custom-link-tag" to="/">Home</Link>
                                <Link className="custom-link-tag" to="/new-url">New URL</Link>
                            </Navigation>
                        </Header>
                        <Drawer title={<Link style={{textDecoration: 'none', color: 'black'}} to="/">URL SHORTENER</Link>}>
                            <Navigation>
                                <Link className="custom-link-tag" to="/">Home</Link>
                                <Link className="custom-link-tag" to="/new-url">New URL</Link>
                            </Navigation>
                        </Drawer>
                        <Content>
                            <div className="page-content" />
                            <Main/>
                        </Content>
                    </Layout>
                </div>
            </BrowserRouter>
        );

    }
}

export default App;
