import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface SubscriptionGuardProps {
  children: ReactNode;
  requiredPlan?: 'Pro' | 'Business';
  fallback?: ReactNode;
}

export function SubscriptionGuard({ children, requiredPlan = 'Pro', fallback }: SubscriptionGuardProps) {
  const { subscription, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const hasAccess = () => {
    if (subscription.plan === 'Business') return true;
    if (requiredPlan === 'Pro' && (subscription.plan === 'Pro' || subscription.plan === 'Business')) return true;
    return false;
  };

  if (!hasAccess()) {
    if (fallback) return <>{fallback}</>;

    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Upgrade to {requiredPlan} Plan</h2>
          <p className="text-muted-foreground mb-6">
            This feature requires a {requiredPlan} subscription. Upgrade now to unlock unlimited reviews, advanced analytics, and more.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/pricing">
              <Button size="lg">View Plans</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg">Go to Dashboard</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
