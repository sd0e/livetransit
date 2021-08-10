import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Buses from './pages/Buses';
import BusStops from './pages/BusStops';
import BusStop from './pages/BusStop';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/buses" exact>
                    <Buses />
                </Route>
                <Route path="/buses/stops" exact>
                    <BusStops />
                </Route>
                <Route path="/buses/stop" exact>
                    <BusStop />
                </Route>
                <Route path="/404" exact>
                    <PageNotFound />
                </Route>
                <Redirect to="/404" />
            </Switch>
        </Layout>
    );
}

export default App;