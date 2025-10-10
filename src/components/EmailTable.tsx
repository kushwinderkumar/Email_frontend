// //this is working  fully
// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ReactDatePicker from "react-datepicker";

// interface Email {
//   id: string;
//   from?: string;
//   subject?: string;
//   snippet?: string;
//   date?: string;
//   body?: string;
// }

// interface EmailTableProps {
//   emails: Email[];
//    userId: string | null;   // checking
// }

// const EmailTable: React.FC<EmailTableProps> = ({ emails, userId }) => {
//   const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   const handleView = (email: Email) => {
//     setSelectedEmail(email);
//   };

//   const handleClose = () => setSelectedEmail(null);

//   const filteredEmails = emails.filter((email) => {
//     const from = email.from?.toLowerCase() || "";
//     const subject = email.subject?.toLowerCase() || "";
//     const emailDate = email.date ? new Date(email.date) : null;

//     const matchesSearch =
//       from.includes(searchQuery.toLowerCase()) ||
//       subject.includes(searchQuery.toLowerCase());

//     const matchesDate =
//       !selectedDate || (emailDate && emailDate.toDateString() === selectedDate.toDateString());

//     return matchesSearch && matchesDate;
//   });

//   return (
//     <div className="email-table-container">
//       {/* Table */}
//       <div
//         className="table-responsive py-3 p-2 m-2 shadow-sm"
//         style={{ backgroundColor: "#8ed1d1ff", borderRadius: "10px" }}
//       >
//         <div className="px-3 mt-3 mb-2 d-flex  align-items-center">
//           {/* Search */}
//           <Form.Control
//             type="text"
//             placeholder="Search by sender, subject.. "
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             style={{ maxWidth: "400px" }}
//           />

//           {/* Date Picker */}
//           <div className="ms-3">
//             <div style={{ minWidth: "900px" }}>
//               <ReactDatePicker
//                 selected={selectedDate}
//                 onChange={(date) => setSelectedDate(date)}
//                 placeholderText="Filter by date.."
//                 className="form-control "
//               />
//             </div>
//           </div>
//         </div>

//         <table
//           className="table table-striped table-hover table-bordered shadow-sm"
//           style={{ backgroundColor: "#467a51ff" }}
//         >
//           <thead
//             className="table-primary"
//             style={{ backgroundColor: "#ffb3c6", color: "#333" }}
//           >
//             <tr className="p-3">
//               <th>#</th>
//               <th>From</th>
//               <th>Subject</th>
//               <th>Date-Time</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmails.length > 0 ? (
//               filteredEmails.map((email, index) => (
//                 <tr key={email.id}>
//                   <td>{index + 1}</td>
//                   <td>{email.from || "(Unknown)"}</td>
//                   <td>{email.subject || "(No Subject)"}</td>
//                   <td>
//                     {email.date ? new Date(email.date).toLocaleString() : "-"}
//                   </td>
//                   <td>
//                     <Button className="btn btn-info me-2" onClick={() => handleView(email)}>
//                       View
//                     </Button>
//                     <button className="btn btn-primary">Reply</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={6} className="text-center text-danger text-muted">
//                   No emails found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       <Modal
//         show={selectedEmail !== null}
//         onHide={handleClose}
//         centered
//         backdrop="static"
//         keyboard={false}
//         className="email-modal"
//       >
//         <Modal.Header style={{ backgroundColor: "#6bc3c3ff" }}>
//           <Modal.Title className="email-modal-title text-dark fw-bold rounded">
//             {selectedEmail?.subject || "(No Subject)"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body
//           className="email-modal-body"
//           style={{ backgroundColor: "#f7f7f7ff", color: "#333" }}
//         >
//           <p>
//             <strong>From:</strong> {selectedEmail?.from || "(Unknown)"}
//           </p>
//           <p>
//             <strong>Body:</strong> {selectedEmail?.snippet || "-"}
//           </p>
//           <hr />
//           <p className="text-muted mb-2">
//             <strong>Date-Time:</strong> {selectedEmail?.date}
//           </p>
//         </Modal.Body>
//         <Modal.Footer
//           className="email-modal-footer"
//           style={{ backgroundColor: "#e9d8c5ff" }}
//         >
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default EmailTable;

