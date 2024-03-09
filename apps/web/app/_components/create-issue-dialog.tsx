"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/shadcn/dialog";

import CreateIssueForm from "./create-issue-form";

interface CreateIssueDialogProps {
  trigger: ReactNode;
}

function CreateIssueDialog(props: CreateIssueDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Create Issue</DialogTitle>
        </DialogHeader>
        <CreateIssueForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateIssueDialog;
