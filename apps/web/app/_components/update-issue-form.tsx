"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "app/_trpc/trpc";
import { RotateCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@repo/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/shadcn/form";
import { Input } from "@repo/shadcn/input";
import { Textarea } from "@repo/shadcn/textarea";

const updateFormSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export interface UpdateIssueFormProps {
  onSuccess?: () => void;
  id: number;
  defaultData: z.infer<typeof updateFormSchema>;
}

function UpdateIssueForm({ onSuccess, id, defaultData }: UpdateIssueFormProps) {
  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: defaultData,
  });

  const trpcUtils = trpc.useUtils();

  const { mutate: updateIssue, isPending } = trpc.updateIssue.useMutation({
    onSuccess: () => {
      void trpcUtils.getAllIssues.refetch();
      form.reset();
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    updateIssue({ id: id, data });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="My Issue" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="My Issue is..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending || !form.formState.isDirty}>
          {isPending && <RotateCw className="mr-2 size-4 animate-spin" />}
          Update Issue
        </Button>
      </form>
    </Form>
  );
}
export default UpdateIssueForm;
