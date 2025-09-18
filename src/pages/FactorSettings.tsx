import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  User, 
  Building2, 
  Save, 
  Plus,
  Trash2,
  Edit,
  Target,
  BarChart3
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const weightingProfiles = [
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Equal emphasis on founder and company factors',
    founderWeight: 50,
    companyWeight: 50,
    active: true
  },
  {
    id: 'founder-first',
    name: 'Founder-First',
    description: 'Prioritizes founder experience and background',
    founderWeight: 70,
    companyWeight: 30,
    active: false
  },
  {
    id: 'company-focused',
    name: 'Company-Focused',
    description: 'Emphasizes business metrics and traction',
    founderWeight: 30,
    companyWeight: 70,
    active: false
  },
  {
    id: 'aggressive',
    name: 'Aggressive Growth',
    description: 'High-growth potential with risk tolerance',
    founderWeight: 40,
    companyWeight: 60,
    active: false
  }
];

const founderSubFactors = [
  { id: 'education', name: 'Education & Credentials', weight: 70 },
  { id: 'experience', name: 'Work Experience', weight: 85 },
  { id: 'previous_exits', name: 'Previous Exits', weight: 90 },
  { id: 'network_quality', name: 'Network Quality', weight: 75 },
  { id: 'leadership_style', name: 'Leadership Style', weight: 80 },
  { id: 'domain_expertise', name: 'Domain Expertise', weight: 85 }
];

const companySubFactors = [
  { id: 'tam_size', name: 'TAM Size', weight: 80 },
  { id: 'market_growth', name: 'Market Growth Rate', weight: 75 },
  { id: 'revenue_model', name: 'Revenue Model Clarity', weight: 85 },
  { id: 'scalability', name: 'Scalability Potential', weight: 90 },
  { id: 'competitive_moat', name: 'Competitive Moat', weight: 80 },
  { id: 'customer_validation', name: 'Customer Validation', weight: 95 }
];

