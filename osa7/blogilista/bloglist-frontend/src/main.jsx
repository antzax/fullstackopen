import ReactDOM from "react-dom/client";
import { NotificationDispatchContext } from "./NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationDispatchContext>
      <App />
    </NotificationDispatchContext>
  </QueryClientProvider>,
);


//test