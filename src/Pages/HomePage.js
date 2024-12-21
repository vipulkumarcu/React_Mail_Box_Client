import React, { useEffect, useState } from "react";
import {
  Spinner,
  Button,
  Container,
  Row,
  Col,
  Form,
  Alert,
  InputGroup,
  FormControl,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmails } from "../Features/Functions/FetchEmails"; // Import the async function
import { setAlert, clearAlert } from "../Features/Slices/alertSlice"; // Import alert actions
import { DismissAlert } from "../Features/Functions/DismissAlert";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [checkedEmails, setCheckedEmails] = useState([]);

  const userEmail = localStorage.getItem("Email") || "vipulkumar.gts@gmail.com";
  const alert = useSelector((state) => state.alert); // Access alert state from Redux

  useEffect(() => {
    async function getEmails() {
      setLoading(true);

      const result = await fetchEmails(userEmail)(); // Fetch emails

      if (result.success) {
        setEmails(result.data);
      } else {
        dispatch(setAlert({ type: "danger", message: result.message })); // Set alert using Redux
      }

      setLoading(false);

      DismissAlert (dispatch);
    }

    getEmails();
  }, [dispatch, userEmail]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setCheckedEmails(emails.map((email) => email.id));
    } else {
      setCheckedEmails([]);
    }
  };

  const handleCheckboxChange = (id) => {
    if (checkedEmails.includes(id)) {
      setCheckedEmails(checkedEmails.filter((emailId) => emailId !== id));
    } else {
      setCheckedEmails([...checkedEmails, id]);
    }
  };

  const filteredEmails = emails.filter(
    (email) =>
      email.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid className="p-4 bg-success bg-gradient min-vh-100">
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-white p-3 shadow-sm">
          <Button
            className="w-100 mb-3 btn-success"
            onClick={() => navigate("/create-email")}
          >
            <i className="bi bi-pencil"></i> Compose
          </Button>
          <ul className="list-unstyled">
            <li className="py-2 border-bottom text-primary">Inbox</li>
            <li className="py-2 border-bottom">Starred</li>
            <li className="py-2 border-bottom">Sent</li>
            <li className="py-2 border-bottom">Drafts</li>
          </ul>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <div className="bg-white shadow-sm p-3">
            {/* Inbox Header */}
            <Card.Header
              as="h5"
              className="bg-success text-white p-3 text-center"
              style={{
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
            >
              Inbox
            </Card.Header>

            {/* Search Box */}
            <InputGroup className="my-3 shadow-sm">
              <FormControl
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="warning">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>

            {/* Action Icons */}
            <div className="d-flex align-items-center p-2">
              <Form.Check
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="me-3"
              />
              <i
                className="bi bi-trash text-danger me-3"
                style={{ cursor: "pointer", fontSize: "1.5rem" }}
              ></i>
              <i
                className="bi bi-archive text-warning me-3"
                style={{ cursor: "pointer", fontSize: "1.5rem" }}
              ></i>
              <i
                className="bi bi-envelope-open text-info me-3"
                style={{ cursor: "pointer", fontSize: "1.5rem" }}
              ></i>
              <i
                className="bi bi-star text-secondary"
                style={{ cursor: "pointer", fontSize: "1.5rem" }}
              ></i>
            </div>

            {/* Alert */}
            {alert.message && (
              <Alert
                variant={alert.type}
                dismissible
                onClose={() => dispatch(clearAlert())} // Clear alert when dismissed
                className="mb-3"
              >
                {alert.message}
              </Alert>
            )}

            {/* Loading Spinner */}
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : filteredEmails.length === 0 ? (
              <p>No emails found.</p>
            ) : (
              filteredEmails.map((email, index) => (
                <div
                  key={index}
                  className={`d-flex align-items-center border-bottom p-2 ${
                    checkedEmails.includes(email.id) ? "bg-light" : ""
                  }`}
                  style={{
                    transition: "background-color 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e9e9e9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = checkedEmails.includes(email.id)
                      ? "#e9e9e9"
                      : "#fff")
                  }
                >
                  <Form.Check
                    type="checkbox"
                    className="me-3"
                    checked={checkedEmails.includes(email.id)}
                    onChange={() => handleCheckboxChange(email.id)}
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">{email.to}</span>
                      <span className="text-muted small">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-primary mb-0">Subject - {email.subject}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;