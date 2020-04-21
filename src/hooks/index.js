import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import uniqid from 'uniqid';
export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let userId = localStorage.getItem('shiroTodoIDKey');
    if (!userId) {
      const newId = uniqid();
      localStorage.setItem('shiroTodoIDKey', newId);
      userId = newId;
    }

    let unsubscribe = firebase.firestore().collection('tasks').where('userId', '==', userId);

    unsubscribe = selectedProject === 'today' ? (unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY'))) : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      const filteredTask =
        selectedProject === 'next'
          ? newTasks.filter((task) => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && task.archived !== true)
          : newTasks.filter((task) => task.archived !== true);

      setTasks(filteredTask);
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};
