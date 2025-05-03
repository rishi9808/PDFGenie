"use client";
import { UploadPdfButtton } from "@/components/dashboard/UploadPdfButton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";


const Dashboard = () => {
  const userId = localStorage.getItem("userId");
  const router = useRouter();

  const workspaces = useQuery(api.workspace.listWorkspaces, {
    userId: userId as Id<"users">,
  });
  if (!workspaces) {
    return <div>Loading...</div>;
  }
  console.log("workspaces", workspaces.data);

  if (workspaces.data.length === 0) {
    return (
      <div className="flex flex-col h-screen container mx-auto p-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">No workspaces found</h1>
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
