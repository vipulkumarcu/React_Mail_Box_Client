import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectFolder, selectPage, selectPageSlice, selectTotalPages, setCurrentPage } from "../../Features/MailSlice";
import { iconsMap } from "../../Helpers/HelperIconVariables";
import { Inbox, MailPlus, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../Button/Button";
import Table from "../Table/Table";
import EmptyState from "../EmptyState/EmptyState";

function Content ()
{
  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  const folder = useSelector ( selectFolder );
  const emails = useSelector ( selectPageSlice );
  const page = useSelector ( selectPage );
  const totalPages = useSelector ( selectTotalPages );

  const FolderIcon = iconsMap[ folder ] ?? Inbox;

  function paginate ( dir )
  {
    if ( dir === "prev" && page > 1 ) dispatch ( setCurrentPage ( page - 1 ) );

    if ( dir === "next" && page < totalPages ) dispatch ( setCurrentPage ( page + 1 ) );
  }

  return (
    <main className = "p-6 overflow-hidden" >

      {/* header */}
      <div className = "flex items-center justify-between mb-6" >

        <div
          className = "inline-flex shadow-lg items-center gap-2 bg-indigo-600/10 text-indigo-800 px-5 py-3 rounded-full"
        >
          <FolderIcon size = { 22 } />
          <span className = "font-semibold text-lg tracking-wide" > { folder } </span>
        </div>

        <Button
          buttonText = {
            <span className = "flex items-center gap-2" >
              <MailPlus size = { 18 } />
              Compose
            </span>
          }
          className = "bg-gradient-to-r from-fuchsia-400 to-pink-600 text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:shadow-xl hover:scale-105 transition"
          onClick = { () => navigate ( "/compose-email" ) }
        />

      </div>

      <div className="rounded-2xl shadow-lg ring-1 ring-indigo-100 overflow-hidden bg-white">

        {
          emails.length
          ? (
            <>
              <Table emails = { emails } folder = { folder } />
              <div className = "flex items-center justify-between px-8 py-4 bg-white" >

                <Button
                  buttonText = {
                    <span className = "flex items-center gap-1" >
                      <ChevronLeft size = { 16 } /> Prev
                    </span>
                  }
                  className = "text-indigo-600 font-medium hover:text-indigo-800 disabled:opacity-30"
                  onClick = { () => paginate ( "prev" ) }
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
                  onClick = { () => paginate ( "next" ) }
                  disabled = { page >= totalPages }
                />

              </div>
            </>
            )
          : <EmptyState folder = { folder } />
        }

      </div>

    </main>
  );
}

export default Content;