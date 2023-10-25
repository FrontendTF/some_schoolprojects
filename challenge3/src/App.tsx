import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MainView } from "./components/MainView";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainView
          user={{
            firstname: "string",
            lastname: "string",
            email: "string",
            department: "",
            id: "string",
            isAdmin: true,
            createdAt: "string",
            updatedAt: "string",
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
