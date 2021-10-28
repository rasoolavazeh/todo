import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, Layout, Row, Col, message } from 'antd';
import './TodoList.css';
import TodoTab from './TodoTab';
import TodoForm from './TodoForm';
import { createTodo, updateTodo, deleteTodo, loadTodos } from '../services/todoService';
const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [todos, setTodos] = useState([]);
    const [activeTodos, setActiveTodos] = useState([]);
    const [completedTodos, setCompletesTodos] = useState();

    const handleFormSubmit = (todo) => {
        console.log('Todo to create', todo);
        createTodo(todo).then(onRefresh());
        message.success('Todo added!');
    }

    const handleRemoveTodo = (todo) => {
        console.log('Todo to delete', todo);
        deleteTodo(todo.id).then(onRefresh());
        message.warn('Todo removed');
    }

    const handleToggleTodoStatus = (todo) => {
        console.log('Todo to update', todo);
        todo.completed = !todo.completed;
        updateTodo(todo).then(onRefresh());
        message.info('Todo status updated!');
    }

    const refresh = () => {
        loadTodos().then(json => {
            setTodos(json);
            setActiveTodos(json.filter(todo => todo.completed === false));
            setCompletesTodos(json.filter(todo => todo.completed === true));
        }).then(console.log('fetch completed'));
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        let data = await loadTodos();
        setTodos(data);
        setActiveTodos(data.filter(todo => todo.completed === false));
        setCompletesTodos(data.filter(todo => todo.completed === true));
        setRefreshing(false);
        console.log('Refresh state', refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh])

    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <div className="todolist">
                    <Row>
                        <Col span={14} offset={5}>
                            <h1>Rasool Todo</h1>
                            <TodoForm onFormSubmit={handleFormSubmit} />
                            <br />
                            <Tabs>
                                <TabPane tab="All" key="all">
                                    <TodoTab todos={todos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                                <TabPane tab="Active" key="active">
                                    <TodoTab todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval />
                                </TabPane>
                                <TabPane tab="Complete" key="complete">
                                    <TodoTab todos={completedTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>

        </Layout>
    )
}

export default TodoList;