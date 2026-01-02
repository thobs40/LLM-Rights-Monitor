
export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum IncidentStatus {
  OPEN = 'OPEN',
  INVESTIGATING = 'INVESTIGATING',
  RESOLVED = 'RESOLVED'
}

export interface MetricData {
  time: string;
  latency: number;
  tokens: number;
  accuracy: number;
  embeddings: number;
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: IncidentStatus;
  timestamp: string;
  affectedArtist: string;
  missedDetections: number;
  remediationSteps?: string;
}

export interface AlertRule {
  id: string;
  name: string;
  threshold: string;
  currentValue: number;
  isTriggered: boolean;
}
