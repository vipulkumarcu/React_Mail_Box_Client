import { headingIconMap } from "./HelperIconVariables";

//----------Headings of the Table----------
export function tableHeadings ( folder )
{
  let headings = Object.keys ( headingIconMap );

  if  ( [ "Sent", "Drafts" ].includes ( folder ) )
  {
    return headings = headings.filter ( heading => heading !== "From" && heading !== "Mail" );
  }

  else if ( [ "Inbox", "Spam" ].includes ( folder ) )
  {
    return headings = headings.filter ( heading => heading !== "To" && heading !== "Mail" );
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