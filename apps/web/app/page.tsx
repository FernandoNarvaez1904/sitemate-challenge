"use client";

import { Button } from "@repo/shadcn/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn/card";

import CreateIssueFrom from "./_components/create-issue-form";
import { trpc } from "./_trpc/trpc";

export default function Home() {
  const { data } = trpc.getAllIssues.useQuery();

  const trpcUtils = trpc.useUtils();

  const { mutate: deleteIssue } = trpc.deleteIssue.useMutation({
    onSettled: () => {
      void trpcUtils.getAllIssues.invalidate();
    },
  });

  return (
    <div>
      <div className="flex flex-col gap-2">
        <CreateIssueFrom />
        <div className="flex grow flex-wrap gap-2">
          {data?.map((issue) => (
            <Card key={issue.id} className="">
              <CardHeader>
                <CardTitle>{issue.title}</CardTitle>
              </CardHeader>
              <CardContent>{issue.description}</CardContent>
              <CardFooter>
                <Button onClick={() => deleteIssue({ id: issue.id })}>
                  Delete Issue
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
