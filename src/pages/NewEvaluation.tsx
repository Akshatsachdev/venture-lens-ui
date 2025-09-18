import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  User, 
  Building2, 
  ChevronDown, 
  ChevronUp, 
  Brain, 
  Loader2,
  CheckCircle,
  FileText,
  DollarSign
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const founderFactors = [
  { id: 'background', name: 'Background & Experience', weight: 80, description: 'Education, work history, relevant experience' },
  { id: 'track_record', name: 'Track Record', weight: 75, description: 'Previous ventures, exits, achievements' },
  { id: 'network', name: 'Network & Connections', weight: 65, description: 'Industry connections, advisors, mentors' },
  { id: 'leadership', name: 'Leadership Skills', weight: 70, description: 'Team building, vision communication, execution' },
  { id: 'resilience', name: 'Resilience & Adaptability', weight: 85, description: 'Ability to pivot, handle setbacks' },
  { id: 'commitment', name: 'Commitment Level', weight: 90, description: 'Full-time dedication, skin in the game' },
  { id: 'vision_alignment', name: 'Vision Alignment', weight: 75, description: 'Clear vision, market understanding' },
];

const companyFactors = [
  { id: 'market_size', name: 'Market Size & Growth', weight: 85, description: 'TAM, SAM, growth potential' },
  { id: 'business_model', name: 'Business Model', weight: 80, description: 'Revenue streams, scalability' },
  { id: 'unit_economics', name: 'Unit Economics', weight: 90, description: 'CAC, LTV, profitability metrics' },
  { id: 'traction', name: 'Traction & Growth', weight: 95, description: 'User growth, revenue, key metrics' },
  { id: 'product', name: 'Product & Technology', weight: 75, description: 'Innovation, competitive advantage' },
  { id: 'financials', name: 'Financials', weight: 85, description: 'Revenue, burn rate, runway' },
  { id: 'pitch_deck', name: 'Pitch Deck Quality', weight: 60, description: 'Clarity, completeness, presentation' },
  { id: 'regulatory_risk', name: 'Regulatory Risk', weight: 70, description: 'Compliance, legal considerations' },
  { id: 'exit_potential', name: 'Exit Potential', weight: 80, description: 'Strategic buyers, IPO potential' },
];

const FactorSlider = ({ factor, value, onChange }: any) => (
  <div className="space-y-3 p-4 rounded-lg border bg-muted/20">
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <Label className="text-sm font-medium">{factor.name}</Label>
        <p className="text-xs text-muted-foreground">{factor.description}</p>
      </div>
      <Badge variant="outline" className="text-xs">
        {value}%
      </Badge>
    </div>
    <Slider
      value={[value]}
      onValueChange={(newValue) => onChange(factor.id, newValue[0])}
      max={100}
      step={5}
      className="w-full"
    />
  </div>
);

