import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Layout(): ReactElement {
  return (
    <>
      <div data-testid="layout">
        <Navbar />
        <div className="container mx-auto px-5 py-9">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
