import React, { useEffect, useState, useCallback } from 'react';
import ToDoItem from './ToDoItem';
import {
    Divider,
    Box,
    List,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import {
    ActionsWrapper,
    FilterBoxTitle,
    FilterBoxWrapper, NavWrapper,
    ToDoListItemWrapper,
    ToDoWrapper
} from './style';
import AddToDoItemModal from './AddToDoItemModal';
import {
    getAllTasksFromLocalStorage,
    setNewLocalStorageValue,
    taskStatusType
} from '../utils';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ToDo = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskFilter, setTaskFilter] = useState(taskStatusType.ALL);

    useEffect(() => {
        const localStorageTasks = getAllTasksFromLocalStorage();
        if (!localStorageTasks?.length) {
            setNewLocalStorageValue([
                {
                    id: '1',
                    title: 'Task 1',
                    status: taskStatusType.COMPLETED
                },
                {
                    id: '2',
                    title: 'Task 2',
                    status: taskStatusType.CREATED
                },
                {
                    id: '3',
                    title: 'Task 3',
                    status: taskStatusType.INCOMPLETED
                }
            ]);
        } else {
            setTasks(localStorageTasks);
        }
    }, []);

    const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
            setTasks((prevTasks) =>
                update(prevTasks, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevTasks[dragIndex]]
                    ]
                })
            );
        },
        []
    );

    useEffect(() => {
        if (tasks.length && taskFilter === taskStatusType.ALL) {
            setNewLocalStorageValue(tasks);
        }
    }, [tasks, taskFilter]);

    const addNewTask = (task) => {
        setTasks([...tasks, task]);
        setNewLocalStorageValue([...tasks, task]);
    };

    const updateTask = (task) => {
        const updatedTaskArray = tasks?.map((item) =>
            item?.id === task?.id ? { ...item, title: task?.title } : item
        );
        setTasks(updatedTaskArray);
        setNewLocalStorageValue(updatedTaskArray);
    };

    const deleteTask = (taskID) => {
        const updatedTaskArray = tasks.filter((task) => task?.id !== taskID);
        setTasks(updatedTaskArray);
        setNewLocalStorageValue(updatedTaskArray);
    };

    const changeStatus = (taskID, newStatus) => {
        const updatedTaskArray = tasks?.map((task) =>
            task?.id === taskID ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTaskArray);
    };

    return (
        <ToDoWrapper>
            <FilterBoxWrapper>
                <FilterBoxTitle>Filter box</FilterBoxTitle>
                <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={taskFilter === taskStatusType.ALL}
                                onChange={() => setTaskFilter(taskStatusType.ALL)}
                            />
                        }
                        label="All tasks"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={taskFilter === taskStatusType.COMPLETED}
                                onChange={() => setTaskFilter(taskStatusType.COMPLETED)}
                            />
                        }
                        label="Completed"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={taskFilter === taskStatusType.INCOMPLETED}
                                onChange={() => setTaskFilter(taskStatusType.INCOMPLETED)}
                            />
                        }
                        label="Incompleted"
                    />
                </FormGroup>
            </FilterBoxWrapper>

            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <NavWrapper aria-label="main mailbox folders">
                    <List>
                        <DndProvider backend={HTML5Backend}>
                            {tasks?.some(
                                (item) =>
                                    item?.status === taskFilter ||
                                    taskFilter === taskStatusType.ALL
                            ) ? (
                                tasks.map((item, index) =>
                                    item?.status === taskFilter ||
                                    taskFilter === taskStatusType.ALL ? (
                                        <div key={item?.id}>
                                            <ToDoItem
                                                item={item}
                                                deleteTask={deleteTask}
                                                changeStatus={changeStatus}
                                                updateTask={updateTask}
                                                moveRow={moveRow}
                                                index={index}
                                            />
                                            <Divider />
                                        </div>
                                    ) : (
                                        <React.Fragment />
                                    )
                                )
                            ) : (
                                <ToDoListItemWrapper>No tasks found</ToDoListItemWrapper>
                            )}
                        </DndProvider>
                    </List>
                </NavWrapper>
            </Box>
            <ActionsWrapper>
                <Button variant="contained" onClick={() => setIsOpenModal(true)}>
                    Add new task
                </Button>
            </ActionsWrapper>
            {isOpenModal && (
                <AddToDoItemModal
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    addNewTask={addNewTask}
                />
            )}
        </ToDoWrapper>
    );
};

export default ToDo;
