import { Send, FileText, Star, Archive, Inbox, MessageSquareWarning, Trash2, Calendar, MailOpen, Trash, MailCheck } from "lucide-react";

//----------Content && Sidebar----------
export const iconsMap = {
  Inbox: Inbox,
  Sent: Send,
  Drafts: FileText,
  Spam: MessageSquareWarning,
  Trash: Trash2,
  Starred: Star,
  Archive: Archive,
};

//----------Table----------
export const headingIconMap = {
  "": <MailCheck size = { 20 } />,
  Date: <Calendar size = { 20 } />,
  From: <MailOpen size = { 20 } />,
  Subject: <FileText size = { 20 } />,
  " ": <Trash size = { 20 } />,
}