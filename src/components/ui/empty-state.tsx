import { Search } from "lucide-react";

type EmptyStateProps = {
  title: string;
  body: string;
  onReset: () => void;
};

export function EmptyState({ title, body, onReset }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <Search aria-hidden="true" />
      <h2>{title}</h2>
      <p>{body}</p>
      <button className="standard-action" type="button" onClick={onReset}>
        Clear search
      </button>
    </div>
  );
}
