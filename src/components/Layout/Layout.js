import React, { useState } from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

const Layout = (props) => {
  const [hideSidebar, setHideSidebar] = useState(false);
  return (
    <div className='relative'>
      <Header set={() => setHideSidebar(!hideSidebar)} />
      <Sidebar hide={hideSidebar} />
      <div className={`flex ${hideSidebar ? 'ml-0' : 'ml-80'} transition-all duration-300 min-h-screen`}>
        <div className='pt-24 px-16 w-full mx-auto' style={{ maxWidth: '1000px' }}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
