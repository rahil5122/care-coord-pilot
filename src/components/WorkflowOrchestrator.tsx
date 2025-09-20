import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Calendar, MessageSquare, Mail, Slack, AlertCircle } from "lucide-react";

interface WorkflowAction {
  type: 'notify_doctor' | 'schedule_followup' | 'notify_patient' | 'send_summary' | 'escalate';
  method: 'slack_api' | 'google_calendar' | 'twilio_sms' | 'sendgrid_email' | 'ms_teams';
  message: string;
  date?: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
}

interface WorkflowEvent {
  id: string;
  patientName: string;
  analysis: string;
  severity: 'routine' | 'follow-up' | 'urgent' | 'critical';
  actions: WorkflowAction[];
  createdAt: string;
}

interface WorkflowOrchestratorProps {
  events: WorkflowEvent[];
}

export const WorkflowOrchestrator = ({ events }: WorkflowOrchestratorProps) => {
  const getActionIcon = (method: WorkflowAction['method']) => {
    switch (method) {
      case 'slack_api': return <Slack className="h-4 w-4" />;
      case 'google_calendar': return <Calendar className="h-4 w-4" />;
      case 'twilio_sms': return <MessageSquare className="h-4 w-4" />;
      case 'sendgrid_email': return <Mail className="h-4 w-4" />;
      case 'ms_teams': return <MessageSquare className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: WorkflowEvent['severity']) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'urgent': return 'warning';
      case 'follow-up': return 'info';
      case 'routine': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: WorkflowAction['status']) => {
    switch (status) {
      case 'completed': return 'success';
      case 'failed': return 'destructive';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <Card className="border-0 shadow-[var(--shadow-medical)]">
      <CardHeader className="bg-gradient-to-r from-accent to-primary text-accent-foreground">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Workflow Orchestrator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="border border-border hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{event.patientName}</h4>
                    <p className="text-sm text-muted-foreground">{event.createdAt}</p>
                  </div>
                  <Badge variant={getSeverityColor(event.severity) as any}>
                    {event.severity}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">AI Analysis:</p>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    {event.analysis}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Orchestrated Actions:</p>
                  <div className="space-y-2">
                    {event.actions.map((action, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                        <div className="flex items-center gap-3">
                          {getActionIcon(action.method)}
                          <div>
                            <p className="text-sm font-medium text-foreground">{action.type.replace('_', ' ')}</p>
                            <p className="text-xs text-muted-foreground">{action.message}</p>
                            {action.date && (
                              <p className="text-xs text-info font-medium mt-1">Scheduled: {action.date}</p>
                            )}
                          </div>
                        </div>
                        <Badge variant={getStatusColor(action.status) as any} className="text-xs">
                          {action.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};