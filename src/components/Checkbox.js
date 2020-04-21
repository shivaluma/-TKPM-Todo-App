import React from 'react';
import { firebase } from '../firebase';
import { FaCheck } from 'react-icons/fa';
const Checkbox = ({ id, taskDesc }) => {
  const archiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({
      archived: true,
    });
  };

  return (
    <div
      className='border rounded-full w-6 h-6 bg-gray-50 group hover:bg-gray-400 relative'
      onClick={() => archiveTask()}
      onKeyDown={() => archiveTask()}
      aria-label={`Mark ${taskDesc} as done?`}
      role='button'
      tabIndex={0}
    >
      <FaCheck className='hidden group-hover:block text-sm top-0 left-0 transform translate-x-1 translate-y-1' />
    </div>
  );
};

export default Checkbox;
