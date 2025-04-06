"use client";
import { createContext, useContext, ReactNode } from "react";


interface GridContextType {
    gridColumns: number; 
}

const GridContext = createContext<GridContextType | undefined>(undefined);

export const GridProvider = ({
    children,
    gridColumns,
}: {
    children: ReactNode;
    gridColumns: number;
}) => {
    return (
        <GridContext.Provider value={{ gridColumns }}>
            {children}
        </GridContext.Provider>
    );
};

export const useGridContext = () => {
    const context = useContext(GridContext);
    if (!context) {
        throw new Error("useGridContext must be used within a GridProvider");
    }
    return context;
};