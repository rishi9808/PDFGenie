"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function OnboardingCard() {
  const { steps, completedSteps, totalSteps, progressPercentage } = useOnboarding();

  if (completedSteps === totalSteps) {
    return null; // Hide when onboarding is complete
  }

  return (
    <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Get Started</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completedSteps}/{totalSteps}
          </span>
        </CardTitle>
        <CardDescription>
          Complete these steps to get the most out of PDFGenie
        </CardDescription>
        <Progress value={progressPercentage} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step) => (
          <div 
            key={step.id}
            className={`flex items-start space-x-3 p-3 rounded-lg ${
              step.completed 
                ? 'bg-green-500/10 border border-green-500/20' 
                : 'bg-gray-500/10 border border-gray-500/20'
            }`}
          >
            {step.completed ? (
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`font-medium ${step.completed ? 'text-green-700 dark:text-green-300' : ''}`}>
                {step.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
