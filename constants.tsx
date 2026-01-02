
import React from 'react';

export const COLORS = {
  primary: '#6366f1',
  secondary: '#06b6d4',
  danger: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
  slate: {
    800: '#1e293b',
    900: '#0f172a'
  }
};

export const MOCK_METRICS: any[] = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  latency: 200 + Math.random() * 800,
  tokens: 1200 + Math.random() * 3000,
  accuracy: 94 + Math.random() * 5,
  embeddings: 40 + Math.random() * 100,
  infringements: Math.floor(Math.random() * 15)
}));

export const TELEMETRY_NODES = [
  { id: 'vertex', label: 'Vertex AI / Gemini', type: 'source', color: 'bg-indigo-500' },
  { id: 'logging', label: 'Cloud Logging', type: 'middleware', color: 'bg-blue-500' },
  { id: 'datadog', label: 'Datadog', type: 'aggregator', color: 'bg-purple-600' },
  { id: 'dashboard', label: 'Rights Monitor Dashboard', type: 'sink', color: 'bg-emerald-500' }
];

export const DATA_QUALITY_RULES = [
  {
    id: 'dq-001',
    name: 'Input Null Rate',
    category: 'Integrity',
    threshold: '< 2.0%',
    currentValue: 0.8,
    unit: '%',
    status: 'Healthy',
    description: 'Percentage of ingestion requests with missing artist metadata or primary assets.'
  },
  {
    id: 'dq-002',
    name: 'Schema Mismatch',
    category: 'Format',
    threshold: '< 1.0%',
    currentValue: 4.2,
    unit: '%',
    status: 'Critical',
    description: 'Detection of non-standard fingerprint formats transmitted to the embedding service.'
  },
  {
    id: 'dq-003',
    name: 'Anomaly Distribution',
    category: 'Statistical',
    threshold: '< 0.75 Score',
    currentValue: 0.62,
    unit: 'Score',
    status: 'Healthy',
    description: 'Mahalanobis distance check on incoming request embedding clusters.'
  },
  {
    id: 'dq-004',
    name: 'Vertex Payload Clipping',
    category: 'Performance',
    threshold: '< 5.0%',
    currentValue: 6.8,
    unit: '%',
    status: 'Warning',
    description: 'Frequency of input truncation due to Gemini token limit constraints.'
  },
  {
    id: 'dq-005',
    name: 'Duplicate Signature Rate',
    category: 'Integrity',
    threshold: '< 0.5%',
    currentValue: 0.12,
    unit: '%',
    status: 'Healthy',
    description: 'Rate of redundant fingerprint submissions within a sliding 60-minute window.'
  }
];
