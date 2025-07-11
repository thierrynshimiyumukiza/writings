import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Archive from "@/pages/Archive";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-deep-blue-900 flex items-center justify-center">
        <div className="text-electric-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" component={isAuthenticated ? Home : Landing} />
        <Route path="/about" component={About} />
        <Route path="/blog" component={Blog} />
        <Route path="/post/:slug" component={BlogPost} />
        <Route path="/archive" component={Archive} />
        {isAuthenticated && <Route path="/admin" component={Admin} />}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
