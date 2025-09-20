import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, MapPin, Phone, Mail } from "lucide-react";
import { usePatients } from "@/hooks/usePatients";
import { Skeleton } from "@/components/ui/skeleton";

export const PatientsList = () => {
  const { patients, loading, error } = usePatients();

  if (loading) {
    return (
      <Card className="border-0 shadow-[var(--shadow-medical)]">
        <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Patients
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border border-border">
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2 mb-1" />
                  <Skeleton className="h-3 w-2/3 mb-1" />
                  <Skeleton className="h-3 w-1/2" />
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
          <p className="text-destructive">Error loading patients: {error}</p>
        </CardContent>
      </Card>
    );
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Card className="border-0 shadow-[var(--shadow-medical)]">
      <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Patients ({patients.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <Card key={patient.id} className="border border-border hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">
                    {patient.profiles.first_name} {patient.profiles.last_name}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {patient.profiles.role}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>Age: {calculateAge(patient.date_of_birth)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span>{patient.gender}</span>
                  </div>
                  
                  {patient.profiles.phone_number && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      <span className="text-xs">{patient.profiles.phone_number}</span>
                    </div>
                  )}
                  
                  {patient.profiles.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      <span className="text-xs">{patient.profiles.email}</span>
                    </div>
                  )}
                  
                  {patient.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{patient.address}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {patients.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No patients found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};