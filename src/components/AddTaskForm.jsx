import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Yup schema
const schema = yup.object().shape({
  title: yup
    .string()
    .required("Task title is required")
    .min(3, "Minimum 3 characters"),
  dueDate: yup.string().required("Due date is required"),
});

const AddTaskForm = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const newTask = {
      title: data.title,
      completed: data.completed || false,
      userId: 1,
      dueDate: data.dueDate,
    };
    dispatch(addTask(newTask));
    reset();
    setShowForm(false);
  };

  return (
    <div className="my-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {showForm ? "Close" : "Add Task"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded p-4 mt-4 w-80 mx-auto space-y-3 border"
        >
          <input
            {...register("title")}
            placeholder="Task title"
            className="border px-2 py-1 rounded w-full text-sm"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}

          <input
            type="date"
            {...register("dueDate")}
            className="border px-2 py-1 rounded w-full text-sm"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-xs">{errors.dueDate.message}</p>
          )}

          <label className="inline-flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              {...register("completed")}
              className="form-checkbox"
            />
            <span>Mark as completed</span>
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddTaskForm;
