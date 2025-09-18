import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  History, 
  Settings, 
  TrendingUp,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: 'New Evaluation',
    href: '/evaluation/new',
    icon: FileText,
    badge: null,
  },
  {
    name: 'Past Reports',
    href: '/reports',
    icon: History,
    badge: '12',
  },
  {
    name: 'Factor Settings',
    href: '/settings',
    icon: Settings,
    badge: null,
  },
  {
    name: 'Insights',
    href: '/insights',
    icon: TrendingUp,
    badge: 'New',
  },
];

export const Sidebar = () => {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-card/50 backdrop-blur">
      <div className="flex flex-1 flex-col overflow-y-auto pt-6 pb-4">
        <nav className="mt-6 flex-1 space-y-2 px-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted/80',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center">
                      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <Badge 
                          variant={isActive ? "secondary" : "outline"} 
                          className="text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto px-4">
          <div className="rounded-lg bg-gradient-primary p-4 text-primary-foreground">
            <div className="flex items-center mb-2">
              <BarChart3 className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Pro Analytics</span>
            </div>
            <p className="text-xs opacity-90 mb-3">
              Unlock advanced insights and custom weighting profiles
            </p>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white text-xs py-1.5 rounded-md transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};