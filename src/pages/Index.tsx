import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PatientsList } from "@/components/PatientsList";
import { MedicalRecordsList } from "@/components/MedicalRecordsList";
import { WorkflowsDashboard } from "@/components/WorkflowsDashboard";
import { AlertNotifications } from "@/components/AlertNotifications";
import { mockAlerts } from "@/data/mockData";
import { Activity, Brain, Users, AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePatients } from "@/hooks/usePatients";

const Index = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const { toast } = useToast();
  const { patients, loading: patientsLoading } = usePatients();

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
    toast({
      title: "Alert Acknowledged",
      description: "Alert has been marked as acknowledged.",
    });
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    toast({
      title: "Alert Dismissed", 
      description: "Alert has been removed from the system.",
    });
  };

  const totalPatients = patients.length;
  const activeAlerts = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground shadow-[var(--shadow-medical)]">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Brain className="h-8 w-8" />
                MediFlow
              </h1>
              <p className="text-primary-foreground/90 mt-1">Healthcare Workflow Orchestrator AI</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Activity className="h-4 w-4 mr-2" />
                System Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-medical)] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold text-primary">{patientsLoading ? '...' : totalPatients}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-medical)] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold text-warning">{activeAlerts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-medical)] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">System Status</p>
                  <p className="text-2xl font-bold text-success">Active</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="space-y-8">
          <AlertNotifications 
            alerts={alerts}
            onAcknowledge={handleAcknowledgeAlert}
            onDismiss={handleDismissAlert}
          />
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <PatientsList />
            <MedicalRecordsList />
          </div>
          
          <WorkflowsDashboard />
        </div>

        {/* JSON Output Example */}
        <Card className="mt-8 border-0 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Example AI Response JSON
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
{`{
  "analysis": "Patient glucose is critically high at 285 mg/dL",
  "actions": [
    {
      "type": "notify_doctor",
      "method": "slack_api", 
      "message": "🚨 Critical glucose alert - Sarah Johnson"
    },
    {
      "type": "schedule_followup",
      "method": "google_calendar",
      "date": "2025-09-20T14:00:00"
    },
    {
      "type": "notify_patient", 
      "method": "twilio_sms",
      "message": "Urgent: Please see your doctor. Appointment booked."
    }
  ]
}`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;