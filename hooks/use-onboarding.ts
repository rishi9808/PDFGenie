"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export function useOnboarding() {
  const { user } = useUser();
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: "profile-complete",
      title: "Complete your profile",
      description: "Add your name and profile picture",
      completed: false,
    },
    {
      id: "first-pdf-upload",
      title: "Upload your first PDF",
      description: "Start by uploading a PDF document",
      completed: false,
    },
    {
      id: "first-chat",
      title: "Ask your first question",
      description: "Try chatting with your uploaded PDF",
      completed: false,
    },
  ]);

  const [completedSteps, setCompletedSteps] = useState(0);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  useEffect(() => {
    if (user) {
      // Check profile completion
      const profileComplete = !!(user.firstName && user.lastName);
      
      // Update steps based on user data
      setSteps(prevSteps => 
        prevSteps.map(step => {
          if (step.id === "profile-complete") {
            return { ...step, completed: profileComplete };
          }
          // Add other checks for PDF upload and chat history
          return step;
        })
      );
    }
  }, [user]);

  useEffect(() => {
    const completed = steps.filter(step => step.completed).length;
    setCompletedSteps(completed);
    setIsOnboardingComplete(completed === steps.length);
  }, [steps]);

  const completeStep = (stepId: string) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === stepId ? { ...step, completed: true } : step
      )
    );
  };

  const resetOnboarding = () => {
    setSteps(prevSteps =>
      prevSteps.map(step => ({ ...step, completed: false }))
    );
  };

  return {
    steps,
    completedSteps,
    totalSteps: steps.length,
    isOnboardingComplete,
    completeStep,
    resetOnboarding,
    progressPercentage: (completedSteps / steps.length) * 100,
  };
}
