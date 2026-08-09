import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { AppLayout } from '@/components/layout/AppLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Academics } from '@/pages/Academics';
import { AIPipeline } from '@/pages/AIPipeline';
import { TimeManagement } from '@/pages/TimeManagement';
import { MSAbroad } from '@/pages/MSAbroad';
import { SpiritualCore } from '@/pages/SpiritualCore';

const queryClient = new QueryClient();

function currentHashPath() {
  if (typeof window === 'undefined') return '/';
  const hash = window.location.hash.replace(/^#/, '');
  return hash.startsWith('/') ? hash : `/${hash}`;
}

function useHashLocation(): [string, (to: string, options?: { replace?: boolean }) => void] {
  const [location, setLocation] = useState(currentHashPath);

  useEffect(() => {
    const onHashChange = () => setLocation(currentHashPath());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (to: string, options?: { replace?: boolean }) => {
    const next = to.startsWith('/') ? to : `/${to}`;
    if (options?.replace) {
      window.location.replace(`${window.location.pathname}${window.location.search}#${next}`);
    } else {
      window.location.hash = next;
    }
  };

  return [location, navigate];
}

useHashLocation.hrefs = (href: string) => `#${href}`;

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/academics" component={Academics} />
        <Route path="/ai-pipeline" component={AIPipeline} />
        <Route path="/time-management" component={TimeManagement} />
        <Route path="/ms-abroad" component={MSAbroad} />
        <Route path="/spiritual" component={SpiritualCore} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter hook={useHashLocation}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
