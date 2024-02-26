import styled from "styled-components";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";

const PageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #8c89ff;
`;

const PageContainer = styled.div`
  max-width: 900px;
  width: 100%;
  @media (max-width: 988px) {
    padding: 0 5%;
  }
`;

const ToDoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 0 24px;
  margin-top: 24px;
`;

const ToDoListItemWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 0 24px;
  align-items: center;
  padding: 16px;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px 0;
  }
  @media (max-width: 480px) {
    align-items: start;
  }
`;

const ToDoTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0 16px;
  max-width: 250px;
  width: 100%;
  @media (max-width: 988px) {
    max-width: 200px;
  }
  @media (max-width: 414px) {
    max-width: 180px;
  }
`;

const CustomButton = styled(Button)`
  max-width: 200px;
  text-transform: capitalize !important;
  font-size: 14px !important;
`;

const ChipWrapper = styled.div`
  display: flex;
  max-width: 120px;
  width: 100%;
  justify-content: start;
  @media (max-width: 988px) {
    max-width: fit-content;
    width: fit-content;
  }
  @media (max-width: 768px) {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0 16px;
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 16px 0;
  }
`;

const DeleteButtonWrapper = styled(ListItemButton)`
  position: absolute !important;
  bottom: 16px;
  right: 16px;
  @media(max-width: 480px) {
    bottom: 8px;
    right: 8px;
  }
`;

const FilterBoxWrapper = styled(Box)`
  margin-bottom: 16px;
  width: 100%;
  background: #FFF;
  padding: 16px;
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const FilterBoxTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin-bottom: 12px;
`;

export {
    PageWrapper,
    PageContainer,
    ToDoWrapper,
    ActionsWrapper,
    ToDoListItemWrapper,
    ToDoTitleWrapper,
    CustomButton,
    ChipWrapper,
    ButtonWrapper,
    DeleteButtonWrapper,
    FilterBoxWrapper,
    FilterBoxTitle
}