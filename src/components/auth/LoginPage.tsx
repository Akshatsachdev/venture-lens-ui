import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'investor' | 'startup'>('investor');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password, role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="bg-gradient-primary p-3 rounded-xl shadow-glow">
                <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center text-primary font-bold">
                  AI
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                  Investment Evaluator
                </h1>
                <p className="text-muted-foreground">AI-Powered Investment Analysis</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-foreground">
              Make Smarter Investment Decisions
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg">
              Leverage advanced AI algorithms to evaluate startups, assess founder potential, 
              and make data-driven funding decisions with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center p-4 hover-lift transition-smooth">
              <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
              <h3 className="font-semibold">Accurate Analysis</h3>
              <p className="text-sm text-muted-foreground">AI-powered evaluation with 95% accuracy</p>
            </Card>
            <Card className="text-center p-4 hover-lift transition-smooth">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Founder Assessment</h3>
              <p className="text-sm text-muted-foreground">Comprehensive founder evaluation metrics</p>
            </Card>
            <Card className="text-center p-4 hover-lift transition-smooth">
              <BarChart3 className="h-8 w-8 text-warning mx-auto mb-2" />
              <h3 className="font-semibold">Market Insights</h3>
              <p className="text-sm text-muted-foreground">Real-time market and trend analysis</p>
            </Card>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full max-w-md mx-auto card-gradient">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your investment dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={role} onValueChange={(value) => setRole(value as 'investor' | 'startup')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="investor" className="flex items-center space-x-2">
                  <span>Investor</span>
                  <Badge variant="secondary" className="ml-1">Pro</Badge>
                </TabsTrigger>
                <TabsTrigger value="startup">Startup</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="investor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    `Sign In as ${role === 'investor' ? 'Investor' : 'Startup'}`
                  )}
                </Button>
              </form>

              <TabsContent value="investor" className="mt-4">
                <div className="text-sm text-center text-muted-foreground">
                  Demo credentials: Any email/password
                </div>
              </TabsContent>

              <TabsContent value="startup" className="mt-4">
                <div className="text-sm text-center text-muted-foreground">
                  Demo credentials: Any email/password
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};