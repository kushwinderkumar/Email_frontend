// import React, { useState, useEffect } from "react";
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

//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 15;

//   const handleView = (email: Email) => setSelectedEmail(email);
//   const handleClose = () => setSelectedEmail(null);
//   const clearSearch = () => setSearchQuery("");
//   const clearDate = () => setSelectedDate(null);
//   const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

//   // ✅ Filter emails
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

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, selectedDate, emails]);

//   const totalPages = Math.ceil(filteredEmails.length / pageSize) || 1;
//   const startIndex = (currentPage - 1) * pageSize;
//   const currentEmails = filteredEmails.slice(
//     startIndex,
//     startIndex + pageSize
//   );

//   //  Attachment Viewer Component
//   interface AttachmentViewerProps {
//     attachment: EmailAttachment;
//   userId: string;
//   messageId: string;
//   }

//   const AttachmentViewer: React.FC<AttachmentViewerProps> = ({
//     attachment,
//     userId,
//     messageId,
//   }) => {
//      const [blobUrl, setBlobUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [textContent, setTextContent] = useState<string | null>(null);

//  useEffect(() => {
//     if (!userId || !messageId || !attachment.attachmentId) return;
//     let cancelled = false;
//     let objectUrl: string | null = null;

//     const loadAttachment = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(
//           `https://localhost:7262/api/Users/inbox/${userId}/attachments/${messageId}/${encodeURIComponent(
//             attachment.attachmentId
//           )}`,
//           { credentials: "include" }
//         );
//         if (!res.ok) throw new Error(`Failed to load: ${res.statusText}`);
//         const blob = await res.blob();
//         objectUrl = URL.createObjectURL(blob);
//         if (!cancelled) setBlobUrl(objectUrl);

//         // Load text content for .txt files
//         if (blob.type === "text/plain") {
//           const text = await blob.text();
//           if (!cancelled) setTextContent(text);
//         }
//       } catch (err: any) {
//         if (!cancelled) setError(err.message || "Failed to load");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     loadAttachment();

//     return () => {
//       cancelled = true;
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [attachment, userId, messageId]);

//    if (loading) return <p>Loading {attachment.fileName}...</p>;
//   if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
//   if (!blobUrl) return null;

//    const mime = attachment.mimeType.toLowerCase();

//       if (mime.startsWith("image/")) {
//     return (
//       <div style={{ marginBottom: "15px" }}>
//         <p>{attachment.fileName}</p>
//         <img
//           src={blobUrl}
//           alt={attachment.fileName}
//           style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: "8px" }}
//         />
//       </div>
//     );
//   }

//     if (mime === "application/pdf") {
//     return (
//       <div style={{ marginBottom: "15px" }}>
//         <p>{attachment.fileName}</p>
//         <object data={blobUrl} type="application/pdf" width="100%" height="500px">
//           PDF preview not supported.{" "}
//           <a href={blobUrl} download={attachment.fileName}>
//             Download PDF
//           </a>
//         </object>
//         <div style={{ marginTop: "5px" }}>
//           <a href={blobUrl} download={attachment.fileName} className="btn btn-sm btn-outline-primary">
//             Download PDF
//           </a>
//         </div>
//       </div>
//     );
//   }
//   // Text file preview
//   if (mime === "text/plain") {
//     return (
//       <div style={{ marginBottom: "15px" }}>
//         <p>{attachment.fileName}</p>
//         <pre style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "6px" }}>
//           {textContent || "Loading..."}
//         </pre>
//         <a href={blobUrl} download={attachment.fileName} className="btn btn-sm btn-outline-primary mt-2">
//           Download
//         </a>
//       </div>
//     );
//   }
//     return (
//       <div style={{ marginBottom: "15px" }}>
//       <a href={blobUrl} download={attachment.fileName}>
//         📎 {attachment.fileName} ({attachment.mimeType})
//       </a>
//     </div>
//     );
//   };

