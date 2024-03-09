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

import type { UpdateIssueFormProps } from "./update-issue-form";
import UpdateIssueForm from "./update-issue-form";

interface UpdateIssueDialogForm extends UpdateIssueFormProps {
  trigger: ReactNode;
}

function UpdateIssueDialog(props: UpdateIssueDialogForm) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Create Issue</DialogTitle>
        </DialogHeader>
        <UpdateIssueForm onSuccess={() => setOpen(false)} {...props} />
      </DialogContent>
    </Dialog>
  );
}

export default UpdateIssueDialog;
