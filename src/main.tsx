import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "./components/ui/sonner"
import { TooltipProvider } from "./components/ui/tooltip"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider disableTransitionOnChange>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Auth0ProviderWithNavigate>
            <TooltipProvider>
              <AppRoutes />
              <Toaster visibleToasts={1} position="top-center" richColors />
            </TooltipProvider>
          </Auth0ProviderWithNavigate>
        </QueryClientProvider>
      </Router>
    </ThemeProvider>
  </StrictMode>
)
