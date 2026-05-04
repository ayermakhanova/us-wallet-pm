import { ExternalLink } from "lucide-react";

export const JIRA_WEB_URL = "https://euronet.atlassian.net";
export const JIRA_KEY_PATTERN = /^[A-Z][A-Z0-9_]+-\d+$/;

/** Returns the Jira issue URL for an ID matching the Jira-key pattern, else null. */
export function getJiraUrl(id: string): string | null {
  return JIRA_KEY_PATTERN.test(id) ? `${JIRA_WEB_URL}/browse/${id}` : null;
}

interface JiraLinkProps {
  id: string;
  className?: string;
  /** When true, render with an external-link icon next to the key */
  withIcon?: boolean;
}

/**
 * Renders a Jira issue key as a clickable link to euronet.atlassian.net/browse/{key}
 * if it matches the Jira pattern (e.g., "RPMO-2273", "OM-17620"); otherwise renders
 * the key as plain text.
 */
export function JiraLink({ id, className, withIcon = false }: JiraLinkProps) {
  if (!JIRA_KEY_PATTERN.test(id)) {
    return <span className={className}>{id}</span>;
  }
  const url = `${JIRA_WEB_URL}/browse/${id}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`${className ?? ""} hover:underline hover:text-blue-600 transition-colors inline-flex items-center gap-1`}
      title={`Open ${id} in Jira`}
    >
      {id}
      {withIcon && <ExternalLink size={11} />}
    </a>
  );
}