//   return (
//     <div className="email-table-container">
//       {/* Table & Filters */}
//       <div
//         className="table-responsive py-3 px-2 m-2 shadow-sm"
//         style={{ backgroundColor: "#8ed1d1ff", borderRadius: "10px" }}
//       >
//         {/*  Filters */}
//         <div className="d-flex align-items-center mb-3 gap-3 flex-wrap">
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

//           <div style={{ position: "relative" }}>
//             <ReactDatePicker
//               selected={selectedDate}
//               onChange={(date) => setSelectedDate(date)}
//               placeholderText="Filter by date"
//               className="form-control"
//             />
//             {selectedDate && (
//               <span
//                 onClick={clearDate}
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

//         {/*  Email Table */}
//         <div style={{ overflowX: "auto" }}>
//           <table className="table table-striped table-hover table-bordered shadow-sm">
//             <thead style={{ backgroundColor: "#ffb3c6", color: "#333" }}>
//               <tr>
//                 <th>#</th>
//                 <th>From</th>
//                 <th>Subject</th>
//                 <th>Date-Time</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentEmails.length > 0 ? (
//                 currentEmails.map((email, index) => (
//                   <tr key={email.id}>
//                     <td>{startIndex + index + 1}</td>
//                     <td>{email.from || "(Unknown)"}</td>
//                     <td>{email.subject || "(No Subject)"}</td>
//                     <td>
//                       {email.date
//                         ? new Date(email.date).toLocaleString()
//                         : "-"}
//                     </td>
//                     <td>
//                       <Button
//                         className="btn btn-info me-2"
//                         onClick={() => handleView(email)}
//                       >
//                         <i className="fa-regular fa-eye"></i>
//                       </Button>
//                       <Button
//                         className="btn btn-primary"
//                         onClick={() => setReplyingEmail(email)}
//                       >
//                         <i className="fa-solid fa-reply-all"></i>
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="text-center text-muted">
//                     No emails found !!
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <footer
//           className="d-flex justify-content-center align-items-center"
//           style={{ padding: "20px" }}
//         >
//           <button
//             style={{ margin: "0px 10px" }}
//             onClick={handlePrev}
//             disabled={currentPage === 1}
//           >
//             <i className="fa-solid fa-arrow-left"></i>
//           </button>
//           <span>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             style={{ margin: "0px 10px" }}
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//           >
//             <i className="fa-solid fa-arrow-right"></i>
//           </button>
//         </footer>
//       </div>

//       {/* View Modal */}
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

//         {selectedEmail?.attachments?.length ? (
//   <>
//     <hr />
//     <h6>Attachments:</h6>
//     {selectedEmail.attachments.map((att) => (
//       <AttachmentViewer
//         key={att.attachmentId}
//         attachment={att}
//         userId={userId!}
//         messageId={selectedEmail.id}
//       />
//     ))}
//   </>
// ) : (
//   <p className="text-muted">No attachments</p>
// )}

