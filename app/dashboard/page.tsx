"use client";
import { UploadPdfButtton } from "@/components/dashboard/UploadPdfButton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/use-user-data";

const Dashboard = () => {
  const router = useRouter();
  const { internalUserId, isInitialized, isSignedIn } = useUserData();
  
  const workspaces = useQuery(
    api.workspace.listWorkspaces,
    internalUserId ? { userId: internalUserId as Id<"users"> } : "skip"
  );

  // Redirect to sign-in if not authenticated
  if (isInitialized && !isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  // Show loading state
  if (!isInitialized || !internalUserId) {
    return (
      <div className="flex flex-col h-screen container mx-auto p-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Loading...</h1>
            <p className="text-muted-foreground">Setting up your workspace</p>
          </div>
        </div>
      </div>
    );
  }

  if (!workspaces) {
    return (
      <div className="flex flex-col h-screen container mx-auto p-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Loading workspaces...</h1>
          </div>
        </div>
      </div>
    );
  }
  console.log("workspaces", workspaces.data);

  if (workspaces.data.length === 0) {
    return (
      <div className="flex flex-col h-screen container mx-auto p-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">No workspaces found</h1>
            <p className="text-muted-foreground mb-4">Create your first workspace to get started</p>
            <UploadPdfButtton variant="Workspace" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen container mx-auto p-4">
     
      
      {/* Your main content goes here */}
      <h1 className="text-2xl font-bold">Your Workspace</h1>
      <div className="grid grid-cols-3 gap-7 py-7 px-5">
        <div className="flex flex-col items-center justify-center">
          <UploadPdfButtton variant="Workspace" />
        </div>
        {workspaces.data.map((workspace) => (
          <div
            key={workspace._id.toString()}
            className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md"
            onClick={() => {
              router.push("/workspace/" + workspace.fileId);
            }
            }
          >
            <File className="h-16 w-16 text-gray-500" />
            <h2 className="text-lg font-semibold">{workspace.fileName}</h2>
            <p className="text-sm text-gray-600">
              {new Date(workspace._creationTime).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
