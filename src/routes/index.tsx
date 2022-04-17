import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainLayoutWrapper from '../layouts/Main';
import Favorites from '../pages/Favorites';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <MainLayoutWrapper exact path="/" component={Home} />
      <MainLayoutWrapper exact path="/Favorites" component={Favorites} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
