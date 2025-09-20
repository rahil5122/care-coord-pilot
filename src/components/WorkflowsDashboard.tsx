import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Calendar, User, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { usePatientWorkflows } from "@/hooks/usePatientWorkflows";
import { Skeleton } from "@/components/ui/skeleton";

export const WorkflowsDashboard = () => {
  const { workflows, loading, error } = usePatientWorkflows();

  if (loading) {
    return (
      <Card className="border-0 shadow-[var(--shadow-medical)]">
        <CardHeader className="bg-gradient-to-r from-accent to-primary text-accent-foreground">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Patient Workflows
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border border-border">
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2 mb-3" />
                  <Skeleton className="h-2 w-full mb-3" />
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-0 shadow-[var(--shadow-medical)]">
        <CardContent className="p-6">
          <p className="text-destructive">Error loading workflows: {error}</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'success';
      case 'in_progress': return 'info';
      case 'pending': return 'warning';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const calculateProgress = (tasks: any[]) => {
    if (!tasks || tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    return (completedTasks / tasks.length) * 100;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="border-0 shadow-[var(--shadow-medical)]">
      <CardHeader className="bg-gradient-to-r from-accent to-primary text-accent-foreground">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Patient Workflows ({workflows.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {workflows.map((workflow) => (
            <Card key={workflow.id} className="border border-border hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-foreground">
                        {workflow.workflows.name}
                      </h4>
                      <Badge 
                        variant={getStatusColor(workflow.status) as any}
                        className="flex items-center gap-1"
                      >
                        {getStatusIcon(workflow.status)}
                        {workflow.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>
                          {workflow.patients.profiles.first_name} {workflow.patients.profiles.last_name}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Assigned: {formatDate(workflow.assigned_at)}</span>
                      </div>
                      
                      {workflow.completed_at && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Completed: {formatDate(workflow.completed_at)}</span>
                        </div>
                      )}
                    </div>
                    
                    {workflow.workflows.description && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {workflow.workflows.description}
                      </p>
                    )}
                  </div>
                </div>

                {workflow.patient_workflow_tasks && workflow.patient_workflow_tasks.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">Progress</p>
                      <span className="text-sm text-muted-foreground">
                        {workflow.patient_workflow_tasks.filter(t => t.status === 'completed').length}/
                        {workflow.patient_workflow_tasks.length} tasks
                      </span>
                    </div>
                    
                    <Progress 
                      value={calculateProgress(workflow.patient_workflow_tasks)} 
                      className="mb-3"
                    />
                    
                    <div className="space-y-2">
                      {workflow.patient_workflow_tasks
                        .sort((a, b) => a.workflow_tasks.step_order - b.workflow_tasks.step_order)
                        .map((task) => (
                          <div 
                            key={task.id} 
                            className="flex items-center justify-between p-2 bg-secondary/30 rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-muted-foreground w-6">
                                {task.workflow_tasks.step_order}
                              </div>
                              <span className="text-sm font-medium text-foreground">
                                {task.workflow_tasks.task_name}
                              </span>
                              {task.workflow_tasks.description && (
                                <span className="text-xs text-muted-foreground">
                                  - {task.workflow_tasks.description}
                                </span>
                              )}
                            </div>
                            <Badge 
                              variant={getStatusColor(task.status) as any}
                              className="text-xs"
                            >
                              {task.status}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {workflows.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No workflows found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};