import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, User } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  status: 'critical' | 'warning' | 'stable' | 'follow-up';
  glucose?: number;
  cholesterol?: number;
  bloodPressure?: string;
}

interface PatientDashboardProps {
  patients: Patient[];
}

export const PatientDashboard = ({ patients }: PatientDashboardProps) => {
  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      case 'stable': return 'success';
      case 'follow-up': return 'info';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: Patient['status']) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <Clock className="h-4 w-4" />;
      case 'stable': return <CheckCircle className="h-4 w-4" />;
      case 'follow-up': return <User className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-[var(--shadow-medical)]">
        <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Active Patients
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patients.map((patient) => (
              <Card key={patient.id} className="border border-border hover:shadow-[var(--shadow-card)] transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{patient.name}</h3>
                    <Badge 
                      variant={getStatusColor(patient.status) as any}
                      className="flex items-center gap-1"
                    >
                      {getStatusIcon(patient.status)}
                      {patient.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-medium">Age:</span> {patient.age}</p>
                    <p><span className="font-medium">Condition:</span> {patient.condition}</p>
                    <p><span className="font-medium">Last Visit:</span> {patient.lastVisit}</p>
                    
                    {patient.glucose && (
                      <div className="pt-2 border-t border-border">
                        <p><span className="font-medium">Glucose:</span> <span className={patient.glucose > 140 ? 'text-destructive font-bold' : 'text-success'}>{patient.glucose} mg/dL</span></p>
                      </div>
                    )}
                    
                    {patient.cholesterol && (
                      <p><span className="font-medium">Cholesterol:</span> <span className={patient.cholesterol > 200 ? 'text-warning font-bold' : 'text-success'}>{patient.cholesterol} mg/dL</span></p>
                    )}
                    
                    {patient.bloodPressure && (
                      <p><span className="font-medium">BP:</span> {patient.bloodPressure}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};