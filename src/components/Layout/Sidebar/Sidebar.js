import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaInbox, FaCalendarDay, FaCalendarAlt, FaCalendarCheck } from 'react-icons/fa';
const Sidebar = ({ hide }) => {
  return (
    <div className={`${hide ? '-translate-x-80 ' : 'translate-x-0'} w-80 transition transform duration-300 bg-gray-50 min-h-screen fixed left-0 top-0 pt-16 text-gray-600`}>
      <NavLink to='/inbox' className='pl-12 flex items-center py-3 outline-none cursor-pointer hover:bg-white' activeClassName='font-semibold text-black bg-white'>
        <FaInbox className='text-blue-600 text-xl ol-2' />
        <span className='ml-2 text-sm'>Inbox</span>
      </NavLink>

      <NavLink to='/today' className='pl-12 flex items-center py-3 outline-none cursor-pointer hover:bg-white' activeClassName='font-semibold text-black bg-white'>
        <FaCalendarDay className='text-green-600 text-xl' />
        <span className='ml-2 text-sm'>Today</span>
      </NavLink>

      <NavLink to='/next' className='pl-12 flex items-center py-3 outline-none cursor-pointer hover:bg-white' activeClassName='font-semibold text-black bg-white'>
        <FaCalendarAlt className='text-purple-600 text-xl' />
        <span className='ml-2 text-sm'>Next 7 days</span>
      </NavLink>

      <NavLink to='/archived' className='pl-12 flex items-center py-3 outline-none cursor-pointer hover:bg-white' activeClassName='font-semibold text-black bg-white'>
        <FaCalendarCheck className='text-red-550 text-xl' />
        <span className='ml-2 text-sm'>Archived</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
