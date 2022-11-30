import { BrowserRouter as Router, Route } from 'react-router-dom';

import Call from './components/call';
import Home from './components/home';
import TransitionExample from './components/transitionExample';

const App = () => (
  <>
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/call">
        <Call />
      </Route>
      <Route path="/transition-example">
        <TransitionExample />
      </Route>
    </Router>
  </>
);

export default App;
