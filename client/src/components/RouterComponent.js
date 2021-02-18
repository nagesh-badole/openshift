import React from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Loading } from 'carbon-components-react';
import Stack from './Forms/Stack'
import Document from './Forms/Document'
import Contribution from './Forms/Contribution/Contribution'
import Tutorial from './Forms/Tutorial'
import CatalogDetails from './Forms/Contribution/CatalogDetails/CatalogDetails'

export default function RouterComponent(props) {

  const loaderProps = {
    active: true,
    withOverlay: true,
    small: false,
    description: 'Loader',
    className: 'loader'
  };

  const { setTitle } = props
  return <React.Suspense fallback={<Loading {...loaderProps} />}>
    <Router basename={process.env.REACT_APP_BASENAME}>
      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/contribute" />
        )} />
        <Route exact path='/stack' render={(props) => {
          return (<Stack {...props} />)
        }}/>

        <Route exact path='/catalogdetails' render={(props) => {
          return (<CatalogDetails {...props} />)
        }}      
        />
        <Route exact path='/contribute' render={(props) => {
          return (<Contribution {...props} />)
        }}
       
        />
         <Route exact path='/document' render={(props) => {
          return (<Document {...props} />)
        }}
        />
        <Route exact path='/tutorial' render={(props) => {
          return (<Tutorial {...props} />)
        }}
        />
      </Switch>
    </Router>
  </React.Suspense>
}