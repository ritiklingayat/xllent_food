import { ThemeProvider } from "./ThemeProvider";
import { ReduxProvider } from "./ReduxProvider";
import { QueryProvider } from "./QueryProvider";

import AppRouter from "@/routes/AppRouter";

export function AppProviders() {
  return (
    <ThemeProvider>
      <ReduxProvider>
        <QueryProvider>
          <AppRouter />
        </QueryProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}