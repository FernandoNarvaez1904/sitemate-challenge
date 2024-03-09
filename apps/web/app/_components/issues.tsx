import { useMemo } from "react";
import { trpc } from "app/_trpc/trpc";
import { FileEdit, Trash2 } from "lucide-react";

import { Button } from "@repo/shadcn/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn/card";

import UpdateIssueDialog from "./update-issue-dialog";

function Issues() {
  const [data] = trpc.getAllIssues.useSuspenseQuery();

  const trpcUtils = trpc.useUtils();

  const { mutate: deleteIssue } = trpc.deleteIssue.useMutation({
    onSettled: () => {
      void trpcUtils.getAllIssues.invalidate();
    },
  });

  const issues = useMemo(() => {
    const issuesCards = data.map((issue) => (
      <Card key={issue.id} className="flex w-64 flex-col">
        <CardHeader>
          <CardTitle>{issue.title}</CardTitle>
        </CardHeader>
        <CardContent className="grow">
          <p className="text-wrap break-all">{issue.description}</p>
        </CardContent>
        <CardFooter className="space-x-2">
          <Button
            onClick={() => deleteIssue({ id: issue.id })}
            variant={"destructive"}
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
          <UpdateIssueDialog
            id={issue.id}
            defaultData={issue}
            trigger={
              <Button variant={"secondary"}>
                <FileEdit className="mr-2 size-4" />
                Update
              </Button>
            }
          />
        </CardFooter>
      </Card>
    ));
    return issuesCards;
  }, [data, deleteIssue]);

  return <>{issues}</>;
}

export default Issues;
