import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, User, Stethoscope } from "lucide-react";
import { useMedicalRecords } from "@/hooks/useMedicalRecords";
import { Skeleton } from "@/components/ui/skeleton";

export const MedicalRecordsList = () => {
  const { records, loading, error } = useMedicalRecords();

  if (loading) {
    return (
      <Card className="border-0 shadow-[var(--shadow-medical)]">
        <CardHeader className="bg-gradient-to-r from-accent to-primary text-accent-foreground">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Medical Records
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="border border-border">
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2 mb-1" />
                  <Skeleton className="h-3 w-2/3 mb-1" />
                  <Skeleton className="h-16 w-full" />
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
          <p className="text-destructive">Error loading medical records: {error}</p>
        </CardContent>
      </Card>
    );
  }

  const getRecordTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'lab_result': return 'info';
      case 'diagnosis': return 'warning';
      case 'prescription': return 'success';
      case 'consultation': return 'secondary';
      default: return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="border-0 shadow-[var(--shadow-medical)]">
      <CardHeader className="bg-gradient-to-r from-accent to-primary text-accent-foreground">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Medical Records ({records.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {records.map((record) => (
            <Card key={record.id} className="border border-border hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getRecordTypeColor(record.record_type) as any}>
                        {record.record_type?.replace('_', ' ') || 'General'}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(record.created_at)}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      {record.patients?.profiles && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>
                            {record.patients.profiles.first_name} {record.patients.profiles.last_name}
                          </span>
                        </div>
                      )}
                      
                      {record.providers?.profiles && (
                        <div className="flex items-center gap-1">
                          <Stethoscope className="h-3 w-3" />
                          <span>
                            Dr. {record.providers.profiles.first_name} {record.providers.profiles.last_name}
                            {record.providers.specialty && ` (${record.providers.specialty})`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {record.content && (
                  <div className="bg-muted p-3 rounded-md">
                    <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                      {typeof record.content === 'string' 
                        ? record.content 
                        : JSON.stringify(record.content, null, 2)
                      }
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {records.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No medical records found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};