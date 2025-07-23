import React from "react";
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
  dueDate: yup
    .string()
    .required("Due date is required"),
});

const AddTaskForm = () => {
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 space-y-3">
      <input
        {...register("title")}
        placeholder="Task title"
        className="border px-3 py-2 rounded w-full"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <input
        type="date"
        {...register("dueDate")}
        className="border px-3 py-2 rounded w-full"
      />
      {errors.dueDate && (
        <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
      )}

      <label className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          {...register("completed")}
          className="form-checkbox"
        />
        <span>Mark as completed</span>
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
