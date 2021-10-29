package com.rasoolavazeh.todo.controllers;

import com.rasoolavazeh.todo.entities.Todo;
import com.rasoolavazeh.todo.repositories.TodoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "*")
public class TodoController {

    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @PostMapping
    public Todo newTodo(@RequestBody Todo todo) {
        return this.todoRepository.save(todo);
    }

    @GetMapping
    public List<Todo> getTodos() {
        return todoRepository.findAll();
    }

    @GetMapping("/{todoId}")
    public Optional<Todo> getTodo(@PathVariable("todoId") Long todoId) {
        var todo = todoRepository.findById(todoId);
        return todo;
    }

    @PutMapping("/{todoId}")
    public Optional<Todo> updateTodo(@PathVariable("todoId") Long todoId, @RequestBody Todo updatedTodo) {
        return this.todoRepository.findById(todoId)
                .map(oldTodo -> this.todoRepository.save(updatedTodo));
    }

    @DeleteMapping("/{todoId}")
    public void deleteTodo(@PathVariable("todoId") Long todoId) {
        this.todoRepository.deleteById(todoId);
    }
}
