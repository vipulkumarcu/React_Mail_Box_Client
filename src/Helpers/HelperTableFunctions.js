import { useMemo } from "react";
import { headingIconMap } from "./HelperIconVariables";
import InboxJSON  from "../Data/Inbox.json";
import SentJSON   from "../Data/Sent.json";
import TrashJSON  from "../Data/Trash.json";

//----------Headings of the Table----------
export function tableHeadings ( folderLabel )
{
  let headings = Object.keys ( headingIconMap );

  if ( folderLabel === "Sent" || folderLabel === "Drafts" )
  {
    return headings = headings.filter ( heading => heading !== "From" && heading !== "Mail" );
  }

  else if ( folderLabel === "Inbox" || folderLabel === "Spam" )
  {
    return headings = headings.filter ( heading => heading !== "To" && heading !== "Mail" );
  }

  else if ( folderLabel === "Trash" )
  {
    return headings = headings.filter ( heading => heading !== "To" && heading !== "From" );
  }
}

//----------Date Formatting----------
export function formatDate ( date, type )
{
  switch ( type )
  {
    case "full":
     return new Date ( date ).toLocaleString ( undefined,
        {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );

    default:
      return new Date ( date ).toLocaleDateString ( undefined,
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  }
}

//----------Email Data Formatting----------
function formatEmailData ( rawObj )
{
  return Object.values ( rawObj ).map (
    ( e ) => (
      {
        id:           e.id,
        isRead:       e.is_read,
        receivedDate: e.received_date,
        sentDate:     e.sent_date,
        from:         e.sender_name,
        to:           e.receiver_name,
        emailId:      e.email_id,
        subject:      e.email_subject,
        message:      e.message,
        attachments:  e.attachment_count,
      }
    )
  );
}

//----------Email Data Filtering Hook----------
export default function useEmails ( folder, filter )
{
  /* Build the data map just once */
  const dataMap = useMemo (
    () => (
      {
        Inbox: formatEmailData ( InboxJSON ),
        Sent:  formatEmailData ( SentJSON ),
        Trash: formatEmailData ( TrashJSON ),
      }
    ), []
  );

  /* Folder-specific list + text filter */
  return useMemo (
    () => {
      const list  = dataMap[folder] ?? [];
      const term  = filter.trim ().toLowerCase ();

      return term
        ? list.filter (
            ( event ) =>
              event.subject.toLowerCase ().includes ( term ) ||
              event.from.toLowerCase ().includes ( term )
          )
        : list;
    }, [ dataMap, folder, filter ]
  );
}