import React, {
  createContext,
  useContext,
  useState,
  SetStateAction,
} from 'react';

export interface Tool {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

interface ToolsContextData {
  tools: Tool[];
  setTools(tools: SetStateAction<Tool[]>): void;
}

const ToolsContext = createContext<ToolsContextData>({} as ToolsContextData);

const ToolsProvider: React.FC = ({ children }) => {
  const [tools, setTools] = useState<Tool[]>([]);

  return (
    <ToolsContext.Provider
      value={{
        tools,
        setTools,
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
};

function useTools(): ToolsContextData {
  const context = useContext(ToolsContext);

  if (!context) throw new Error('useTools must be used within a ToolsProvider');

  return context;
}

export { ToolsProvider, useTools };
