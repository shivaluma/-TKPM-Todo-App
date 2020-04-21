import React, { useState, useEffect } from 'react';
import { useTasks } from '../hooks';
import Checkbox from './Checkbox';
import moment from 'moment';
import { FaPlusCircle, FaPlus } from 'react-icons/fa';
import TaskDate from './TaskDate';
import { firebase } from '../firebase';
const Tasks = (props) => {
  const category = props.location.pathname.substr(1);
  const { tasks, archivedTasks } = useTasks(category);
  const [task, setTask] = useState('');
  const [changed, setChanged] = useState(false);
  const currentTask = category === 'archived' ? archivedTasks : tasks;
  const [addTaskClicked, setTaskClicked] = useState(false);
  const [taskDate, setTaskDate] = useState(moment().format('DD/MM/YYYY'));
  const [showTaskDate, setShowTaskDate] = useState(false);

  useEffect(() => {
    setTaskClicked(false);
    setShowTaskDate(false);
  }, [category]);

  const addTaskClickHandler = () => {
    setTaskClicked(true);
  };

  const cancelClickHandler = () => {
    setTaskClicked(false);
  };

  const toggleTaskDate = () => {
    setShowTaskDate(!showTaskDate);
  };

  const addTask = (event) => {
    event.preventDefault();
    task &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          description: task,
          date: taskDate,
          userId: localStorage.getItem('shiroTodoIDKey'),
        })
        .then(() => {
          setTask('');
        });
  };

  return (
    <div className='w-full bg-white'>
      <div className='text-xl font-semibold capitalize li'>{category}</div>
      <ul className='list-none'>
        {currentTask.map((task) => (
          <li key={task.id} className='my-2 flex items-center border-b pb-2'>
            <Checkbox id={task.id} taskDesc={task.description} />
            <div className='flex flex-col'>
              <span className='ml-3 text-sm'>{task.description}</span>
              <span className='ml-3 text-xs text-gray-600'>
                {moment(task.date, 'DD/MM/YYYY').calendar(null, {
                  lastDay: '[Yesterday]',
                  sameDay: '[Today]',
                  nextDay: '[Tomorrow]',
                  lastWeek: '[last] dddd',
                  nextWeek: 'dddd',
                  sameElse: 'L',
                })}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {addTaskClicked ? (
        <form className='mt-2' onSubmit={addTask}>
          <div className='flex flex-shrink-0'>
            <input
              value={task}
              onChange={(e) => {
                setChanged(true);
                setTask(e.target.value);
              }}
              className='p-3 w-full border-t border-l border-b font-light text-sm outline-none rounded-l-md'
              placeholder='e.g. Add submission to Software Designer Course...'
            />

            <div className='relative'>
              <div className='p-3 w-32 border rounded-r-md text-gray-700 text-sm relative outline-none cursor-pointer' onClick={toggleTaskDate} tabIndex={0}>
                <span>{taskDate}</span>
              </div>
              <TaskDate taskDate={taskDate} setTaskDate={setTaskDate} showTaskDate={showTaskDate} setShowTaskDate={setShowTaskDate} />
            </div>
          </div>

          <button className='mt-2 rounded-md text-xs px-4 py-2 bg-red-550 font-semibold text-white disabled:bg-red-300 disabled:cursor-not-allowed' disabled={task.trim().length === 0}>
            Add task
          </button>
          <div className='inline text-sm ml-3 text-gray-700 outline-none cursor-pointer hover:underline' onClick={cancelClickHandler} tabIndex={0}>
            Cancel
          </div>
        </form>
      ) : (
        <div className='flex mt-2 items-center text-gray-600 hover:text-red-600 group cursor-pointer outline-none' onClick={addTaskClickHandler} tabIndex={0}>
          <FaPlus className='group-hover:hidden text-red-600' />
          <FaPlusCircle className='group-hover:block hidden' /> <span className='text-sm ml-3 font-light'>Add task</span>
        </div>
      )}

      {!addTaskClicked && currentTask && currentTask.length === 0 && (
        <div className='md:w-72 w-40 h-full mx-auto mt-16 text-center'>
          <svg
            data-svgs-path='theme_todoist/inbox_zero.svg'
            viewBox='0 0 220 200'
            xmlns='http://www.w3.org/2000/svg'
            fillRule='evenodd'
            clipRule='evenodd'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='1.5'
          >
            <g transform='translate(-2050)'>
              <g id='InboxZero'>
                <path fill='none' d='M1800-100h300v300h-300z' transform='matrix(.73333 0 0 .66667 730 66.667)'></path>
                <path
                  d='M17729 1379.65h-44c-5.4.09-10.5-2.09-14.2-6.01-3.7-3.92-5.6-9.21-5.2-14.58.4-4.57.8-9.2 1.1-13.07.4-6.32-.3-12.68-2.1-18.74-6.3-20.5.2-42.79 16.5-56.7.1-.09.2-.18.3-.26 20.4-17.43 48.6-22.61 73.9-13.61 10.7 3.87 21.7 6.1 32.9 6 17.8-.19 34.6 8.57 44.7 23.34 2.2 3.14 4.3 6.33 6.4 9.4 9.1 13.32 10.2 30.51 3 44.93-2.2 4.37-3.3 9.2-3.3 14.08v4.56c0 5.31-2.1 10.41-5.9 14.16-3.7 3.75-8.8 5.86-14.1 5.86-4-.01-7-.01-7-.01l-83 .65z'
                  fill='#f9e4e2'
                  transform='translate(-16671.478 -1287.763) scale(1.06068)'
                ></path>
                <path
                  d='M18900 1167.23c0-3.99-1.3-7.23-2.9-7.23h-34.2c-1.6 0-2.9 3.24-2.9 7.23 0 4 1.3 7.24 2.9 7.24h34.2c1.6 0 2.9-3.24 2.9-7.24z'
                  fill='#fff'
                  transform='matrix(.93816 0 0 .38164 -15623.476 -343.635)'
                ></path>
                <path
                  d='M18900 1167.23c0-3.99-1.3-7.23-2.9-7.23h-34.2c-1.6 0-2.9 3.24-2.9 7.23 0 4 1.3 7.24 2.9 7.24h34.2c1.6 0 2.9-3.24 2.9-7.24z'
                  fill='#fff'
                  transform='matrix(.95594 0 0 .38164 -15915.877 -343.635)'
                ></path>
                <path
                  d='M18900 1167.23c0-3.99-1.3-7.23-2.9-7.23h-34.2c-1.6 0-2.9 3.24-2.9 7.23 0 4 1.3 7.24 2.9 7.24h34.2c1.6 0 2.9-3.24 2.9-7.24z'
                  fill='#fff'
                  transform='matrix(-.95594 0 0 .38164 20274.403 -343.635)'
                ></path>
                <path
                  d='M18900 1167.23c0-3.99-4.5-7.23-10-7.23h-20c-5.5 0-10 3.24-10 7.23 0 4 4.5 7.24 10 7.24h20c5.5 0 10-3.24 10-7.24z'
                  fill='#fff'
                  transform='matrix(-.275 0 0 .38164 7387.045 -343.635)'
                ></path>
                <path
                  d='M18900 1167.23c0-3.99-1.7-7.23-3.7-7.23h-32.6c-2 0-3.7 3.24-3.7 7.23 0 4 1.7 7.24 3.7 7.24h32.6c2 0 3.7-3.24 3.7-7.24z'
                  fill='#fff'
                  transform='matrix(-1.23972 0 0 .6399 25512.315 -656.877)'
                ></path>
                <path
                  d='M18900 1167.23c0-3.99-1.3-7.23-2.8-7.23h-34.4c-1.5 0-2.8 3.24-2.8 7.23 0 4 1.3 7.24 2.8 7.24h34.4c1.5 0 2.8-3.24 2.8-7.24z'
                  fill='#fff'
                  transform='matrix(1.64828 0 0 .64036 -29000.906 -657.425)'
                ></path>
                <ellipse cx='15804.9' cy='618.475' rx='10.066' ry='7.745' fill='#fff' transform='matrix(-1.56686 0 0 1.87728 26893.318 -1080.936)'></ellipse>
                <path d='M15804.9 610.729c5.6 0 10.1 3.471 10.1 7.746h-20.2c0-4.275 4.6-7.746 10.1-7.746z' fill='#fff' transform='matrix(-3.22859 0 0 4.12745 53186.476 -2458.803)'></path>
                <ellipse cx='15804.9' cy='618.475' rx='10.066' ry='7.745' fill='#fff' transform='matrix(-1.05711 0 0 1.29581 18813.8 -716.811)'></ellipse>
                <path
                  d='M557.517 1647.1c.945.15 1.164 1.74-.1 1.81H528.5c-.987-.06-1.34-1.74 0-1.82h28.917c.033.01.066.01.1.01z'
                  fill='#fff'
                  fillRule='nonzero'
                  transform='matrix(1.0842 0 0 1.1043 1497.112 -1700.933)'
                ></path>
                <path
                  d='M567.467 1647.11c.675.2.699 1.72-.101 1.8H528.5c-.731-.08-.908-1.72 0-1.82h38.866c.034.01.067.01.101.02z'
                  fill='#fff'
                  fillRule='nonzero'
                  transform='matrix(1.47851 0 0 1.1043 1402.612 -1700.933)'
                ></path>
                <path
                  d='M567.679 1647.1c6.563.06 7.462 1.73 0 1.8-19.746.07-42.15.56-45.235-.58-1.444-.53 1.501-1.18 5.743-1.22 13.161-.05 26.332-.05 39.492 0z'
                  fill='#fff'
                  fillRule='nonzero'
                  transform='matrix(.15438 0 0 1.1043 2145.873 -1695.283)'
                ></path>
                <path
                  d='M557.466 1647.12c.204.29.237 1.65-.049 1.79H528.5c-.236-.11-.281-1.68 0-1.82h28.917l.049.03z'
                  fill='#fff'
                  fillRule='nonzero'
                  transform='matrix(4.55063 0 0 1.1043 -314.136 -1695.413)'
                ></path>
                <path
                  d='M557.521 1647.1c.988.15 1.216 1.74-.104 1.81H528.5c-1.03-.06-1.4-1.74 0-1.82h28.917c.035.01.069.01.104.01z'
                  fill='#fff'
                  fillRule='nonzero'
                  transform='matrix(1.0381 0 0 1.1043 1557.822 -1700.933)'
                ></path>
                <path
                  d='M18900 1167.23c0-3.99-1.1-7.23-2.5-7.23h-35c-1.4 0-2.5 3.24-2.5 7.23 0 4 1.1 7.24 2.5 7.24h35c1.4 0 2.5-3.24 2.5-7.24z'
                  fill='#fff'
                  transform='matrix(-.87871 0 0 .30532 18707 -244.949)'
                ></path>
                <path
                  d='M18900 1167.23c0-3.99-4-7.23-8.8-7.23h-22.4c-4.8 0-8.8 3.24-8.8 7.23 0 4 4 7.24 8.8 7.24h22.4c4.8 0 8.8-3.24 8.8-7.24z'
                  fill='#fff'
                  transform='matrix(-.25 0 0 .30532 6948.474 -244.949)'
                ></path>
                <path
                  d='M18900 1167.23c0-3.99-4.4-7.23-9.8-7.23h-20.4c-5.4 0-9.8 3.24-9.8 7.23 0 4 4.4 7.24 9.8 7.24h20.4c5.4 0 9.8-3.24 9.8-7.24z'
                  fill='#fff'
                  transform='matrix(-.22534 0 0 .30532 6342.523 -244.949)'
                ></path>
                <path
                  d='M18900 1167.23c0-3.99-1.2-7.23-2.6-7.23h-34.8c-1.4 0-2.6 3.24-2.6 7.23 0 4 1.2 7.24 2.6 7.24h34.8c1.4 0 2.6-3.24 2.6-7.24z'
                  fill='#fff'
                  transform='matrix(-.8366 0 0 .30532 17995.698 -244.949)'
                ></path>
                <path
                  d='M18900 1167.23c0-3.99-1.4-7.23-3.1-7.23h-33.8c-1.7 0-3.1 3.24-3.1 7.23 0 4 1.4 7.24 3.1 7.24h33.8c1.7 0 3.1-3.24 3.1-7.24z'
                  fill='#fff'
                  transform='matrix(1.47695 0 0 .64036 -25678.298 -657.975)'
                ></path>
                <ellipse cx='15804.9' cy='618.475' rx='10.066' ry='7.745' fill='#fff' transform='matrix(-.9839 0 0 1.17171 17762.098 -639.646)'></ellipse>
                <ellipse cx='15804.9' cy='618.475' rx='10.066' ry='7.745' fill='#fff' transform='matrix(-1.45701 -.02353 -.0262 1.6223 25234.314 -550.184)'></ellipse>
                <path
                  d='M17676 1377.76c.6-2.58 2.7-4.62 5.4-5.07.5-.08.9-.16 1.4-.23 2.1-.35 3.7-1.95 4.1-4.03.1-.63.3-1.31.4-2 .8-4.04 3.9-7.19 8-7.92 3.4-.62 5.7-3.75 5.3-7.18-.1-1.23-.3-2.57-.4-3.91-.7-6.56 2.6-12.91 8.3-16.09 2.2-1.21 4.5-2.48 6.6-3.62 4.5-2.45 7.6-6.72 8.7-11.69 1-4.47 2.2-10.28 3.4-15.88 2.4-11.07 12.4-18.86 23.7-18.51.4.01.8.02 1.2.04 10.1.31 18.8 7.01 21.7 16.65 1.4 4.59 2.9 9.42 4.1 13.38 1.6 5.44 5.9 9.72 11.3 11.45 5.5 1.8 9.3 6.99 9.3 12.85v7.88c0 3.29 2 6.27 5 7.57 1.3.56 2.7 1.17 4.1 1.77 4.3 1.81 6.9 6.13 6.5 10.72-.1.81-.2 1.6-.2 2.34-.2 2.29 1.1 4.42 3.3 5.23l1.2.45c2.7 1 4.4 3.54 4.4 6.37v.3c-1.2.25-2.5.38-3.8.38-4-.01-7-.01-7-.01l-4.4.03c-23.2-1.03-84.4-3.15-123.3.6-2.9-.04-5.7-.68-8.3-1.87z'
                  fill='#eca19a'
                  transform='translate(-16671.478 -1287.763) scale(1.06068)'
                ></path>
                <path
                  d='M2489.24 2404.58c.97.17.35 1.12-.12 1.46-2.89 2.16-5.18 6.74-5.19 12.43 0 0-.03.46-.23.61-.59.48-.63-2.37-.12-4.88.87-4.38 2.98-7.84 5.49-9.58 0 0 .08-.04.17-.04z'
                  fill='#da4c3f'
                  fillRule='nonzero'
                  transform='matrix(2.5787 0 0 1.48837 -4272.15 -3505.654)'
                ></path>
                <g transform='translate(-16668.478 -1287.763) scale(1.06068)'>
                  <path d='M17680 1379.75c.2.79 48.9-4.14 59.7-42.02 0 0 6.3.68 11.6-7.09v2.5c.6 23.29 18.5 42.47 41.7 44.61 8 .74 14 1.29 14 1.29-38.7 12.9-83.9 15.27-127 .71z' fill='#fff'></path>
                  <clipPath id='_clip1'>
                    <path d='M17680 1379.75c.2.79 48.9-4.14 59.7-42.02 0 0 6.3.68 11.6-7.09v2.5c.6 23.29 18.5 42.47 41.7 44.61 8 .74 14 1.29 14 1.29-38.7 12.9-83.9 15.27-127 .71z'></path>
                  </clipPath>
                  <g clipPath='url(#_clip1)'>
                    <path
                      d='M2469.83 2472.34c1.01.26 5.68 4.51 9.73 6.39 11.98 5.55 24.84 4.34 36.68-2.44 0 0 3.7 2.29-.18 4.46-15.16 8.3-31.97 8.55-46.26-3.97-2.61-2.29-.78-4.46.03-4.44z'
                      fill='#da4c3f'
                      fillRule='nonzero'
                      transform='matrix(.8442 .03279 -.01756 .45202 15676.4 162.548)'
                    ></path>
                    <path
                      d='M2469.87 2473.12c.49.23.55.45.81.68 9.67 8.37 20.7 10.99 31.39 9.4 0 0 2.06.4 1.09 2.16-.28.51-.79.43-1.25.5-10.97 1.55-22.18-1.15-32.04-9.87-1.73-1.53-.54-2.98 0-2.87z'
                      fill='#da4c3f'
                      fillRule='nonzero'
                      transform='matrix(1.34373 0 0 .71777 14388.4 -407.72)'
                    ></path>
                  </g>
                </g>
                <path
                  d='M17697.8 1376.98c13.9-4.45 34.8-15.04 41.9-39.25.3-1.05.5-2 .7-2.88'
                  fill='none'
                  stroke='#da4c3f'
                  strokeWidth='1.91'
                  transform='matrix(1.07824 0 0 1.0188 -16979.979 -1231.733)'
                ></path>
                <path
                  d='M17733.7 1308.12s.4 3.22.3 4.88c-.1 1.66-2.3 7.78 0 12 2.7 5.06 7.4 8.91 17.4 3.94 8.5-4.21 12.8-14.96 8-15.81-3.2-.57-5.4 5.01-5.4 5.01s-3.1-5.53-3.1-9.11c0 0-3.2 1.41-8.3 1.48-4 .05-7-.92-8.9-2.39z'
                  fill='#fff'
                  transform='translate(-22103.79 -1695.683) scale(1.36692)'
                ></path>
                <path
                  d='M17735.3 1313.74c.1.01.2.04.2.09 1 .64 2.2.99 3.4.87.4-.04.5.19.5.19l-.3.41c-.9.45-2 .6-3 .25 0 0-.9-.42-1.5-1.16v-.25-.11c0-.1.1-.19.2-.25s.3-.08.4-.06c0 0 .1.01.1.02z'
                  fill='#da4c3f'
                  fillRule='nonzero'
                  transform='matrix(1.26742 0 0 1.5828 -20338.886 -1978.883)'
                ></path>
                <path
                  d='M17741.3 1313.33c.2.03.3.18.4.38.1.2 0 .42-.1.55-1.4 1.26-3.1 2.26-4.9 1.7-.6-.16-1.5-1.01-1.9-1.37-.2-.09-.2-.25-.2-.4 0-.16.1-.31.2-.41.1-.1.2-.13.4-.1.9.24 2.6.65 3.5.5 1.1-.17 2.6-.86 2.6-.86v.01z'
                  fill='#da4c3f'
                  fillRule='nonzero'
                  transform='matrix(1.18525 0 0 1.07708 -18869.683 -1313.343)'
                ></path>
                <path
                  d='M17739.1 1321.59c-.1-.02-.2.04-.3.16-.1.12-.1.27-.1.4.4.74 1.2 1.89 2.6 1.85 1.4-.04 2.8-1.41 3.7-2.46.1-.13.1-.33 0-.48-.1-.15-.3-.21-.4-.14-1.3.43-3.2.91-5.5.67z'
                  fill='#da4c3f'
                  transform='translate(-24254.195 -1853.983) scale(1.48815)'
                ></path>
                <path
                  d='M2510.95 2480.69c1.19.43 1.48 2.1-.52 2.94-13.46 5.48-29.07 2.55-40.57-7.38-2.06-1.77-1.18-4.51 1.11-2.48 11.12 9.68 26.26 12.59 39.31 6.96 0 0 .25-.13.67-.04z'
                  fill='#da4c3f'
                  fillRule='nonzero'
                  transform='matrix(.84272 -.14186 .11908 .70736 -241.727 -1250.943)'
                ></path>
                <path
                  d='M21142.1 1330.86c.9.15 1.1.97 0 1.72-12.7 8.72-18.8 23.47-17 37.05 0 0-.4 1.56-1.5.88-.4-.24-.4-.8-.5-1.24-1.6-14.08 5-29.2 17.9-37.98.3-.19.6-.47 1.1-.43z'
                  fill='#fff'
                  fillRule='nonzero'
                  transform='matrix(1.06398 0 0 1.28852 -20273.186 -1580.533)'
                ></path>
                <path
                  d='M21142.4 1330.48c5.1.57-3 5.84-6.8 10.55-7.3 9.04-10.5 18.85-9.2 28.78 0 0-.2.98-1.6 1.19-3.8.57-3.4-4.1-3.3-7.82.6-11 7.5-21.8 17.9-31.54.6-.63 1.3-1.25 3-1.16z'
                  fill='#fff'
                  fillRule='nonzero'
                  transform='matrix(.43573 0 0 .86161 -6995.477 -993.494)'
                ></path>
                <path
                  d='M21078.5 1361.13c0-2.28.6-4.13 1.4-4.13.8 0 1.4 1.85 1.4 4.13 1.6-1.61 3.4-2.48 3.9-1.93.5.54-.3 2.29-1.9 3.9 2.3 0 4.1.63 4.1 1.4 0 .77-1.8 1.4-4.1 1.4 1.6 1.61 2.4 3.36 1.9 3.9-.5.55-2.3-.32-3.9-1.93 0 2.28-.6 4.13-1.4 4.13-.8 0-1.4-1.85-1.4-4.13-1.6 1.61-3.4 2.48-3.9 1.93-.5-.54.3-2.29 1.9-3.9-2.2 0-4.1-.63-4.1-1.4 0-.77 1.9-1.4 4.1-1.4-1.6-1.61-2.4-3.36-1.9-3.9.5-.55 2.3.32 3.9 1.93z'
                  fill='#da4c3f'
                  transform='matrix(.9623 -1.11826 1.11826 .9623 -19589.285 22394.01)'
                ></path>
                <circle cx='21134.2' cy='1315.25' r='1.75' fill='#fff' transform='matrix(1.23648 -.26496 .26496 1.23648 -24258.495 4108.01)'></circle>
                <g>
                  <path
                    d='M2146.03 98.209c-.11-.777-.62-1.081-1.06-.501-.24.317-.25.712-.28 1.375-.01.499-.21 1.266-.33 1.754-.34 1.32-.93 2.446-1.47 3.695-.39.903-.77 1.737-.76 2.78.01.887.4 1.548.99 2.172.26.284.7.608 1.14.796.49.203 1.11.085 1.09-.599-.03-.775-1.32-1.357-1.28-2.161.02-.361.18-.939.29-1.271.3-.887.72-1.742 1-2.634.33-1.069.9-3.709.67-5.406z'
                    fill='#da4c3f'
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          <h3 className='text-md font-semibold'>All clear</h3>
          <span className='text-xs text-gray-600'>Looks like everything's organized in the right place.</span>
          <button className='px-5 py-1 bg-red-550 text-sm text-white rounded-md mt-2' onClick={() => setTaskClicked(true)}>
            Add a task
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
