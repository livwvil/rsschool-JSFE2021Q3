import { Link } from 'react-router-dom';

import React from 'react';

// import styles from './Welcome.scss';

export const Welcome = (): JSX.Element => (
  <React.Fragment>
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/toys">Toys</Link>
          </li>
          <li>
            <Link to="/tree">Tree</Link>
          </li>
          <li>
            <Link to="/img">Img</Link>
          </li>
        </ul>
      </nav>
      <h1>Header</h1>
    </header>
    <main>
      <h1>Main</h1>
    </main>
    <footer>
      <h1>Footer</h1>
    </footer>
  </React.Fragment>
);
