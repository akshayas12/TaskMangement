import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AddTaskForm from "./AddTaskForm";

import {
  fetchTasks,
  setPage,
  setFilter,
  setSortOrder,
  toggleTaskStatus,
  updateTask,
  removeTask,
  addTask 
} from "../redux/taskSlice";
import EditTaskForm from "./EditTaskForm";


const TaskList = () => {
  const dispatch = useDispatch();
 const { filteredItems, loading, error, currentPage, itemsPerPage, filter, sortOrder ,taskId} = useSelector((state) => state.tasks);
const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTasks = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const handleAddTask = (data) => {
  const newTask = {
    title: data.title,
    completed: false,
    userId: 1,
    dueDate: new Date().toISOString().split("T")[0],
  };
  dispatch(addTask(newTask));
  reset(); // Clear the form
 };

  const handleEdit = (task) => {
  setEditingTask(task); 
};
const handleEditSubmit = (data) => {
  const updated = {
    ...editingTask,
    title: data.title,
    dueDate: data.dueDate,
    completed: data.completed === "true" || data.completed === true
  };
  dispatch(updateTask(updated));
  setEditingTask(null);
};
const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (confirmDelete) {
    dispatch(removeTask(id));
  }
};
const schema = Yup.object().shape({
  title: Yup.string().required("Task title is required").min(3, "Minimum 3 characters"),
});
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  resolver: yupResolver(schema),
});

  return (
    
    <div className="p-4">

      <h2 className="text-xl font-bold mb-4"> Task List</h2>
       {editingTask && (
          <EditTaskForm
            task={editingTask}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingTask(null)}
            />
             )}

        <AddTaskForm />

      {/* Filter  */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          className="px-3 py-2 border rounded bg-gray-100"
        >
          {["All", "Completed", "Pending"].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Sort  */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Sort by Due Date:</label>
        <select
          value={sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
          className="px-3 py-1 border rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Task list */}
      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <>
          <table className="min-w-full bg-white border border-gray-300 mb-4">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Due Date</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTasks.map((task) => (
                <tr key={task.id}>
                  <td className="border px-4 py-2">{task.title}</td>
                  <td className="border px-4 py-2 text-center">
              <button onClick={() => dispatch(toggleTaskStatus(task.id))} className={`px-2 py-1 rounded text-white text-sm ${task.completed ? "bg-green-600 hover:bg-green-700" : "bg-yellow-500 hover:bg-yellow-600"}`}>
              {task.completed ? "Mark Pending" : "Mark Completed"}
              </button>
              </td>
              <td className="border px-4 py-2">
                    {new Date(task.dueDate).toLocaleDateString()}
               </td>
               <td className="border px-4 py-2 space-x-2">
           <button onClick={() => handleEdit(task)} className="bg-yellow-500 text-white px-2 py-1 rounded">
            Edit
           </button>
          <button onClick={() => handleDelete(task.id)} className="bg-red-500 text-white px-2 py-1 rounded">
           Delete
         </button>
         </td>
        </tr>
          ))}
            </tbody>
          </table>
             

          {/* Pagination */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => dispatch(setPage(currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200"
              }`}
            >
              Previous
            </button>

            <span className="px-4 py-2 font-semibold">Page {currentPage}</span>

            <button
              onClick={() => dispatch(setPage(currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;
