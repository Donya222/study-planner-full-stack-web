import { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const AddTask = () => {
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL if editing

  const [formData, setFormData] = useState({
    title: "",
    details: "",
    subject: "",
    type: "Task",
    dueDate: "",
    dueTime: ""
  });

  
  useEffect(() => {
    if (!user?.email) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const res = await axios.get(`/api/tasks/${id}`);
          const task = res.data;
          
          // Format Date for Input
          const dt = new Date(task.dueDateTime);
          const dateStr = dt.toISOString().split("T")[0]; // yyyy-mm-dd
          const timeStr = dt.toTimeString().split(" ")[0].substring(0, 5); // hh:mm

          setFormData({
            title: task.title,
            details: task.details,
            subject: task.subject,
            type: task.type,
            dueDate: dateStr,
            dueTime: timeStr
          });
        } catch (err) {
          console.error("Error fetching task", err);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedDate = new Date(`${formData.dueDate}T${formData.dueTime}`);
    const payload = { ...formData, dueDateTime: combinedDate, email: user.email };

    try {
      if (id) {
        await axios.put(`/api/tasks/${id}`, payload); 
      } else {
        await axios.post("/api/tasks", payload); 
      }
      navigate("/home");
    } catch (err) {
      alert("Error saving task");
    }
  };

  
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(`/api/tasks/${id}`);
        navigate("/home");
      } catch (err) {
        alert("Error deleting task");
      }
    }
  };

  return (
    <Container fluid style={{ backgroundColor: "#f5f9ff", minHeight: "100vh", padding: "20px" }}>
      <Row className="justify-content-center">
        <Col md="6" style={{ backgroundColor: "white", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <h3 className="mb-4 text-primary">{id ? "Edit Task" : "Add New Task"}</h3>
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Title</Label>
              <Input name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Math Homework" />
            </FormGroup>

            <FormGroup>
              <Label>Details</Label>
              <Input type="textarea" name="details" value={formData.details} onChange={handleChange} required rows="3" />
            </FormGroup>

            <FormGroup>
              <Label>Subject</Label>
              <Input name="subject" value={formData.subject} onChange={handleChange} required />
            </FormGroup>

            <FormGroup>
              <Label>Type</Label>
              <Input type="select" name="type" value={formData.type} onChange={handleChange}>
                <option value="Task">Task</option>
                <option value="Exam">Exam</option>
              </Input>
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Due Date</Label>
                  <Input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Time</Label>
                  <Input type="time" name="dueTime" value={formData.dueTime} onChange={handleChange} required />
                </FormGroup>
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <Button color="secondary" onClick={() => navigate("/home")}>Cancel</Button>
              <div>

                {id && (
                  <Button color="danger" onClick={handleDelete} style={{ marginRight: "10px" }}>
                    Delete
                  </Button>
                )}
                <Button color="primary" type="submit">
                  {id ? "Update Task" : "Save Task"}
                </Button>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTask;






























