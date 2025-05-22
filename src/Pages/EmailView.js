import { useEffect, useState } from "react";
import { MailOpen, Clock, Paperclip, FileText,Download, ArrowBigLeft, Shredder, AtSign, User, } from "lucide-react";
import { formatDate } from "../Helpers/HelperTableFunctions";
import { attachmentIcons } from "../Helpers/HelperIconVariables";
import { Button } from "../Components";

/* ─────────── HARD-CODED DEMO DATA ─────────── */
const email = {
  subject: "Quarterly Strategy Deck & Brand Assets",
  from: "team@producthub.io",
  to: "you@example.com",
  time: new Date().toISOString(),
  body: `
    <p>Hi Team,</p>
    <p>
      Please find attached the Q2 strategic deck together with the updated logo
      pack. Feel free to leave comments before Friday.
    </p>
    <p>Cheers,<br/>Chris</p>
  `,
  attachments: [
    { name: "Q2_Strategy_Deck.pdf", size: "1.1 MB", type: "pdf", url: "#" },
    { name: "Logo_Pack.zip", size: "4.7 MB", type: "zip", url: "#" },
    { name: "Wireframe.png", size: "820 KB", type: "img", url: "#" },
  ],
};
/* ───────────────────────────────────────────── */

export default function EmailView ()
{
  const [ fadeIn, setFadeIn ] = useState ( false );

  useEffect (
    () => {
      setTimeout ( () => setFadeIn ( true ), 50 );
    }, []
  );

  return (
    <div className = "min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 p-6" >

      <div
        className = {`relative rounded-2xl shadow-xl bg-gradient-to-br from-indigo-200 to-purple-200
          overflow-hidden transform transition-all duration-500 ${ fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]" }`
        }
      >
        <span className = "absolute inset-x-0 top-0 h-1 bg-indigo-500" />

        <div className = "flex items-center mb-5 justify-between px-8 pt-8" >

            <Button
              className = "p-2 rounded-xl bg-indigo-100 hover:bg-indigo-500 shadow-md hover:shadow-lg transition"
              buttonText = {
                <ArrowBigLeft className = "w-5 h-5 text-indigo-700 hover:text-white" size = { 22 } />
              }
            />

            <h1 className = "text-3xl font-bold text-indigo-800 tracking-tight flex items-center gap-2" >
              <MailOpen className = "w-6 h-6 text-indigo-500" />
              { email.subject }
            </h1>

            <Button
              className = "p-2 rounded-xl bg-red-100 hover:bg-red-200 shadow-md hover:shadow-lg transition"
              buttonText = {
                <Shredder className = "w-5 h-5 text-red-600" size = { 22 } />
              }
            />

        </div>

        <div className = "px-20 py-10 space-y-6" >

          <div className = "grid sm:grid-cols-3 gap-4 font-medium text-lg text-gray-600" >

            <div className = "flex items-center gap-2" >
              <AtSign className = "w-6 h-6 text-indigo-500" />
              <span className = "underline font-medium" > { email.from } </span>
            </div>

            <div className = "flex items-center gap-2" >
              <User className = "w-6 h-6 text-indigo-500" />
              <span> { email.to } </span>
            </div>

            <div className = "flex items-center gap-2" >
              <Clock className = "w-6 h-6 text-indigo-500" />
              <span> { formatDate ( email.time, "full" ) } </span>
            </div>

          </div>

          <article
            className = "prose prose-indigo max-w-none text-md text-gray-700"
            dangerouslySetInnerHTML = { { __html: email.body } }
          />

          {/* Attachments Section */}

          <section>

            <h3
              className = "flex items-center gap-4 text-indigo-900 font-bold text-md mb-5 tracking-wider uppercase"
            >
              <Paperclip className = "w-5 h-5 text-indigo-700" /> Attachments
            </h3>

            <div className = "grid sm:grid-cols-2 lg:grid-cols-5 gap-5" >
              {
                email.attachments.map (
                  ( file ) => {
                  const Icon = attachmentIcons[file.type] ?? FileText;
                  return (
                    <div
                      key = { file.name }
                      className = "bg-gradient-to-r from-indigo-100 to-purple-100 backdrop-blur-md rounded-2xl shadow-xl p-3 flex gap-5 items-start border border-indigo-400/30 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
                    >

                      <Icon className = "w-6 h-6 text-indigo-700 flex-shrink-0 mt-1" />

                      <div className = "flex-1" >

                        <p className = "text-sm font-medium text-gray-900" > { file.name } </p>

                        <p className = "text-sm text-gray-700 mb-5" > { file.size } </p>

                        <a
                          href = { file.url }
                          download
                          className = "inline-flex items-center gap-3 text-base font-normal px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl hover:scale-105"
                        >
                          <Download className = "w-6 h-6" />
                          Download
                        </a>

                      </div>

                    </div>
                  );
                })
              }
            </div>

          </section>

        </div>

      </div>

    </div>
  );
}