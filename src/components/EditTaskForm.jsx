import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  dueDate: yup.string().required("Due date is required"),
  completed: yup.boolean().required(),
});

const EditTaskForm = ({ task, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task.title,
      dueDate: task.dueDate,
      completed: task.completed,
    },
    resolver: yupResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 border rounded shadow w-full max-w-md mx-auto mt-4"
    >
      <h2 className="text-lg font-semibold mb-4">Edit Task</h2>

      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input
          {...register("title")}
          className="w-full border px-3 py-2 rounded"
        />
        <p className="text-red-500 text-sm">{errors.title?.message}</p>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Due Date</label>
        <input
          type="date"
          {...register("dueDate")}
          className="w-full border px-3 py-2 rounded"
        />
        <p className="text-red-500 text-sm">{errors.dueDate?.message}</p>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Status</label>
        <select {...register("completed")} className="w-full border px-3 py-2 rounded">
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