// this code is working fully

// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Swal from "sweetalert2";

// interface EmailAttachment {
//   attachmentId: string;
//   fileName: string;
//   mimeType: string;
// }

// interface Email {
//   id: string;
//   from?: string;
//   subject?: string;
//   snippet?: string;
//   body?: string;
//   date?: string;
//   userId?: string;
//   bodypreview?: string;
//   attachments?: EmailAttachment[];
// }

// interface EmailTableProps {
//   emails: Email[];
//   userId: string | null;
// }

// const EmailTable: React.FC<EmailTableProps> = ({ emails, userId }) => {
//   const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [replyingEmail, setReplyingEmail] = useState<Email | null>(null);
//   const [replyMessage, setReplyMessage] = useState("");
// // checking the pagination
// const [currentpage,setCurrentPage]=useState(1);
// const pagesize=15;
// const totalpages=Math.ceil(emails.length/pagesize);
// const handleprev=()=>{
//   setCurrentPage((prev)=>Math.max(prev-1,1));
// }
// const handleNext=()=>{
//   setCurrentPage((prev)=>Math.min(prev+1,totalpages));
// }
// const startIndex=(currentpage-1)*pagesize;
// const currentEmails = emails.slice(startIndex, startIndex + pagesize);

// // Pagination controls end here
//   const handleView = (email: Email) => setSelectedEmail(email);
//   const handleClose = () => setSelectedEmail(null);




//   const filteredEmails = emails.filter((email) => {
//     const from = email.from?.toLowerCase() || "";
//     const subject = email.subject?.toLowerCase() || "";
//     const emailDate = email.date ? new Date(email.date) : null;

//     const matchesSearch =
//       from.includes(searchQuery.toLowerCase()) ||
//       subject.includes(searchQuery.toLowerCase());

//     const matchesDate =
//       !selectedDate ||
//       (emailDate && emailDate.toDateString() === selectedDate.toDateString());

//     return matchesSearch && matchesDate;
//   });

//   const clearSearch = () => {
//     setSearchQuery("");
//   };
//   const ClearDate = () => {
//     setSelectedDate(null);
//   };
//   return (
//     <div className="email-table-container">
//       <div
//         className="table-responsive py-3 px-2 m-2 shadow-sm"
//         style={{ backgroundColor: "#8ed1d1ff", borderRadius: "10px" }}
//       >
//         <div className="d-flex align-items-center mb-3 gap-3   flex-wrap">
//           {/* Search Input */}
//           <div style={{ position: "relative", maxWidth: "400px" }}>
//             <Form.Control
//               type="text"
//               placeholder="Search by sender or subject..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             {searchQuery && (
//               <span
//                 onClick={clearSearch}
//                 style={{
//                   position: "absolute",
//                   right: "10px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                   color: "red",
//                 }}
//               >
//                 &#10006;
//               </span>
//             )}
//           </div>

//           {/* Date Picker */}
//           <div style={{ position: "relative" }}>
//             <ReactDatePicker
//               selected={selectedDate}
//               onChange={(date) => setSelectedDate(date)}
//               placeholderText="Filter by date"
//               className="form-control"
//             />
//             {selectedDate && (
//               <span
//                 onClick={ClearDate}
//                 style={{
//                   position: "absolute",
//                   right: "10px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                   color: "red",
//                 }}
//               >
//                 &#10006;
//               </span>
//             )}
//           </div>
//         </div>

