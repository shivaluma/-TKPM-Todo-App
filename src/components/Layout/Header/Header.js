import React from 'react';
import { FaListUl, FaPlus } from 'react-icons/fa';
const Header = ({ set }) => (
  <div className='fixed top-0 left-0 w-full h-12 bg-red-600 flex items-center px-12 text-white z-50' style={{ backgroundColor: '#db4c3f' }}>
    <button className='p-2 rounded-md hover:bg-gray-800 focus:outline-none -ml-1' onClick={set}>
      <FaListUl />
    </button>
    <span className='ml-6 text-md font-semibold'>Todo</span>

    <button className='p-2 rounded-md hover:bg-gray-800 order-2 ml-auto focus:outline-none'>
      <FaPlus />
    </button>
  </div>
);

export default Header;
