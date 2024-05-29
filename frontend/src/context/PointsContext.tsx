import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextProps {
    points: number;
    updatePoints: (points: number) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const PointsContext: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [points, setPoints] = useState<number>(0);

    const updatePoints = (additionalPoints: number) => {
        setPoints(prevPoints => prevPoints + additionalPoints);
    };

    return (
        <AppContext.Provider value={{ points, updatePoints }}>
    {children}
    </AppContext.Provider>
);
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an PointsContext');
    }
    return context;
};
