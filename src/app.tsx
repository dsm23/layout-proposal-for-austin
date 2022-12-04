import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Call = lazy(() => import('./components/call'));
const Home = lazy(() => import('./components/home'));
const TransitionExample = lazy(() => import('./components/transitionExample'));

const App = () => (
  <Router>
    <Routes>
      <Route
        index
        path="/"
        element={
          <Suspense fallback={<>...</>}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/call"
        element={
          <Suspense fallback={<>...</>}>
            <Call />
          </Suspense>
        }
      />
      <Route
        path="/transition-example"
        element={
          <Suspense fallback={<>...</>}>
            <TransitionExample />
          </Suspense>
        }
      />
    </Routes>
  </Router>
);

export default App;