//         </Modal.Body>
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
//           <Button
//             variant="primary"
//             disabled={!replyingEmail || !replyMessage.trim()}
//             onClick={async () => {
//               try {
//                 const response = await fetch(
//                   "https://localhost:7262/api/Users/reply",
//                   {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                       UserId: userId,
//                       EmailMessageId: replyingEmail?.id,
//                       ReplyBody: replyMessage,
//                     }),
//                     credentials: "include",
//                   }
//                 );
//                 if (!response.ok) throw new Error("Failed to send reply");
//                 setReplyMessage("");
//                 setReplyingEmail(null);
//                 Swal.fire("Success", "Reply sent successfully!!", "success");
//               } catch (err: any) {
//                 Swal.fire("Error", err.message, "error");
//               }
//             }}
//           >
//             Send Reply
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default EmailTable;                 // this code is working  this code hide only checking

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
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [replyingEmail, setReplyingEmail] = useState<Email | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const pageSize = 15;

  //  Filter emails
  const filteredEmails = emails.filter((email) => {
    const from = email.from?.toLowerCase() || "";
    const subject = email.subject?.toLowerCase() || "";
    const emailDate = email.date ? new Date(email.date) : null;
    const matchesSearch =
      from.includes(searchQuery.toLowerCase()) ||
      subject.includes(searchQuery.toLowerCase());
    const matchesDate =
      !selectedDate ||
      (emailDate && emailDate.toDateString() === selectedDate.toDateString());
    return matchesSearch && matchesDate;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDate, emails]);

  const totalPages = Math.ceil(filteredEmails.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentEmails = filteredEmails.slice(startIndex, startIndex + pageSize);

  //  Attachment viewer
  interface AttachmentViewerProps {
    attachment: EmailAttachment;
    userId: string;
    messageId: string;
  }

  const AttachmentViewer: React.FC<AttachmentViewerProps> = ({
    attachment,
    userId,
    messageId,
  }) => {
    const [blobUrl, setBlobUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [textContent, setTextContent] = useState<string | null>(null);

    useEffect(() => {
      if (!userId || !messageId || !attachment.attachmentId) return;
      let cancelled = false;
      let objectUrl: string | null = null;

      const loadAttachment = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(
            `https://localhost:7262/api/Users/inbox/${userId}/attachments/${messageId}/${encodeURIComponent(
              attachment.attachmentId
            )}`,
            { credentials: "include" }
          );
          if (!res.ok) throw new Error(`Failed to load: ${res.statusText}`);
          const blob = await res.blob();
          objectUrl = URL.createObjectURL(blob);
          if (!cancelled) setBlobUrl(objectUrl);

          if (blob.type === "text/plain") {
            const text = await blob.text();
            if (!cancelled) setTextContent(text);
          }
        } catch (err: any) {
          if (!cancelled) setError(err.message || "Failed to load");
        } finally {
          if (!cancelled) setLoading(false);
        }
      };

      loadAttachment();

      return () => {
        cancelled = true;
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }, [attachment, userId, messageId]);

    if (loading) return <p>Loading {attachment.fileName}...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!blobUrl) return null;

    const mime = attachment.mimeType.toLowerCase();

    if (mime.startsWith("image/")) {
      return (
        <div style={{ marginBottom: "15px" }}>
          <p>{attachment.fileName}</p>
          <img
            src={blobUrl}
            alt={attachment.fileName}
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              borderRadius: "8px",
            }}
          />
        </div>
      );
    }
   if (mime === "application/pdf") {
  return (
    <div style={{ marginBottom: "15px" }}>
      <p>{attachment.fileName}</p>
      <a
        href={blobUrl}
        download={attachment.fileName}
        className="btn btn-sm btn-outline-primary"
      >
        Download PDF
      </a>
    </div>
  );
}


    if (mime === "text/plain") {
      return (
        <div style={{ marginBottom: "15px" }}>
          <p>{attachment.fileName}</p>
          <pre
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            {textContent || "Loading..."}
          </pre>
          <a
            href={blobUrl}
            download={attachment.fileName}
            className="btn btn-sm btn-outline-primary mt-2"
          >
            Download
          </a>
        </div>
      );
    }

    return (
      <div style={{ marginBottom: "15px" }}>
        <a href={blobUrl} download={attachment.fileName}>
          📎 {attachment.fileName} ({attachment.mimeType})
        </a>
      </div>
    );
  };

  return (
    <div className="email-table-container">
      {/*  Filters */}
      <div
        className="table-responsive py-3 px-2 m-2 shadow-sm"
        style={{ backgroundColor: "#8ed1d1ff", borderRadius: "10px" }}
      >
        <div className="d-flex align-items-center mb-3 gap-3 flex-wrap">
          <div style={{ position: "relative", maxWidth: "400px" }}>
            <Form.Control
              type="text"
              placeholder="Search by sender or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <span
                onClick={() => setSearchQuery("")}
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

          <div style={{ position: "relative" }}>
            <ReactDatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Filter by date"
              className="form-control"
            />
            {selectedDate && (
              <span
                onClick={() => setSelectedDate(null)}
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

        {/*  Email Table */}
        <div style={{ overflowX: "auto" }}>
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
                      {email.date ? new Date(email.date).toLocaleString() : "-"}
                    </td>
                    <td>
                      <Button
                        className="btn btn-info me-2"
                        onClick={() => setSelectedEmail(email)}
                      >
                        <i className="fa-regular fa-eye"></i>
                      </Button>
                      <Button
                        className="btn btn-primary"
                        onClick={() => setReplyingEmail(email)}
                      >
                        <i className="fa-solid fa-reply-all"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No emails found !!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/*  Pagination */}
        <footer
          className="d-flex justify-content-center align-items-center"
          style={{ padding: "20px" }}
        >
          <button
            style={{ margin: "0px 10px" }}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            style={{ margin: "0px 10px" }}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </footer>
      </div>

      {/*  View Email Modal */}
      <Modal
        show={selectedEmail !== null}
        onHide={() => setSelectedEmail(null)}
        centered
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header style={{ backgroundColor: "#68b6c1ff" }}>
          <Modal.Title>{selectedEmail?.subject || "(No Subject)"}</Modal.Title>
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
            dangerouslySetInnerHTML={{
              __html:
                selectedEmail?.bodypreview || selectedEmail?.snippet || "-",
            }}
          />
          <hr />
          <p className="text-muted mb-2">
            <strong>Date-Time:</strong>{" "}
            {selectedEmail?.date
              ? new Date(selectedEmail.date).toLocaleString()
              : "-"}
          </p>

          {selectedEmail?.attachments?.length ? (
            <>
              <hr />
              <h6>Attachments:</h6>
              {selectedEmail.attachments.map((att) => (
                <AttachmentViewer
                  key={att.attachmentId}
                  attachment={att}
                  userId={userId!}
                  messageId={selectedEmail.id}
                />
              ))}
            </>
          ) : (
            <p className="text-muted">No attachments</p>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#78a5b6ff" }}>
          <Button variant="secondary" onClick={() => setSelectedEmail(null)}>
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

          {/* File Attachment Input */}
          <div className="mt-3">
            <Form.Label className="text-primary fw-bold">
              Attachments:-
            </Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = Array.from(e.target.files || []);
                setSelectedFiles((prev) => [...prev, ...files]);
              }}
            />

            {selectedFiles.length > 0 && (
              <ul className="mt-2 list-unstyled">
                {selectedFiles.map((file, i) => (
                  <li
                    key={i}
                    className="d-flex align-items-center justify-content-between bg-light rounded px-2 py-1 mb-1"
                    style={{ border: "1px solid #ccc" }}
                  >
                    <span className="text-secondary">{file.name}</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => {
                        setSelectedFiles(
                          selectedFiles.filter((_, index) => index !== i)
                        );
                      }}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#b1cbe4ff",
            textAlign: "center",
            padding: "10px 0",
            color: "#555",
            borderTop: "1px solid #b29292ff",
          }}
        >
          <Button variant="secondary" onClick={() => setReplyingEmail(null)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!replyingEmail || !replyMessage.trim()}
            onClick={async () => {
              try {
                const formData = new FormData();
                formData.append("UserId", userId || "");
                formData.append("EmailMessageId", replyingEmail?.id || "");
                formData.append("ReplyBody", replyMessage);

                // Add attachments
                selectedFiles.forEach((file) =>
                  formData.append("Attachments", file)
                );

                const response = await fetch(
                  "https://localhost:7262/api/Users/reply",
                  {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                  }
                );

                if (!response.ok) throw new Error("Failed to send reply");

                setReplyMessage("");
                setSelectedFiles([]);
                setReplyingEmail(null);
                Swal.fire(" Success", "Reply sent successfully!", "success");
              } catch (err: any) {
                Swal.fire(" Error", err.message, "error");
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
