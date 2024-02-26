import React from "react";
import './App.css';
import ToDo from "./components";
import { PageContainer, PageWrapper } from "./components/style";

const App = () => {
    return (
        <PageWrapper>
            <PageContainer>
                <ToDo />
            </PageContainer>
        </PageWrapper>
    )
};


export default App;
