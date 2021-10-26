const baseUrl = `${process.env.REACT_APP_API_URL}/todos`;

export const loadTodos = () => {
    return fetch(baseUrl).then((res) => res.json());
}

export const getTodo = (id) => {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json());
}

export const createTodo = (todo) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            "title": todo.title,
            "completed": todo.completed
        },
    }).then((res) => res.json());
}

export const updateTodo = (todo) => {
    return fetch(`${baseUrl}/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            "id": todo.id,
            "title": todo.title,
            "completed": todo.completed
        },
    }).then((res) => res.json());
}

export const deleteTodo = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    }).then(res => res.json());
}