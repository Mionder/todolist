import React, { useRef, useState } from "react";
import {
    Chip,
    ListItem,
    ListItemText,
    Icon,
    ListItemIcon,
    TextField
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useDrag, useDrop } from "react-dnd";
import { taskStatusType } from "../utils";
import {
    ButtonWrapper,
    ChipWrapper,
    CustomButton,
    DeleteButtonWrapper,
    ToDoListItemWrapper,
    ToDoTitleWrapper,
} from "./style";

const ToDoItem = ({ item, deleteTask, changeStatus, updateTask, moveRow, index }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState(item?.title);
    const { id } = item;
    const ref = useRef(null);

    const [collectedProps, drop] = useDrop({
        accept: "dnd-todo",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },

        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveRow(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [, drag,] = useDrag({
        type: "dnd-todo",
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    const getChipColorByStatus = (status) => {
        return status === taskStatusType.COMPLETED
            ? "success"
            : status === taskStatusType.INCOMPLETED
                ? "error"
                : undefined;
    };

    const handleSaveClick = () => {
        setIsEditMode(false);
        updateTask({ ...item, title });
    };

    return (
        <ListItem ref={ref} data-handler-id={collectedProps.handlerId} disablePadding>
            <ToDoListItemWrapper>
                {isEditMode ? (
                    <ToDoTitleWrapper>
                        <TextField
                            value={title}
                            label="Enter new title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <ListItemIcon
                            onClick={handleSaveClick}
                            children={<Icon component={SaveIcon} />}
                        />
                    </ToDoTitleWrapper>
                ) : (
                    <ToDoTitleWrapper>
                        <ListItemText primary={item?.title} />
                        <ListItemIcon
                            onClick={() => setIsEditMode(true)}
                            children={<Icon component={EditIcon} />}
                        />
                    </ToDoTitleWrapper>
                )}
                <ChipWrapper>
                    <Chip label={item?.status} color={getChipColorByStatus(item?.status)} />
                </ChipWrapper>
                <ButtonWrapper>
                    {item?.status !== taskStatusType.COMPLETED && (
                        <CustomButton
                            onClick={() => changeStatus(item?.id, taskStatusType.COMPLETED)}
                            variant="outlined"
                        >
                            Mark as completed
                        </CustomButton>
                    )}
                    {item?.status !== taskStatusType.INCOMPLETED && (
                        <CustomButton
                            onClick={() => changeStatus(item?.id, taskStatusType.INCOMPLETED)}
                            variant="outlined"
                        >
                            Mark as incompleted
                        </CustomButton>
                    )}
                    <DeleteButtonWrapper onClick={() => deleteTask(item?.id)}>
                        <Icon component={DeleteOutlineIcon} />
                    </DeleteButtonWrapper>
                </ButtonWrapper>
            </ToDoListItemWrapper>
        </ListItem>
    );
};

export default ToDoItem;