//         <table className="table table-striped table-hover table-bordered shadow-sm">
//           <thead style={{ backgroundColor: "#ffb3c6", color: "#333" }}>
//             <tr>
//               <th>#</th>
//               <th>From</th>
//               <th>Subject</th>
//               <th>Date-Time</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmails.length > 0 ? (
//               filteredEmails.map((email, index) => (
//                 <tr key={email.id}>
//                   <td>{index + 1}</td>
//                   <td>{email.from || "(Unknown)"}</td>
//                   <td>{email.subject || "(No Subject)"}</td>
//                   <td>
//                     {email.date ? new Date(email.date).toLocaleString() : "-"}
//                   </td>
//                   <td>
//                     <Button
//                       className="btn btn-info me-2"
//                       onClick={() => handleView(email)}
//                     >
//                       View
//                     </Button>
//                     <Button
//                       className="btn btn-primary"
//                       onClick={() => setReplyingEmail(email)}
//                     >
//                       Reply
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center text-muted">
//                   No emails found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Email Modal */}
//       <Modal
//         show={selectedEmail !== null}
//         onHide={handleClose}
//         centered
//         backdrop="static"
//         keyboard={false}
//         size="lg"
//       >
//         <Modal.Header style={{ backgroundColor: "#68b6c1ff" }}>
//           <Modal.Title className="fw-bold">
//             {selectedEmail?.subject || "(No Subject)"}
//           </Modal.Title>
//         </Modal.Header>

//         <Modal.Body
//           style={{
//             maxHeight: "70vh",
//             overflowY: "auto",
//             backgroundColor: "#fff",
//             color: "#333",
//             borderRadius: "8px",
//             padding: "10px",
//           }}
//         >
//           <p>
//             <strong>From:</strong> {selectedEmail?.from || "(Unknown)"}
//           </p>
//           <hr />

//           <strong>Body:</strong>
//           <div
//             style={{
//               whiteSpace: "pre-wrap",
//               wordBreak: "break-word",
//               overflowWrap: "anywhere",
//               lineHeight: "1.5",
//             }}
//           >
//             <style>
//               {`
//              a {
//               word-break: break-word !important;
//               overflow-wrap: anywhere !important;
//               max-width: 100%;
//               display: inline-block;
//                   }
//      `}
//             </style>
//             <div
//               dangerouslySetInnerHTML={{
//                 __html:
//                   selectedEmail?.bodypreview || selectedEmail?.snippet || "-",
//               }}
//             />
//           </div>
//           <hr />
//           <p className="text-muted mb-2">
//             <strong>Date-Time:</strong>{" "}
//             {selectedEmail?.date
//               ? new Date(selectedEmail.date).toLocaleString()
//               : "-"}
//           </p>
//           {selectedEmail?.attachments &&
//             selectedEmail.attachments.length > 0 && (
//               <>
//                 <hr />
//                 <p>
//                   <strong>Attachments:</strong>
//                 </p>
//                 <ul>
//                   {selectedEmail.attachments.map((att, index) => (
//                     <li key={index}>
//                       <a
//                         href={`https://localhost:7262/api/Users/inbox/${userId}/attachments/${selectedEmail.id}/${att.attachmentId}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {att.fileName} ({att.mimeType})
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}
//         </Modal.Body>

//         {/* Footer */}
//         <Modal.Footer style={{ backgroundColor: "#78a5b6ff" }}>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Reply Modal */}
//       <Modal
//         show={replyingEmail !== null}
//         onHide={() => setReplyingEmail(null)}
//         centered
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton style={{ backgroundColor: "#d1e7ff" }}>
//           <Modal.Title>Reply to {replyingEmail?.from}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Control
//             as="textarea"
//             rows={5}
//             placeholder="Type your reply..."
//             value={replyMessage}
//             onChange={(e) => setReplyMessage(e.target.value)}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setReplyingEmail(null)}>
//             Cancel
//           </Button>
//           {/* <Button
//             variant="primary"
//             disabled={!replyingEmail || !replyMessage.trim()}
//             onClick={async () => {
//               if (!replyingEmail || !replyMessage.trim()) return;

