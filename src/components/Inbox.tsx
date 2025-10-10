// import { useState } from "react";
// import { Card, Row, Col, Form } from "react-bootstrap";

// interface  InboxItem {
// id: string;
//   title: string;   
//   sender: string;  
//   datetime: string; 
//   preview: string;  
// }
// interface InboxListProps {
//   inboxItems: InboxItem[];
  
// }   
// const InboxList: React.FC<InboxListProps> = ({ inboxItems }) => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
  
//   const filteredItems = inboxItems.filter((item) => {
//     return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//            item.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
//            item.preview.toLowerCase().includes(searchQuery.toLowerCase()) ;
         
//   });

//     return(
//          <div className="container mt-4">
//       {/* Search Bar */}
//       <div className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Search by email .."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Emails */}
//       <Row xs={1} md={2} lg={3} className="g-4">
//         {filteredItems.length > 0 ? (
//           filteredItems.map((item) => (
//             <Col key={item.id}>
//               <Card className="shadow-sm border-0 rounded-3">
//                 <Card.Body>
//                   <h5 className="fw-bold">{item.title}</h5>
//                   <p className="text-muted mb-1">
//                     <strong>From:</strong> {item.sender}
//                   </p>
//                   <p className="text-muted mb-2">
//                     <strong>Date:</strong> {item.datetime}
//                   </p>
//                   <p className="text-truncate">{item.preview}</p>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         ) : (
//           <p className="text-center text-muted">No emails found</p>
//         )}
//       </Row>
//     </div>
//     )
// }
// export default InboxList;

// checking 
// import { useState } from "react";
// import { Card, Row, Col, Form } from "react-bootstrap";

// interface InboxItem {
//   id: string;
//   title: string;
//   sender: string;
//   datetime: string;
//   preview: string;
// }

// interface InboxListProps {
//   inboxItems: InboxItem[];
// }

// const InboxList: React.FC<InboxListProps> = ({ inboxItems }) => {
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   // Filter emails based on search query
//   const filteredItems = inboxItems.filter((item) =>
//     [item.title, item.sender, item.preview].some((field) =>
//       field.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   return (
//     <div className="container mt-4">
//       {/* Search Bar */}
//       <div className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Search by email, sender or preview..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Emails List */}
//       <Row xs={1} md={2} lg={3} className="g-4">
//         {filteredItems.length > 0 ? (
//           filteredItems.map((item) => (
//             <Col key={item.id}>
//               <Card className="shadow-sm border-0 rounded-3 h-100">
//                 <Card.Body>
//                   <h5 className="fw-bold">{item.title}</h5>
//                   <p className="text-muted mb-1">
//                     <strong>From:</strong> {item.sender}
//                   </p>
//                   <p className="text-muted mb-2">
//                     <strong>Date:</strong> {item.datetime}
//                   </p>
//                   <p className="text-truncate">{item.preview}</p>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         ) : (
//           <Col>
//             <p className="text-center text-muted">No emails found</p>
//           </Col>
//         )}
//       </Row>
//     </div>
//   );
// };

// export default InboxList;


// routing checking  
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmailTable from "./EmailTable";

type Email = {
  id: string;
  from?: string;
  subject?: string;
  snippet?: string;
  body?: string;
  date?: string;
  userId?: string;
};

const Inbox: React.FC<{ userId: string }> = ({ userId }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchEmails = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Email[]>(
        `https://localhost:7262/api/Users/inbox/${userId}`,
        { withCredentials: true }
      );
      setEmails(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching emails:", err);
      setEmails([]);
    } finally {
      setLoading(false);
    }
  };

  fetchEmails();
}, [userId]);


  return (
    <div className="container">
      <h5 className="fw-bold mb-3">Inbox for User ID: {userId}</h5>

      <button
        onClick={() => {
          setLoading(true);
          axios
            .get<Email[]>(`https://localhost:7262/api/Users/inbox/${userId}`, { withCredentials: true })
            .then((res) => setEmails(Array.isArray(res.data) ? res.data : []))
            .catch((err) => {
              console.error("Error fetching emails:", err);
              setEmails([]);
            })
            .finally(() => setLoading(false));
        }}
        className="btn btn-info text-white mb-3"
      >
        Reload Emails
      </button>

      {loading && <p>Loading emails...</p>}

      {!loading && emails.length === 0 && <p>No emails found.</p>}

      {emails.length > 0 && <EmailTable emails={emails} userId={userId} />}
    </div>
  );
};

export default Inbox;


