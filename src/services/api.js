import HttpClient from './HttpClient';

export function addTodo(data) {
   return HttpClient.addTask(data)
}

export function fetchTodos() {
    const response = HttpClient.tasks();
    console.log(response);
    if(response.status === 200) {
        return response.data;
    } else {
        return [];
    }
}