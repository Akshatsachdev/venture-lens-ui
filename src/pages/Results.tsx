import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Download, 
  User, 
  Building2, 
  TrendingUp, 
  TrendingDown,
  Brain,
  AlertTriangle,
  Target,
  DollarSign,
  Users,
  BarChart3,
  FileText,
  ArrowLeft
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const evaluationResult = {
  verdict: 'approved',
  overallScore: 87,
  founderScore: 84,
  companyScore: 89,
  fundingRecommendation: '$2.5M',
  confidenceLevel: 92,
  riskLevel: 'Medium',
  companyName: 'TechFlow AI',
  founderName: 'Sarah Chen',
  evaluationDate: '2024-01-15',
  processingTime: '2.3 hours'
};

const contributionData = [
  { name: 'Founder Factors', value: 42, fill: '#3b82f6' },
  { name: 'Company Factors', value: 58, fill: '#10b981' }
];

const factorScores = [
  { factor: 'Market Size', founder: 0, company: 95, description: 'Large addressable market with strong growth potential' },
  { factor: 'Traction', founder: 0, company: 88, description: 'Strong user adoption and revenue growth metrics' },
  { factor: 'Team Experience', founder: 90, company: 0, description: 'Exceptional technical and domain expertise' },
  { factor: 'Leadership', founder: 85, company: 0, description: 'Proven ability to build and scale teams' },
  { factor: 'Business Model', founder: 0, company: 82, description: 'Clear path to profitability with recurring revenue' },
  { factor: 'Competitive Advantage', founder: 0, company: 86, description: 'Strong technical moat and first-mover advantage' }
];

const radarData = [
  { subject: 'Vision', A: 85, fullMark: 100 },
  { subject: 'Execution', A: 78, fullMark: 100 },
  { subject: 'Market', A: 92, fullMark: 100 },
  { subject: 'Product', A: 80, fullMark: 100 },
  { subject: 'Traction', A: 88, fullMark: 100 },
  { subject: 'Team', A: 90, fullMark: 100 }
];

const riskFactors = [
  { category: 'Market Risk', level: 'Low', description: 'Established market with proven demand' },
  { category: 'Technology Risk', level: 'Medium', description: 'Complex AI implementation requires specialized talent' },
  { category: 'Competition Risk', level: 'Medium', description: 'Several well-funded competitors in the space' },
  { category: 'Execution Risk', level: 'Low', description: 'Strong founding team with proven track record' }
];

