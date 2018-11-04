import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from './Welcome';
import SurveyContainer from './SurveyContainer';
import ResponseContainer from './ResponseContainer';

const ServiceRouter = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route path='/surveys' component={SurveyContainer} />
        <Route path='/responses' component={ResponseContainer} />
      </Switch>
    </BrowserRouter>
  </div>
)

export default ServiceRouter;
