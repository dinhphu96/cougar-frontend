// import { createSelector } from "@reduxjs/toolkit";

// const searchTextSelector = (state) => state.filters.search;
// const todoListSelector = (state) => state.todoList;
// const statusFilterSelector = (state) => state.filters.status;
// const priorityFilterSelector = (state) => state.filters.priority;

// export const todosRemainingSelector = createSelector(
//   searchTextSelector,
//   todoListSelector,
//   statusFilterSelector,
//   priorityFilterSelector,
//   (search, todoList, status, priorities) => {
//     return todoList.filter((todo) => {
//       return !priorities.length
//         ? todo.name.toLowerCase().includes(search.toLowerCase()) &&
//             (status === "Completed"
//               ? todo.completed
//               : status === "Todo"
//               ? !todo.completed
//               : {})
//         : todo.name.toLowerCase().includes(search.toLowerCase()) &&
//             (status === "Completed"
//               ? todo.completed
//               : status === "Todo"
//               ? !todo.completed
//               : {}) &&
//             priorities.includes(todo.priority);
//     });
//   }
// );

// //redux core
// // export const todoListSelector = (state) => {
// //     const todoRemaining = state.todoList.filter(todo=>{
// //         return todo.name.toLowerCase().includes(state.filters.search.toLowerCase());
// //     });

// //     return todoRemaining;
// // }
