import { Inbox, Send, Archive, FileText, Trash2, Star, MessageSquareWarning, MailPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import EmptyState from "../EmptyState/EmptyState";
import Table from "../Table/Table";

// icon map
const icon = {
  Inbox: Inbox,
  Sent: Send,
  Drafts: FileText,
  Spam: MessageSquareWarning,
  Trash: Trash2,
  Starred: Star,
  Archive: Archive,
};

function Content ( { emails, page, perPage, onPaginate, folderLabel } )
{
  const navigate = useNavigate ();
  const FolderIcon = icon[ folderLabel ] ?? Inbox;

  // slice for current page
  const totalPages = Math.max ( 1, Math.ceil ( emails.length / perPage ) );
  const start = ( page - 1 ) * perPage;
  const pageEmails  = emails.slice ( start, start + perPage );

  return (
    <main className = "p-6 overflow-hidden" >

      {/* header */}
      <div className = "flex items-center justify-between mb-6" >

        <div
          className = "inline-flex shadow-lg items-center gap-2 bg-indigo-600/10 text-indigo-800 px-5 py-3 rounded-full"
        >
          <FolderIcon size = { 22 } />
          <span className = "font-semibold text-lg tracking-wide" > { folderLabel } </span>
        </div>

        <Button
          buttonText = {
            <span className = "flex items-center gap-2" >
              <MailPlus size = { 18 } /> Compose
            </span>
          }
          className = "bg-gradient-to-r from-fuchsia-400 to-pink-600 text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:shadow-xl hover:scale-105 transition"
          onClick = { () => navigate ( "/compose-email" ) }
        />

      </div>

      <div className="rounded-2xl shadow-lg ring-1 ring-indigo-100 overflow-hidden bg-white">

        {
          pageEmails.length
          ? (
            <>
              <Table emails = { pageEmails } />
              {/* <Table emails = { pageEmails } onDelete = { handleDelete } /> */}
              <div className = "flex items-center justify-between px-8 py-4 bg-white" >

                <Button
                  buttonText = {
                    <span className = "flex items-center gap-1" >
                      <ChevronLeft size = { 16 } /> Prev
                    </span>
                  }
                  className = "text-indigo-600 font-medium hover:text-indigo-800 disabled:opacity-30"
                  onClick = { () => onPaginate ( "prev" ) }
                  disabled = { page === 1 }
                />

                <span className = "text-sm font-semibold text-gray-600" >
                  { page } / { totalPages }
                </span>

                <Button
                  buttonText = {
                    <span className = "flex items-center gap-1" >
                      Next <ChevronRight size = { 16 } />
                    </span>
                  }
                  className = "text-indigo-600 font-medium hover:text-indigo-800 disabled:opacity-30"
                  onClick = { () => onPaginate ( "next" ) }
                  disabled = { page >= totalPages }
                />

              </div>
            </>
            )
          : <EmptyState folder = { folderLabel } />
        }

      </div>

    </main>
  );
}

export default Content;