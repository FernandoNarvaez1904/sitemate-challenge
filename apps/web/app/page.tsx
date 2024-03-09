"use client";

import { Button } from "@repo/shadcn/button";

import CreateIssueDialog from "./_components/create-issue-dialog";
import Issues from "./_components/issues";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-medium tracking-tight">Issue Tracker</h2>
          <CreateIssueDialog trigger={<Button>Create Issue</Button>} />
        </div>
        <div className="flex grow flex-wrap gap-2">
          <Issues />
        </div>
      </div>
    </div>
  );
}
