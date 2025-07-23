import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskSlice';
import addTaskReducer from './addTaskSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    addTask: addTaskReducer, 

},
});

export default store;