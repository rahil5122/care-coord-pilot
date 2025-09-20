// Mock data for MediFlow Healthcare Workflow Orchestrator

export const mockPatients = [
  {
    id: "P001",
    name: "Sarah Johnson",
    age: 45,
    condition: "Type 2 Diabetes",
    lastVisit: "2025-09-18",
    status: 'critical' as const,
    glucose: 285,
    cholesterol: 180,
    bloodPressure: "145/95"
  },
  {
    id: "P002", 
    name: "Michael Chen",
    age: 62,
    condition: "Hypertension",
    lastVisit: "2025-09-15",
    status: 'warning' as const,
    glucose: 110,
    cholesterol: 245,
    bloodPressure: "150/90"
  },
  {
    id: "P003",
    name: "Emma Rodriguez",
    age: 34,
    condition: "Annual Checkup",
    lastVisit: "2025-09-19",
    status: 'stable' as const,
    glucose: 95,
    cholesterol: 165,
    bloodPressure: "120/80"
  },
  {
    id: "P004",
    name: "David Thompson",
    age: 58,
    condition: "Post-Surgery Follow-up",
    lastVisit: "2025-09-10",
    status: 'follow-up' as const,
    bloodPressure: "125/82"
  },
  {
    id: "P005",
    name: "Lisa Wang",
    age: 41,
    condition: "Hyperlipidemia",
    lastVisit: "2025-09-17",
    status: 'warning' as const,
    glucose: 105,
    cholesterol: 285,
    bloodPressure: "135/85"
  },
  {
    id: "P006",
    name: "Robert Miller",
    age: 67,
    condition: "Cardiac Monitoring",
    lastVisit: "2025-09-19",
    status: 'stable' as const,
    glucose: 100,
    cholesterol: 175,
    bloodPressure: "118/75"
  }
];

export const mockWorkflowEvents = [
  {
    id: "WF001",
    patientName: "Sarah Johnson",
    analysis: "Patient glucose level critically high at 285 mg/dL. Immediate intervention required. Previous medications may need adjustment.",
    severity: 'critical' as const,
    createdAt: "2025-09-20 08:30 AM",
    actions: [
      {
        type: 'notify_doctor' as const,
        method: 'slack_api' as const,
        message: "🚨 CRITICAL: Sarah Johnson glucose 285 mg/dL - Immediate review needed",
        status: 'completed' as const,
        timestamp: "08:31 AM"
      },
      {
        type: 'schedule_followup' as const,
        method: 'google_calendar' as const,
        message: "Emergency consultation scheduled for Sarah Johnson",
        date: "2025-09-20T14:00:00",
        status: 'completed' as const,
        timestamp: "08:32 AM"
      },
      {
        type: 'notify_patient' as const,
        method: 'twilio_sms' as const,
        message: "Urgent: Please come in for immediate glucose management. Appointment booked for 2PM today.",
        status: 'completed' as const,
        timestamp: "08:33 AM"
      }
    ]
  },
  {
    id: "WF002",
    patientName: "Michael Chen",
    analysis: "Cholesterol levels elevated at 245 mg/dL. Blood pressure trending upward. Recommend medication review and lifestyle counseling.",
    severity: 'follow-up' as const,
    createdAt: "2025-09-20 07:45 AM",
    actions: [
      {
        type: 'schedule_followup' as const,
        method: 'google_calendar' as const,
        message: "Cholesterol management consultation for Michael Chen",
        date: "2025-09-25T10:00:00",
        status: 'completed' as const,
        timestamp: "07:46 AM"
      },
      {
        type: 'send_summary' as const,
        method: 'sendgrid_email' as const,
        message: "Lab results and treatment recommendations sent to Dr. Martinez",
        status: 'completed' as const,
        timestamp: "07:48 AM"
      },
      {
        type: 'notify_patient' as const,
        method: 'twilio_sms' as const,
        message: "Your recent lab results show elevated cholesterol. Follow-up scheduled for Sep 25th at 10 AM.",
        status: 'pending' as const,
        timestamp: "07:50 AM"
      }
    ]
  },
  {
    id: "WF003",
    patientName: "Lisa Wang",
    analysis: "Significantly elevated cholesterol at 285 mg/dL requires immediate attention. Consider statin therapy adjustment.",
    severity: 'urgent' as const,
    createdAt: "2025-09-20 06:15 AM",
    actions: [
      {
        type: 'notify_doctor' as const,
        method: 'ms_teams' as const,
        message: "⚠️ Lisa Wang cholesterol 285 mg/dL - Medication review needed",
        status: 'completed' as const,
        timestamp: "06:16 AM"
      },
      {
        type: 'schedule_followup' as const,
        method: 'google_calendar' as const,
        message: "Urgent cardiology consultation for Lisa Wang",
        date: "2025-09-22T09:00:00",
        status: 'completed' as const,
        timestamp: "06:18 AM"
      }
    ]
  }
];

export const mockAlerts = [
  {
    id: "A001",
    type: 'critical' as const,
    title: "Critical Glucose Level",
    message: "Sarah Johnson's glucose level has reached 285 mg/dL, which is critically high and requires immediate medical intervention. Patient has been contacted and emergency appointment scheduled.",
    patientName: "Sarah Johnson",
    timestamp: "8:30 AM",
    acknowledged: false
  },
  {
    id: "A002",
    type: 'warning' as const,
    title: "Elevated Cholesterol",
    message: "Lisa Wang's cholesterol level of 285 mg/dL indicates significant cardiovascular risk. Recommend immediate medication review and lifestyle intervention.",
    patientName: "Lisa Wang", 
    timestamp: "6:15 AM",
    acknowledged: false
  },
  {
    id: "A003",
    type: 'info' as const,
    title: "Medication Refill Due",
    message: "Michael Chen's blood pressure medication is due for refill in 3 days. Automatic refill request has been sent to pharmacy.",
    patientName: "Michael Chen",
    timestamp: "Yesterday 4:22 PM",
    acknowledged: true
  },
  {
    id: "A004",
    type: 'warning' as const,
    title: "Missed Follow-up",
    message: "David Thompson missed his post-surgery follow-up appointment scheduled for September 18th. Rescheduling required.",
    patientName: "David Thompson",
    timestamp: "2 hours ago",
    acknowledged: false
  }
];