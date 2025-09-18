import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Calendar,
  Building2,
  User,
  TrendingUp,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

const pastEvaluations = [
  {
    id: 1,
    company: 'TechFlow AI',
    founder: 'Sarah Chen',
    sector: 'AI/ML',
    stage: 'Series A',
    status: 'approved',
    score: 87,
    funding_sought: '$2.5M',
    date: '2024-01-15',
    processing_time: '2.3h',
    confidence: 92
  },
  {
    id: 2,
    company: 'GreenEnergy Solutions',
    founder: 'Marcus Johnson',
    sector: 'CleanTech',
    stage: 'Seed',
    status: 'needs-improvement',
    score: 64,
    funding_sought: '$750K',
    date: '2024-01-12',
    processing_time: '1.8h',
    confidence: 78
  },
  {
    id: 3,
    company: 'FinTech Pro',
    founder: 'Emily Rodriguez',
    sector: 'FinTech',
    stage: 'Series A',
    status: 'approved',
    score: 91,
    funding_sought: '$5M',
    date: '2024-01-10',
    processing_time: '2.1h',
    confidence: 95
  },
  {
    id: 4,
    company: 'HealthTrack Analytics',
    founder: 'Dr. James Wilson',
    sector: 'HealthTech',
    stage: 'Pre-Seed',
    status: 'low-funding',
    score: 45,
    funding_sought: '$300K',
    date: '2024-01-08',
    processing_time: '1.5h',
    confidence: 82
  },
  {
    id: 5,
    company: 'EdTech Innovations',
    founder: 'Lisa Park',
    sector: 'EdTech',
    stage: 'Seed',
    status: 'approved',
    score: 79,
    funding_sought: '$1.2M',
    date: '2024-01-05',
    processing_time: '2.0h',
    confidence: 88
  },
  {
    id: 6,
    company: 'RetailBot Systems',
    founder: 'David Kumar',
    sector: 'Retail Tech',
    stage: 'Series A',
    status: 'needs-improvement',
    score: 68,
    funding_sought: '$3M',
    date: '2024-01-03',
    processing_time: '1.9h',
    confidence: 75
  },
  {
    id: 7,
    company: 'CyberShield Pro',
    founder: 'Rachel Adams',
    sector: 'CyberSecurity',
    stage: 'Seed',
    status: 'approved',
    score: 83,
    funding_sought: '$2M',
    date: '2024-01-01',
    processing_time: '2.2h',
    confidence: 89
  }
];

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

const StageBadge = ({ stage }: { stage: string }) => {
  const config = {
    'Pre-Seed': 'bg-purple-100 text-purple-800 border-purple-200',
    'Seed': 'bg-blue-100 text-blue-800 border-blue-200',
    'Series A': 'bg-green-100 text-green-800 border-green-200',
    'Series B': 'bg-orange-100 text-orange-800 border-orange-200'
  };
  
  return (
    <Badge variant="outline" className={config[stage as keyof typeof config] || config.Seed}>
      {stage}
    </Badge>
  );
};

export const PastReports = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReports] = useState(pastEvaluations);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = pastEvaluations.filter(report =>
      report.company.toLowerCase().includes(query.toLowerCase()) ||
      report.founder.toLowerCase().includes(query.toLowerCase()) ||
      report.sector.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReports(filtered);
  };

  const handleViewReport = (reportId: number) => {
    navigate('/results');
  };

  const handleDownloadReport = (reportId: number, companyName: string) => {
    // Mock PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${companyName}_Evaluation_Report.pdf`;
    link.click();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
          Past Reports
        </h1>
        <p className="text-muted-foreground">
          Review and manage your evaluation history
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-sm text-muted-foreground">Total Evaluations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">67</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">42</p>
                <p className="text-sm text-muted-foreground">Need Improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">81%</p>
                <p className="text-sm text-muted-foreground">Avg. Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Search & Filter Reports</CardTitle>
          <CardDescription>Find specific evaluations by company, founder, or sector</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by company name, founder, or sector..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Evaluation History</CardTitle>
          <CardDescription>
            Showing {filteredReports.length} of {pastEvaluations.length} evaluations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Founder</TableHead>
                <TableHead>Sector/Stage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Funding</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{report.company}</p>
                      <div className="flex items-center space-x-1">
                        <StatusIcon status={report.status} />
                        <span className="text-xs text-muted-foreground">
                          {report.confidence}% confidence
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{report.founder}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <span className="text-sm">{report.sector}</span>
                      <div>
                        <StageBadge stage={report.stage} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={report.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-medium ${getScoreColor(report.score)}`}>
                      {report.score}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {report.funding_sought}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">{report.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {report.processing_time} processing
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleViewReport(report.id)}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Report
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDownloadReport(report.id, report.company)}
                          className="cursor-pointer"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          Re-evaluate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};