export const NewEvaluation = () => {
  const navigate = useNavigate();
  const [isFounderOpen, setIsFounderOpen] = useState(true);
  const [isCompanyOpen, setIsCompanyOpen] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  
  const [founderWeights, setFounderWeights] = useState(() =>
    founderFactors.reduce((acc, factor) => ({ ...acc, [factor.id]: factor.weight }), {})
  );
  
  const [companyWeights, setCompanyWeights] = useState(() =>
    companyFactors.reduce((acc, factor) => ({ ...acc, [factor.id]: factor.weight }), {})
  );

  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    description: '',
    sector: '',
    stage: '',
    funding_sought: ''
  });

  const [founderInfo, setFounderInfo] = useState({
    name: '',
    email: '',
    background: '',
    previous_companies: ''
  });

  const handleFactorChange = (type: 'founder' | 'company', factorId: string, value: number) => {
    if (type === 'founder') {
      setFounderWeights(prev => ({ ...prev, [factorId]: value }));
    } else {
      setCompanyWeights(prev => ({ ...prev, [factorId]: value }));
    }
  };

  const handleRunEvaluation = async () => {
    setIsEvaluating(true);
    
    // Simulate AI evaluation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "Evaluation Complete!",
      description: "AI analysis has been completed. Redirecting to results...",
    });
    
    // Navigate to results page after a brief delay
    setTimeout(() => {
      navigate('/results');
    }, 1000);
  };

  const averageFounderWeight = Math.round(
    Object.values(founderWeights as Record<string, number>).reduce((a: number, b: number) => a + b, 0) / founderFactors.length
  );
  
  const averageCompanyWeight = Math.round(
    Object.values(companyWeights as Record<string, number>).reduce((a: number, b: number) => a + b, 0) / companyFactors.length
  );

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
          New AI Evaluation
        </h1>
        <p className="text-muted-foreground">
          Upload pitch materials and configure evaluation parameters
        </p>
      </div>

      {/* Company Information */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-primary" />
            <span>Company Information</span>
          </CardTitle>
          <CardDescription>Basic information about the startup</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                placeholder="TechFlow AI"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sector">Sector</Label>
              <Input
                id="sector"
                placeholder="AI/ML, FinTech, HealthTech..."
                value={companyInfo.sector}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, sector: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">Stage</Label>
              <Input
                id="stage"
                placeholder="Pre-seed, Seed, Series A..."
                value={companyInfo.stage}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, stage: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="funding">Funding Sought</Label>
              <Input
                id="funding"
                placeholder="$500K, $2M, $10M..."
                value={companyInfo.funding_sought}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, funding_sought: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the company, its mission, and what problem it solves..."
              className="min-h-[100px]"
              value={companyInfo.description}
              onChange={(e) => setCompanyInfo(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Founder Information */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-primary" />
            <span>Founder Information</span>
          </CardTitle>
          <CardDescription>Key details about the founding team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="founder-name">Founder Name</Label>
              <Input
                id="founder-name"
                placeholder="Sarah Chen"
                value={founderInfo.name}
                onChange={(e) => setFounderInfo(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founder-email">Email</Label>
              <Input
                id="founder-email"
                type="email"
                placeholder="sarah@techflow.ai"
                value={founderInfo.email}
                onChange={(e) => setFounderInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="background">Professional Background</Label>
            <Textarea
              id="background"
              placeholder="Previous roles, education, relevant experience..."
              className="min-h-[80px]"
              value={founderInfo.background}
              onChange={(e) => setFounderInfo(prev => ({ ...prev, background: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="previous-companies">Previous Companies</Label>
            <Input
              id="previous-companies"
              placeholder="Google, Microsoft, Previous startup..."
              value={founderInfo.previous_companies}
              onChange={(e) => setFounderInfo(prev => ({ ...prev, previous_companies: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-primary" />
            <span>Document Upload</span>
          </CardTitle>
          <CardDescription>Upload pitch deck, financials, and other materials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Pitch Deck</p>
              <p className="text-xs text-muted-foreground">PDF, PPT up to 10MB</p>
            </div>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <DollarSign className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Financial Model</p>
              <p className="text-xs text-muted-foreground">XLS, CSV up to 5MB</p>
            </div>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Additional Docs</p>
              <p className="text-xs text-muted-foreground">Any format up to 10MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evaluation Factors */}
      <div className="space-y-6">
        {/* Founder Factors */}
        <Collapsible open={isFounderOpen} onOpenChange={setIsFounderOpen}>
          <Card className="card-gradient">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-muted/20 rounded-t-lg transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-primary" />
                    <span>Founder Factors</span>
                    <Badge variant="secondary">Avg: {averageFounderWeight}%</Badge>
                  </div>
                  {isFounderOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CardTitle>
                <CardDescription className="text-left">
                  Configure weighting for founder evaluation criteria
                </CardDescription>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                {founderFactors.map((factor) => (
                  <FactorSlider
                    key={factor.id}
                    factor={factor}
                    value={founderWeights[factor.id]}
                    onChange={(id: string, value: number) => handleFactorChange('founder', id, value)}
                  />
                ))}
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
                    <span>Company Factors</span>
                    <Badge variant="secondary">Avg: {averageCompanyWeight}%</Badge>
                  </div>
                  {isCompanyOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CardTitle>
                <CardDescription className="text-left">
                  Configure weighting for company evaluation criteria
                </CardDescription>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                {companyFactors.map((factor) => (
                  <FactorSlider
                    key={factor.id}
                    factor={factor}
                    value={companyWeights[factor.id]}
                    onChange={(id: string, value: number) => handleFactorChange('company', id, value)}
                  />
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      {/* Run Evaluation */}
      <Card className="card-gradient">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Ready to Run AI Evaluation?</h3>
              <p className="text-muted-foreground">
                The AI will analyze all provided information and generate a comprehensive evaluation report
              </p>
            </div>
            
            {isEvaluating && (
              <div className="space-y-3">
                <Progress value={66} className="w-full max-w-md mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Analyzing founder background and company metrics...
                </p>
              </div>
            )}
            
            <Button
              onClick={handleRunEvaluation}
              disabled={isEvaluating}
              className="bg-gradient-primary hover:opacity-90 transition-opacity px-8 py-2.5"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running AI Analysis...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Run AI Evaluation
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};