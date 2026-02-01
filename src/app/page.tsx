"use client";

import { useMutation, useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);
  return (
    <main>
      <div className="flex flex-col gap-2 p-4">
        <Button
          onClick={() =>
            createProject({
              name: "New Project",
            })
          }
        >
          Add new
        </Button>
        {projects?.map((project) => (
          <div className="border rounded p-2 flex flex-col" key={project._id}>
            <p>{project.name}</p>
            <p>Owner Id: {project.ownerId}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
