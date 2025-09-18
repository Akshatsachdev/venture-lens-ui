import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown,
  Brain, 
  Target,
  Users,
  Building2,
  BarChart3,
  PieChart,
  Calendar,
  ArrowUpRight,
  Lightbulb,
  Award,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const performanceTrends = [
  { month: 'Jul', founder_score: 72, company_score: 68, total_evaluations: 15 },
  { month: 'Aug', founder_score: 75, company_score: 71, total_evaluations: 18 },
  { month: 'Sep', founder_score: 78, company_score: 74, total_evaluations: 22 },
  { month: 'Oct', founder_score: 81, company_score: 77, total_evaluations: 25 },
  { month: 'Nov', founder_score: 79, company_score: 80, total_evaluations: 28 },
  { month: 'Dec', founder_score: 83, company_score: 82, total_evaluations: 31 },
];

const sectorPerformance = [
  { sector: 'AI/ML', avg_score: 84, count: 23, funding_rate: 78 },
  { sector: 'FinTech', avg_score: 79, count: 18, funding_rate: 72 },
  { sector: 'HealthTech', avg_score: 76, count: 15, funding_rate: 67 },
  { sector: 'CleanTech', avg_score: 73, count: 12, funding_rate: 58 },
  { sector: 'EdTech', avg_score: 71, count: 10, funding_rate: 60 },
];

const fundingDistribution = [
  { range: '$0-500K', count: 25, percentage: 31 },
  { range: '$500K-1M', count: 20, percentage: 25 },
  { range: '$1M-5M', count: 24, percentage: 30 },
  { range: '$5M+', count: 11, percentage: 14 },
];

const keyInsights = [
  {
    id: 1,
    type: 'positive',
    title: 'Strong AI/ML Performance',
    description: 'AI/ML startups show 23% higher average scores and 15% better funding success rates compared to other sectors.',
    action: 'Consider increasing AI/ML evaluation capacity',
    icon: Brain,
    trend: 'up'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Founder Experience Gap',
    description: 'Companies with founders lacking domain expertise show 32% lower success rates in scaling phase.',
    action: 'Emphasize founder background evaluation',
    icon: Users,
    trend: 'down'
  },
  {
    id: 3,
    type: 'opportunity',
    title: 'Market Timing Sweet Spot',
    description: 'Startups in pre-revenue to early revenue stage (0-100K ARR) show highest evaluation scores.',
    action: 'Focus on early-stage deal flow',
    icon: Target,
    trend: 'up'
  },
  {
    id: 4,
    type: 'positive',
    title: 'Evaluation Accuracy Improving',
    description: '12-month follow-up shows 89% correlation between AI predictions and actual performance.',
    action: 'Continue current evaluation methodology',
    icon: Award,
    trend: 'up'
  }
];

const InsightCard = ({ insight }: { insight: any }) => {
  const Icon = insight.icon;
  const getConfig = (type: string) => {
    switch (type) {
      case 'positive':
        return {
          bg: 'bg-success/5 border-success/20',
          iconBg: 'bg-success/10',
          iconColor: 'text-success',
          titleColor: 'text-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning/5 border-warning/20',
          iconBg: 'bg-warning/10',
          iconColor: 'text-warning',
          titleColor: 'text-warning'
        };
      case 'opportunity':
        return {
          bg: 'bg-primary/5 border-primary/20',
          iconBg: 'bg-primary/10',
          iconColor: 'text-primary',
          titleColor: 'text-primary'
        };
      default:
        return {
          bg: 'bg-muted/20 border-border',
          iconBg: 'bg-muted/30',
          iconColor: 'text-muted-foreground',
          titleColor: 'text-foreground'
        };
    }
  };

  const config = getConfig(insight.type);

  return (
    <Card className={`card-gradient border ${config.bg}`}>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${config.iconBg}`}>
            <Icon className={`h-6 w-6 ${config.iconColor}`} />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className={`font-semibold ${config.titleColor}`}>
                {insight.title}
              </h3>
              {insight.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-warning" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {insight.description}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {insight.action}
              </Badge>
              <Button variant="ghost" size="sm" className="text-xs h-6">
                Learn More <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Insights = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
          Investment Insights
        </h1>
        <p className="text-muted-foreground">
          AI-powered analytics and trends from your evaluation data
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">81.3%</p>
                <p className="text-sm text-muted-foreground">Avg Evaluation Score</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-xs text-success">+5.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Target className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">67%</p>
                <p className="text-sm text-muted-foreground">Funding Success Rate</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-xs text-success">+8.1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">2.1h</p>
                <p className="text-sm text-muted-foreground">Avg Processing Time</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 text-success mr-1" />
                  <span className="text-xs text-success">-12%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-xs text-success">+3.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Performance Trends</span>
            </CardTitle>
            <CardDescription>Founder vs Company score evolution over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                founder: { label: 'Founder Score', color: '#3b82f6' },
                company: { label: 'Company Score', color: '#10b981' },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="founder_score" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="company_score" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span>Sector Performance</span>
            </CardTitle>
            <CardDescription>Average scores and funding rates by sector</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                score: { label: 'Avg Score', color: '#3b82f6' },
                funding: { label: 'Funding Rate', color: '#10b981' },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorPerformance} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="sector" type="category" width={80} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="avg_score" fill="#3b82f6" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <span>AI-Generated Insights</span>
          </CardTitle>
          <CardDescription>
            Machine learning analysis of your evaluation patterns and outcomes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {keyInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Funding Distribution */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-primary" />
            <span>Funding Distribution Analysis</span>
          </CardTitle>
          <CardDescription>Breakdown of funding requests and success rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <ChartContainer
                config={{
                  count: { label: 'Count', color: '#3b82f6' },
                }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={fundingDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#3b82f6" 
                      fill="#3b82f6"
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Distribution Insights</h4>
              {fundingDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                  <div className="space-y-1">
                    <span className="font-medium">{item.range}</span>
                    <p className="text-sm text-muted-foreground">{item.count} evaluations</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">
                      {item.percentage}%
                    </Badge>
                    <p className="text-xs text-muted-foreground">of total</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>AI Recommendations</span>
          </CardTitle>
          <CardDescription>Personalized suggestions to optimize your investment strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border bg-primary/5 border-primary/20">
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary">Focus Area: AI/ML Startups</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Consider increasing allocation to AI/ML sector based on superior performance metrics 
                    and market growth trajectory.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border bg-warning/5 border-warning/20">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <h4 className="font-semibold text-warning">Review: Founder Assessment</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Strengthen founder evaluation criteria, particularly domain expertise weighting 
                    for improved prediction accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};