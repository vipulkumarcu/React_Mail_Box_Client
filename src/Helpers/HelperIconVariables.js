import { Send, FileText, Star, Archive, Inbox, MessageSquareWarning, Trash2, Calendar, Trash, MailCheck, AtSign, Image, FileArchive, FileAudio, FileVideo, FileSpreadsheet, } from "lucide-react";


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
  From: <AtSign size = { 20 } />,
  To: <AtSign size = { 20 } />,
  Mail: <AtSign size = { 20 } />,
  Subject: <FileText size = { 20 } />,
  " ": <Trash size = { 20 } />,
}


//----------Attachment Icons----------
export const attachmentIcons = {
  pdf:     FileText,
  txt:     FileText,
  doc:     FileText,
  docx:    FileText,
  ppt:     FileText,
  pptx:    FileText,
  xls:     FileSpreadsheet,
  xlsx:    FileSpreadsheet,
  csv:     FileSpreadsheet,
  zip:     FileArchive,
  rar:     FileArchive,
  mp3:     FileAudio,
  wav:     FileAudio,
  mp4:     FileVideo,
  mov:     FileVideo,
  jpg:     Image,
  jpeg:    Image,
  png:     Image,
  gif:     Image,
  img:     Image,
  heic:    Image,
  default: FileText
};