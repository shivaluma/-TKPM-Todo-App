import React, { memo } from 'react';
import moment from 'moment';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const TaskDate = ({ taskDate, setTaskDate, showTaskDate, setShowTaskDate }) =>
  showTaskDate && (
    <div className='flex-col absolute border rounded-md right-0 outline-none bg-white' style={{ top: '101%' }}>
      <ul>
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format('DD/MM/YYYY'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format('DD/MM/YYYY'));
            }}
            tabIndex={0}
            aria-label='Select today as the task date'
            role='button'
          >
            <div className='flex items-center hover:bg-gray-200 py-2 pl-2'>
              <FaSpaceShuttle className='inline text-green-500 text-lg' />
              <span className='ml-3 text-sm text-gray-700 font-semibold'>Today</span>
            </div>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
            }}
            role='button'
            tabIndex={0}
            aria-label='Select tomorrow as the task date'
          >
            <div className='flex items-center  hover:bg-gray-200 py-2 pl-2'>
              <FaSun className='inline text-orange-500 text-lg' />
              <span className='ml-3 text-sm text-gray-700 font-semibold'>Tomorrow</span>
            </div>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
            }}
            onKeyDown={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
            }}
            aria-label='Select next week as the task date'
            tabIndex={0}
            role='button'
          >
            <div className='flex items-center hover:bg-gray-200 py-2 pl-2'>
              <FaRegPaperPlane className='inline text-orange-500 text-lg' />
              <span className='ml-3 text-sm text-gray-700 font-semibold'>Next Week</span>
            </div>
          </div>
        </li>
      </ul>
      {/* <DatePicker
        dateFormat='DD/MM/YYYY'
        className='bg-white'
        minDate={moment().toDate()}
        selected={moment(taskDate, 'DD/MM/YYYY').toDate()}
        onChange={(date) => {
          setTaskDate(moment(date).format('DD/MM/YYYY'));
        }}
        inline
      /> */}
      <DayPicker
        disabledDays={[{ before: moment().toDate() }]}
        selectedDays={moment(taskDate, 'DD/MM/YYYY').toDate()}
        onDayClick={(day, { selected }) => {
          setTaskDate(moment(day).format('DD/MM/YYYY'));
          setShowTaskDate(false);
        }}
      />
    </div>
  );

export default memo(TaskDate);
