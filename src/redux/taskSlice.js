import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

// Generate fake dueDate
const generateFakeDueDate = (taskId) => {
  const today = new Date();
  today.setDate(today.getDate() + (taskId % 30));
  return today.toISOString().split("T")[0];
};

// FETCH TASKS
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(BASE_URL);
  return response.data.map(task => ({
    ...task,
    dueDate: generateFakeDueDate(task.id)
  }));
});
// ADD TAsk
export const addTask = createAsyncThunk('tasks/addTask', async (task, { rejectWithValue }) => {
  try {
    const response = await axios.post(BASE_URL, task);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// UPDATE TASK
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${task.id}`, task);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// DELETE TASK
export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 10,
    filteredItems: [],
    filter: "All",
    sortOrder: "asc"
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;

      let filtered = [...state.items];
      if (action.payload === "Completed") {
        filtered = filtered.filter(task => task.completed);
      } else if (action.payload === "Pending") {
        filtered = filtered.filter(task => !task.completed);
      }

      const sortFunc = (a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return state.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      };
      state.filteredItems = filtered.sort(sortFunc);
      state.currentPage = 1;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      const sortFunc = (a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return action.payload === "asc" ? dateA - dateB : dateB - dateA;
      };
      state.filteredItems = [...state.filteredItems].sort(sortFunc);
    },
    toggleTaskStatus: (state, action) => {
      const taskId = action.payload;
      state.items = state.items.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      state.filteredItems = state.filteredItems.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        state.items = state.items.map(task =>
          task.id === updatedTask.id ? { ...task, title: updatedTask.title } : task
        );
        state.filteredItems = state.filteredItems.map(task =>
          task.id === updatedTask.id ? { ...task, title: updatedTask.title } : task
        );
      })
     .addCase(addTask.fulfilled, (state, action) => {
      const newTask = {
      ...action.payload,
      // fallback if dueDate is not returned from the server
      dueDate: action.payload.dueDate || new Date().toISOString().split("T")[0],
     };
     state.items.unshift(newTask);
     state.filteredItems.unshift(newTask);
     state.error = null;
    })
   .addCase(removeTask.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter(task => task.id !== id);
        state.filteredItems = state.filteredItems.filter(task => task.id !== id);
      });
  }
});

export const { setPage, setFilter, setSortOrder, toggleTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
