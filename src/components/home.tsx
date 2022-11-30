import { Link } from 'react-router-dom';

import Anchor from './anchor';

const Home = () => (
  <div className="relative py-16 bg-white overflow-hidden">
    <div className="relative px-4 sm:px-6 lg:px-8">
      <div className="text-lg max-w-prose mx-auto">
        <h1>
          <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
            Suggesting
          </span>
          <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Potential video call layout for AustinShow
          </span>
        </h1>
        <p className="mt-8 text-xl text-gray-500 leading-8">
          This is a suggestion for a general video call layout for AustinShow.
          It is laid out with a header and footer that would include video call
          controls in the footer and a timer in the header. Between is a series
          of rectangular panels to represent different users.
        </p>
      </div>
      <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
        <h2>The problem</h2>
        <p>
          Austin has been using <a href="https://zoom.us/">Zoom</a> and{' '}
          <a href="https://whereby.com/user">Whereby</a> for his Battle Royale
          styled dating show. Austin likes to move users' panels around a lot to
          better organise his guests while they are making their claim not to be
          kicked. Both Zoom and Whereby have basic animation for the panel that
          is being focused but it can sometimes be difficult to follow what is
          happening with panels that are not focused. On top of this, at the end
          of each round there is a bottom 3 section, Austin likes to put the
          bottom 3 in the bottom row but that bottom row does not always allow
          for 3 panels so it can sometimes become easy to lose track of who is
          in the bottom three.
        </p>
        <h2>The solution</h2>
        <p>
          Animation has been added for transitions between max mode and standard
          mode. When panels are moved, other panels will animate towards their
          new positions. Holding Shift or Ctrl while clicking on 3 panels
          consecutively will move those three panels to the bottom and enlarge
          them along with the panel in index 0 which should theoretically be the
          host. An effort was made for the panel's to maintain a 16-9 aspect
          ratio. This is can be changed if necessary.
        </p>
      </div>
      <div className="mt-6 max-w-prose mx-auto">
        <Link to="/call" component={Anchor}>
          Go to App
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
