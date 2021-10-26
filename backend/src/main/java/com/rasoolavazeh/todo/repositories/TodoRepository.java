package com.rasoolavazeh.todo.repositories;

import com.rasoolavazeh.todo.entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}