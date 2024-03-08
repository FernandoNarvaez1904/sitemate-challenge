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

const createFormSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

function CreateIssueFrom() {
  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
  });

  const trpcUtils = trpc.useUtils();

  const { mutate: createIssue, isPending } = trpc.createIssue.useMutation({
    onSuccess: () => {
      void trpcUtils.getAllIssues.refetch();
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    createIssue(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex items-center  gap-2 space-y-2">
        <h2 className="text-lg">Create New Issue</h2>
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
        <Button type="submit" disabled={isPending}>
          {isPending && <RotateCw className="mr-2 size-4 animate-spin" />}
          Create Issue
        </Button>
      </form>
    </Form>
  );
}
export default CreateIssueFrom;
