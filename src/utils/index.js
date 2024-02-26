const setNewLocalStorageValue = (value) => {
    localStorage.setItem('tasks', JSON.stringify(value));
};

const getAllTasksFromLocalStorage = () => JSON.parse(localStorage.getItem('tasks'));

const taskStatusType = {
    ALL: 'all',
    COMPLETED: 'completed',
    INCOMPLETED: 'incompleted',
    CREATED: 'created',
};

export {
    setNewLocalStorageValue,
    getAllTasksFromLocalStorage,
    taskStatusType
};