export const FactorSettings = () => {
  const [masterWeights, setMasterWeights] = useState({
    founder: 60,
    company: 40
  });
  
  const [profiles, setProfiles] = useState(weightingProfiles);
  const [founderWeights, setFounderWeights] = useState(
    founderSubFactors.reduce((acc, factor) => ({ ...acc, [factor.id]: factor.weight }), {})
  );
  const [companyWeights, setCompanyWeights] = useState(
    companySubFactors.reduce((acc, factor) => ({ ...acc, [factor.id]: factor.weight }), {})
  );
  
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileDescription, setNewProfileDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleMasterWeightChange = (type: 'founder' | 'company', value: number) => {
    if (type === 'founder') {
      setMasterWeights({ founder: value, company: 100 - value });
    } else {
      setMasterWeights({ founder: 100 - value, company: value });
    }
  };

  const handleSubFactorChange = (type: 'founder' | 'company', factorId: string, value: number) => {
    if (type === 'founder') {
      setFounderWeights(prev => ({ ...prev, [factorId]: value }));
    } else {
      setCompanyWeights(prev => ({ ...prev, [factorId]: value }));
    }
  };

  const handleCreateProfile = () => {
    if (!newProfileName.trim()) return;
    
    const newProfile = {
      id: newProfileName.toLowerCase().replace(/\s+/g, '-'),
      name: newProfileName,
      description: newProfileDescription,
      founderWeight: masterWeights.founder,
      companyWeight: masterWeights.company,
      active: false
    };
    
    setProfiles(prev => [...prev, newProfile]);
    setNewProfileName('');
    setNewProfileDescription('');
    setIsCreating(false);
    
    toast({
      title: "Profile Created",
      description: `${newProfileName} weighting profile has been created successfully.`,
    });
  };

  const handleActivateProfile = (profileId: string) => {
    setProfiles(prev => 
      prev.map(profile => ({ 
        ...profile, 
        active: profile.id === profileId 
      }))
    );
    
    const selectedProfile = profiles.find(p => p.id === profileId);
    if (selectedProfile) {
      setMasterWeights({
        founder: selectedProfile.founderWeight,
        company: selectedProfile.companyWeight
      });
    }
    
    toast({
      title: "Profile Activated",
      description: `${selectedProfile?.name} is now your active weighting profile.`,
    });
  };

  const handleDeleteProfile = (profileId: string) => {
    setProfiles(prev => prev.filter(profile => profile.id !== profileId));
    
    toast({
      title: "Profile Deleted",
      description: "Weighting profile has been deleted successfully.",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your factor weighting preferences have been saved successfully.",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
          Factor Settings
        </h1>
        <p className="text-muted-foreground">
          Configure evaluation criteria and weighting profiles
        </p>
      </div>

      {/* Master Weighting */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Master Weighting</span>
          </CardTitle>
          <CardDescription>
            Set the overall balance between founder and company evaluation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Founder vs Company Balance</Label>
              <div className="flex items-center space-x-4">
                <Badge variant="outline">Founder: {masterWeights.founder}%</Badge>
                <Badge variant="outline">Company: {masterWeights.company}%</Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Founder Weight</Label>
                  <span className="text-sm text-muted-foreground">{masterWeights.founder}%</span>
                </div>
                <Slider
                  value={[masterWeights.founder]}
                  onValueChange={([value]) => handleMasterWeightChange('founder', value)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Company Weight</Label>
                  <span className="text-sm text-muted-foreground">{masterWeights.company}%</span>
                </div>
                <Slider
                  value={[masterWeights.company]}
                  onValueChange={([value]) => handleMasterWeightChange('company', value)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weighting Profiles */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Weighting Profiles</span>
            </div>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="mr-1 h-3 w-3" />
                  New Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Weighting Profile</DialogTitle>
                  <DialogDescription>
                    Define a new weighting profile with custom settings
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name">Profile Name</Label>
                    <Input
                      id="profile-name"
                      placeholder="e.g., Conservative Growth"
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-description">Description</Label>
                    <Input
                      id="profile-description"
                      placeholder="Brief description of this profile..."
                      value={newProfileDescription}
                      onChange={(e) => setNewProfileDescription(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProfile}>Create Profile</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Predefined weighting configurations for different investment strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  profile.active
                    ? 'bg-primary/10 border-primary shadow-soft'
                    : 'bg-muted/20 border-border hover:border-primary/50'
                }`}
                onClick={() => handleActivateProfile(profile.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{profile.name}</h4>
                      {profile.active && (
                        <Badge variant="default" className="text-xs">Active</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{profile.description}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProfile(profile.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span>Founder: {profile.founderWeight}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-3 w-3 text-muted-foreground" />
                    <span>Company: {profile.companyWeight}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Factor Weights */}
      <Tabs defaultValue="founder" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="founder" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Founder Sub-Factors</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Company Sub-Factors</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="founder">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Founder Evaluation Sub-Factors</CardTitle>
              <CardDescription>
                Fine-tune the specific aspects of founder evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {founderSubFactors.map((factor) => (
                <div key={factor.id} className="space-y-2 p-4 rounded-lg border bg-muted/20">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{factor.name}</Label>
                    <Badge variant="outline" className="text-xs">
                      {founderWeights[factor.id]}%
                    </Badge>
                  </div>
                  <Slider
                    value={[founderWeights[factor.id]]}
                    onValueChange={([value]) => handleSubFactorChange('founder', factor.id, value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Company Evaluation Sub-Factors</CardTitle>
              <CardDescription>
                Fine-tune the specific aspects of company evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {companySubFactors.map((factor) => (
                <div key={factor.id} className="space-y-2 p-4 rounded-lg border bg-muted/20">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{factor.name}</Label>
                    <Badge variant="outline" className="text-xs">
                      {companyWeights[factor.id]}%
                    </Badge>
                  </div>
                  <Slider
                    value={[companyWeights[factor.id]]}
                    onValueChange={([value]) => handleSubFactorChange('company', factor.id, value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-gradient-primary hover:opacity-90">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};