//               try {
//                 const response = await fetch(
//                   "https://localhost:7262/api/Users/reply",
//                   {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                       UserId: userId,
//                       EmailMessageId: replyingEmail.id,        // string from Gmail
//                       ReplyBody: replyMessage,
//                     }),
//                     credentials: "include",
//                   }
//                 );
//                 alert("checking");
//                 if (!response.ok) {
//                   const error = await response.json();
//                   throw new Error(error?.error || "Failed to send reply");
//                 }
//                 setReplyMessage("");
//                 setReplyingEmail(null);
//                 alert("Reply sent successfully");
//               } catch (err: any) {
//                 alert(err.message);
//               }
//             }}
//           >
//             Send Reply
//           </Button> */}
//           <Button
//             variant="primary"
//             disabled={!replyingEmail || !replyMessage.trim()}
//             onClick={async () => {
//               if (!replyingEmail || !replyMessage.trim()) return;

//               try {
//                 console.log("Sending reply:", {
//                   userId,
//                   replyingEmailId: replyingEmail.id,
//                   replyMessage,
//                 });

//                 const response = await fetch(
//                   "https://localhost:7262/api/Users/reply",
//                   {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                       UserId: userId,
//                       EmailMessageId: replyingEmail.id,
//                       ReplyBody: replyMessage,
//                     }),
//                     credentials: "include",
//                   }
//                 );
//                 if (!response.ok) {
//                   let errorMessage = "Failed to send reply";
//                   try {
//                     const errorData = await response.json();
//                     errorMessage = errorData?.error || errorMessage;
//                   } catch {
//                     const text = await response.text();
//                     if (text) errorMessage = text;
//                   }
//                   throw new Error(errorMessage);
//                 }
//                 setReplyMessage("");
//                 setReplyingEmail(null);
//                 Swal.fire("Success", "Reply sent successfully", "success");
//               } catch (err: any) {
//                 Swal.fire("Error", "Error: " + err.message, "error");
//                 console.error("Reply error:", err);
//               }
//             }}
//           >
//             Send Reply
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <footer
//         className=" d-flex justify-content-center align-items-center"
//         style={{ padding: "20px" }}
//       >
//         <button style={{ margin: "0px 10px" }}
//         onClick={handleprev} disabled ={currentpage===1}
//         >Prev</button>
//       <span>
//           Page {currentpage} of {totalpages}
//         </span>
//         <button style={{ margin: "0px 10px" }}
//         onClick={handleNext} disabled ={currentpage===totalpages}
//         >Next</button>
//       </footer>
//     </div>
//   );
// };

// export default EmailTable;




// this is for  checking  perpouse 
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

interface EmailAttachment {
  attachmentId: string;
  fileName: string;
  mimeType: string;
}

interface Email {
  id: string;
  from?: string;
  subject?: string;
  snippet?: string;
  body?: string;
  date?: string;
  userId?: string;
  bodypreview?: string;
  attachments?: EmailAttachment[];
}

interface EmailTableProps {
  emails: Email[];
  userId: string | null;
}

