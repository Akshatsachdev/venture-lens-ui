import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  Users, 
  Clock,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const fundingData = [
  { name: 'Approved', value: 15, color: '#10b981' },
  { name: 'Needs Improvement', value: 8, color: '#f59e0b' },
  { name: 'Low Funding', value: 4, color: '#ef4444' },
];

const monthlyData = [
  { month: 'Jan', approved: 12, rejected: 3, pending: 2 },
  { month: 'Feb', approved: 15, rejected: 5, pending: 3 },
  { month: 'Mar', approved: 18, rejected: 4, pending: 1 },
  { month: 'Apr', approved: 22, rejected: 6, pending: 4 },
];

const recentEvaluations = [
  {
    id: 1,
    company: 'TechFlow AI',
    founder: 'Sarah Chen',
    status: 'approved',
    score: 87,
    date: '2 hours ago',
    sector: 'AI/ML'
  },
  {
    id: 2,
    company: 'GreenEnergy Solutions',
    founder: 'Marcus Johnson',
    status: 'needs-improvement',
    score: 64,
    date: '5 hours ago',
    sector: 'CleanTech'
  },
  {
    id: 3,
    company: 'FinTech Pro',
    founder: 'Emily Rodriguez',
    status: 'approved',
    score: 91,
    date: '1 day ago',
    sector: 'FinTech'
  },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <Card className="card-gradient hover-lift transition-smooth">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs flex items-center mt-1 ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
        {trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
        {change} from last month
      </p>
    </CardContent>
  </Card>
);

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'approved':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'needs-improvement':
      return <AlertCircle className="h-4 w-4 text-warning" />;
    case 'low-funding':
      return <XCircle className="h-4 w-4 text-destructive" />;
    default:
      return null;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    approved: { label: 'Approved', className: 'bg-success/10 text-success border-success/20' },
    'needs-improvement': { label: 'Needs Improvement', className: 'bg-warning/10 text-warning border-warning/20' },
    'low-funding': { label: 'Low Funding', className: 'bg-destructive/10 text-destructive border-destructive/20' }
  };

  const { label, className } = config[status as keyof typeof config] || config.approved;
  
  return <Badge variant="outline" className={className}>{label}</Badge>;
};

export const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
          Investment Dashboard
        </h1>
        <p className="text-muted-foreground">
          AI-powered insights for smarter investment decisions
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Evaluations"
          value="127"
          change="+12%"
          icon={FileText}
          trend="up"
        />
        <StatCard
          title="Approved Funding"
          value="$2.4M"
          change="+18%"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Active Founders"
          value="89"
          change="+5%"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Avg. Evaluation Time"
          value="2.4h"
          change="-15%"
          icon={Clock}
          trend="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Funding Verdicts Pie Chart */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Funding Verdicts</span>
            </CardTitle>
            <CardDescription>Distribution of evaluation outcomes this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                approved: { label: 'Approved', color: '#10b981' },
                needsImprovement: { label: 'Needs Improvement', color: '#f59e0b' },
                lowFunding: { label: 'Low Funding', color: '#ef4444' },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fundingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {fundingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center space-x-6 mt-4">
              {fundingData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="h-5 w-5 text-primary" />
              <span>Monthly Trends</span>
            </CardTitle>
            <CardDescription>Evaluation outcomes over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                approved: { label: 'Approved', color: '#10b981' },
                rejected: { label: 'Rejected', color: '#ef4444' },
                pending: { label: 'Pending', color: '#f59e0b' },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="approved" fill="#10b981" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="rejected" fill="#ef4444" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="pending" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Evaluations */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Recent Evaluations</span>
            </div>
            <Button variant="outline" size="sm">
              View All <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </CardTitle>
          <CardDescription>Latest startup evaluation results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEvaluations.map((evaluation) => (
              <div
                key={evaluation.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <StatusIcon status={evaluation.status} />
                  <div className="space-y-1">
                    <p className="font-medium">{evaluation.company}</p>
                    <p className="text-sm text-muted-foreground">
                      Founded by {evaluation.founder} • {evaluation.sector}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-right">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Score:</span>
                      <span className="font-semibold">{evaluation.score}%</span>
                    </div>
                    <Progress value={evaluation.score} className="w-20" />
                  </div>
                  <div className="space-y-1">
                    <StatusBadge status={evaluation.status} />
                    <p className="text-xs text-muted-foreground">{evaluation.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};