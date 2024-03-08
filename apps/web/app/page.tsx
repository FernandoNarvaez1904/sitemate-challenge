import CreateIssueFrom from "./_components/create-issue-form";

export default function Home() {
  return (
    <div>
      <div className="flex">
        <h2 className="text-lg">Create New Issue</h2>
        <CreateIssueFrom />
      </div>
    </div>
  );
}