const EmailTable: React.FC<EmailTableProps> = ({ emails, userId }) => {
  // State
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [replyingEmail, setReplyingEmail] = useState<Email | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  // Handlers
  const handleView = (email: Email) => setSelectedEmail(email);
  const handleClose = () => setSelectedEmail(null);

  const clearSearch = () => setSearchQuery("");
  const clearDate = () => setSelectedDate(null);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Filter emails
  const filteredEmails = emails.filter((email) => {
    const from = email.from?.toLowerCase() || "";
    const subject = email.subject?.toLowerCase() || "";
    const emailDate = email.date ? new Date(email.date) : null;

    const matchesSearch =
      from.includes(searchQuery.toLowerCase()) ||
      subject.includes(searchQuery.toLowerCase());

    const matchesDate =
      !selectedDate ||
      (emailDate &&
        emailDate.toDateString() === selectedDate.toDateString());

    return matchesSearch && matchesDate;
  });

  // Reset page to 1 if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDate, emails]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEmails.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentEmails = filteredEmails.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div className="email-table-container">
      {/* Filters */}
      <div
        className="table-responsive py-3 px-2 m-2 shadow-sm"
        style={{ backgroundColor: "#8ed1d1ff", borderRadius: "10px" }}
      >
        <div className="d-flex align-items-center mb-3 gap-3 flex-wrap">
          {/* Search */}
          <div style={{ position: "relative", maxWidth: "400px" }}>
            <Form.Control
              type="text"
              placeholder="Search by sender or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <span
                onClick={clearSearch}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                &#10006;
              </span>
            )}
          </div>

          {/* Date Picker */}
          <div style={{ position: "relative" }}>
            <ReactDatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Filter by date"
              className="form-control"
            />
            {selectedDate && (
              <span
                onClick={clearDate}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                &#10006;
              </span>
            )}
          </div>
        </div>

        {/* Table */}
        <table className="table table-striped table-hover table-bordered shadow-sm">
          <thead style={{ backgroundColor: "#ffb3c6", color: "#333" }}>
            <tr>
              <th>#</th>
              <th>From</th>
              <th>Subject</th>
              <th>Date-Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmails.length > 0 ? (
              currentEmails.map((email, index) => (
                <tr key={email.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{email.from || "(Unknown)"}</td>
                  <td>{email.subject || "(No Subject)"}</td>
                  <td>
                    {email.date
                      ? new Date(email.date).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    <Button
                      className="btn btn-info me-2"
                      onClick={() => handleView(email)}
                    >
                      View
                    </Button>
                    <Button
                      className="btn btn-primary"
                      onClick={() => setReplyingEmail(email)}
                    >
                      Reply
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No emails found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <footer
          className="d-flex justify-content-center align-items-center"
          style={{ padding: "20px" }}
        >
          <button
            style={{ margin: "0px 10px" }}
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            style={{ margin: "0px 10px" }}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </footer>
      </div>

      {/* View Modal */}
      <Modal
        show={selectedEmail !== null}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header style={{ backgroundColor: "#68b6c1ff" }}>
          <Modal.Title className="fw-bold">
            {selectedEmail?.subject || "(No Subject)"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            backgroundColor: "#fff",
            color: "#333",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <p>
            <strong>From:</strong> {selectedEmail?.from || "(Unknown)"}
          </p>
          <hr />
          <strong>Body:</strong>
          <div
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
              lineHeight: "1.5",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  selectedEmail?.bodypreview || selectedEmail?.snippet || "-",
              }}
            />
          </div>
          <hr />
          <p className="text-muted mb-2">
            <strong>Date-Time:</strong>{" "}
            {selectedEmail?.date
              ? new Date(selectedEmail.date).toLocaleString()
              : "-"}
          </p>

          {selectedEmail?.attachments && selectedEmail.attachments.length > 0 && (
            <>
              <hr />
              <p>
                <strong>Attachments:</strong>
              </p>
              <ul>
                {selectedEmail.attachments.map((att, index) => (
                  <li key={index}>
                    <a
                      href={`https://localhost:7262/api/Users/inbox/${userId}/attachments/${selectedEmail.id}/${att.attachmentId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {att.fileName} ({att.mimeType})
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "#78a5b6ff" }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reply Modal */}
      <Modal
        show={replyingEmail !== null}
        onHide={() => setReplyingEmail(null)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton style={{ backgroundColor: "#d1e7ff" }}>
          <Modal.Title>Reply to {replyingEmail?.from}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Type your reply..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setReplyingEmail(null)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!replyingEmail || !replyMessage.trim()}
            onClick={async () => {
              if (!replyingEmail || !replyMessage.trim()) return;

              try {
                const response = await fetch(
                  "https://localhost:7262/api/Users/reply",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      UserId: userId,
                      EmailMessageId: replyingEmail.id,
                      ReplyBody: replyMessage,
                    }),
                    credentials: "include",
                  }
                );
                if (!response.ok) throw new Error("Failed to send reply");

                setReplyMessage("");
                setReplyingEmail(null);
                Swal.fire("Success", "Reply sent successfully", "success");
              } catch (err: any) {
                Swal.fire("Error", "Error: " + err.message, "error");
                console.error("Reply error:", err);
              }
            }}
          >
            Send Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmailTable;
