import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, CheckCircle, X, Eye } from "lucide-react";
import { useState } from "react";

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  patientName: string;
  timestamp: string;
  acknowledged: boolean;
}

interface AlertNotificationsProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
  onDismiss: (alertId: string) => void;
}

export const AlertNotifications = ({ alerts, onAcknowledge, onDismiss }: AlertNotificationsProps) => {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'secondary';
    }
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'info': return <Bell className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged);

  return (
    <div className="space-y-6">
      {unacknowledgedAlerts.length > 0 && (
        <Card className="border-0 shadow-[var(--shadow-medical)] border-l-4 border-l-destructive">
          <CardHeader className="bg-gradient-to-r from-destructive/10 to-warning/10">
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Active Alerts ({unacknowledgedAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {unacknowledgedAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border border-border rounded-lg bg-card hover:shadow-[var(--shadow-card)] transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Badge variant={getAlertColor(alert.type) as any} className="flex items-center gap-1">
                        {getAlertIcon(alert.type)}
                        {alert.type}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {alert.patientName} • {alert.timestamp}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAcknowledge(alert.id)}
                        className="h-8 w-8 p-0 text-success hover:text-success"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDismiss(alert.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {expandedAlert === alert.id && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm text-foreground bg-muted p-3 rounded-md">
                        {alert.message}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {acknowledgedAlerts.length > 0 && (
        <Card className="border-0 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="h-5 w-5" />
              Acknowledged Alerts ({acknowledgedAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-2">
              {acknowledgedAlerts.map((alert) => (
                <div key={alert.id} className="p-3 bg-muted/30 rounded-md opacity-75">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs">
                        acknowledged
                      </Badge>
                      <span className="text-sm font-medium text-muted-foreground">{alert.title}</span>
                      <span className="text-xs text-muted-foreground">• {alert.patientName}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};