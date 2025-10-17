
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


