import { useState } from 'react';

const AssignTaskForm = ({ fetchTasks }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

//   const handleAssignTask = async (e) => {
//     e.preventDefault();

//     try {
//       await fetch('/api/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title: taskTitle, description: taskDescription }),
//       });

//       setTaskTitle('');
//       setTaskDescription('');
//       fetchTasks();
//     } catch (error) {
//       console.error('Error assigning task:', error);
//     }
//   };

  return (
    <div>
      <h2>Assign Task</h2>
      <form onSubmit={handleAssignTask}>
        <label>
          Title:
          <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
        </label>
        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
};

export default AssignTaskForm;
