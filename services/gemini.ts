
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAutomatedRootCauseAnalysis = async (incidentJson: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As an AI Observability Specialist, analyze this incident data and provide a concise Root Cause Analysis and specific remediation steps. 
      Incident Data: ${incidentJson}
      Format: Return as JSON with "rootCause" and "remediation" fields.`,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      rootCause: "Anomalous prompt behavior detected in Vertex AI latency spikes.",
      remediation: "Scale Cloud Run instances and check Vertex AI quota limits."
    };
  }
};
