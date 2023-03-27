import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

function Layout(): ReactElement {
  return (
    <>
      <div data-testid="layout">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
