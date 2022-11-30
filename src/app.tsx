import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Call from './components/call';
import Home from './components/home';
import TransitionExample from './components/transitionExample';

const App = () => (
  <Router>
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/call" element={<Call />} />
      <Route path="/transition-example" element={<TransitionExample />} />
    </Routes>
  </Router>
);

export default App;
