import { headingIconMap } from "./HelperIconVariables";

//----------Headings of the Table----------
export function tableHeadings ( folder )
{
  let headings = Object.keys ( headingIconMap );

  if  ( [ "Sent", "Drafts" ].includes ( folder ) )
  {
    return headings = headings.filter ( heading => heading !== "From" && heading !== "Mail" && heading !== "  " );
  }

  else if ( [ "Inbox", "Spam" ].includes ( folder ) )
  {
    return headings = headings.filter ( heading => heading !== "To" && heading !== "Mail" && heading !== "  " );
  }

  else if ( [ "Trash" ].includes ( folder ) )
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
export function formatEmailData ( rawObj )
{
  return Object.values ( rawObj ).map (
    ( event ) => (
      {
        $id: event.$id,
        timestamp: event.timestamp,
        subject: event.subject,
        body: event.body,
        senderName: event.senderName,
        senderEmail:event.senderEmail,
        receiverName: event.receiverName,
        receiverEmail: event.receiverEmail,
        attachments: event.attachments,
        isRead: event.isRead,
      }
    )
  );
}

//----------Email Contact To Display----------
export function getDisplayContact ( email, folder )
{
  const effectiveFolder = folder === "Trash"
    ? email.originalFolder || "Inbox"   // default to Inbox viewpoint
    : folder;

  const isInbox = effectiveFolder === "Inbox";
  const isSent  = effectiveFolder === "Sent";

  const displayName = isInbox || isSent
    ? isInbox
      ? email.senderName
      : email.receiverName
    : email.senderName || email.receiverName;

  const displayEmail = isInbox || isSent
    ? isInbox
      ? email.senderEmail
      : email.receiverEmail
    : email.senderEmail || email.receiverEmail;

  return { displayName, displayEmail };
}