const VerdictCard = () => {
  const getVerdictConfig = (verdict: string) => {
    switch (verdict) {
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'text-success',
          bg: 'bg-success/10 border-success/20',
          title: 'APPROVED FOR FUNDING',
          description: 'Strong investment opportunity with high growth potential'
        };
      case 'needs-improvement':
        return {
          icon: AlertTriangle,
          color: 'text-warning',
          bg: 'bg-warning/10 border-warning/20',
          title: 'NEEDS IMPROVEMENT',
          description: 'Address key concerns before funding consideration'
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'text-destructive',
          bg: 'bg-destructive/10 border-destructive/20',
          title: 'LOW FUNDING PROBABILITY',
          description: 'Significant challenges that need resolution'
        };
    }
  };

  const config = getVerdictConfig(evaluationResult.verdict);
  const Icon = config.icon;

  return (
    <Card className={`card-gradient border-2 ${config.bg}`}>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-background/80">
              <Icon className={`h-12 w-12 ${config.color}`} />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{config.title}</h2>
            <p className="text-muted-foreground">{config.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">{evaluationResult.overallScore}%</p>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-success">{evaluationResult.fundingRecommendation}</p>
              <p className="text-sm text-muted-foreground">Recommended Funding</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RiskBadge = ({ level }: { level: string }) => {
  const config = {
    Low: 'bg-success/10 text-success border-success/20',
    Medium: 'bg-warning/10 text-warning border-warning/20',
    High: 'bg-destructive/10 text-destructive border-destructive/20'
  };
  
  return (
    <Badge variant="outline" className={config[level as keyof typeof config] || config.Medium}>
      {level}
    </Badge>
  );
};

export const Results = () => {
  const navigate = useNavigate();
  const [isFounderOpen, setIsFounderOpen] = useState(true);
  const [isCompanyOpen, setIsCompanyOpen] = useState(true);
  const [isRiskOpen, setIsRiskOpen] = useState(false);

  const handleDownloadPDF = () => {
    // Mock PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${evaluationResult.companyName}_Evaluation_Report.pdf`;
    link.click();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Evaluation Results
            </h1>
            <p className="text-muted-foreground">
              {evaluationResult.companyName} • Analyzed on {evaluationResult.evaluationDate}
            </p>
          </div>
        </div>
        <Button onClick={handleDownloadPDF} className="bg-gradient-primary hover:opacity-90">
          <Download className="mr-2 h-4 w-4" />
          Download PDF Report
        </Button>
      </div>

      {/* Verdict */}
      <VerdictCard />

      {/* Contribution Analysis */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Score Contribution</span>
            </CardTitle>
            <CardDescription>Founder vs Company factor contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                founder: { label: 'Founder Factors', color: '#3b82f6' },
                company: { label: 'Company Factors', color: '#10b981' },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {contributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center space-x-6 mt-4">
              {contributionData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Performance Radar</span>
            </CardTitle>
            <CardDescription>Multi-dimensional performance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                performance: { label: 'Performance', color: '#3b82f6' },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Performance"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Scores */}
      <div className="space-y-6">
        {/* Founder Factors */}
        <Collapsible open={isFounderOpen} onOpenChange={setIsFounderOpen}>
          <Card className="card-gradient">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-muted/20 rounded-t-lg transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-primary" />
                    <span>Founder Analysis</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {evaluationResult.founderScore}%
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    {evaluationResult.founderScore >= 80 ? 
                      <TrendingUp className="h-4 w-4 text-success" /> : 
                      <TrendingDown className="h-4 w-4 text-warning" />
                    }
                  </div>
                </CardTitle>
                <CardDescription className="text-left">
                  Detailed breakdown of founder evaluation metrics
                </CardDescription>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 space-y-4">
                {factorScores.filter(f => f.founder > 0).map((factor, index) => (
                  <div key={index} className="space-y-2 p-4 rounded-lg border bg-muted/20">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{factor.factor}</span>
                      <Badge variant="outline">{factor.founder}%</Badge>
                    </div>
                    <Progress value={factor.founder} className="w-full" />
                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                  </div>
                ))}
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-start space-x-3">
                    <Brain className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-primary">AI Analysis Summary</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sarah Chen demonstrates exceptional leadership capabilities with a strong technical background 
                        in machine learning. Her previous role as VP of Engineering at a successful exit validates her 
                        execution abilities. The founding team's complementary skills and deep domain expertise 
                        significantly reduce execution risk.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Company Factors */}
        <Collapsible open={isCompanyOpen} onOpenChange={setIsCompanyOpen}>
          <Card className="card-gradient">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-muted/20 rounded-t-lg transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span>Company Analysis</span>
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      {evaluationResult.companyScore}%
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    {evaluationResult.companyScore >= 80 ? 
                      <TrendingUp className="h-4 w-4 text-success" /> : 
                      <TrendingDown className="h-4 w-4 text-warning" />
                    }
                  </div>
                </CardTitle>
                <CardDescription className="text-left">
                  Comprehensive analysis of business metrics and potential
                </CardDescription>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 space-y-4">
                {factorScores.filter(f => f.company > 0).map((factor, index) => (
                  <div key={index} className="space-y-2 p-4 rounded-lg border bg-muted/20">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{factor.factor}</span>
                      <Badge variant="outline">{factor.company}%</Badge>
                    </div>
                    <Progress value={factor.company} className="w-full" />
                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                  </div>
                ))}
                <div className="mt-6 p-4 bg-success/5 rounded-lg border border-success/20">
                  <div className="flex items-start space-x-3">
                    <Brain className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-success">AI Analysis Summary</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        TechFlow AI operates in a rapidly expanding market with strong unit economics and proven traction. 
                        The company's AI platform addresses a clear market need with strong early customer validation. 
                        Revenue growth trajectory and competitive positioning indicate high scalability potential.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Risk Assessment */}
        <Collapsible open={isRiskOpen} onOpenChange={setIsRiskOpen}>
          <Card className="card-gradient">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-muted/20 rounded-t-lg transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <span>Risk Assessment</span>
                    <Badge variant="secondary" className="bg-warning/10 text-warning">
                      {evaluationResult.riskLevel}
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription className="text-left">
                  Identified risks and mitigation strategies
                </CardDescription>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 space-y-4">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                    <div className="space-y-1">
                      <span className="font-medium">{risk.category}</span>
                      <p className="text-sm text-muted-foreground">{risk.description}</p>
                    </div>
                    <RiskBadge level={risk.level} />
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      {/* Summary Stats */}
      <Card className="card-gradient">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <p className="text-2xl font-bold">{evaluationResult.confidenceLevel}%</p>
              <p className="text-sm text-muted-foreground">Confidence Level</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <DollarSign className="h-8 w-8 text-success" />
              </div>
              <p className="text-2xl font-bold">{evaluationResult.fundingRecommendation}</p>
              <p className="text-sm text-muted-foreground">Recommended Amount</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Users className="h-8 w-8 text-warning" />
              </div>
              <p className="text-2xl font-bold">{evaluationResult.riskLevel}</p>
              <p className="text-sm text-muted-foreground">Risk Level</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Brain className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{evaluationResult.processingTime}</p>
              <p className="text-sm text-muted-foreground">Processing Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};