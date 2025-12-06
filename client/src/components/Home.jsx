import { Container, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTasks } from "../features/TaskSlice";
import { updateTaskDone, deleteTask } from "../features/TaskSlice";

const quotes = [
  "Believe you can and you're halfway there.",
  "Success is not final; failure is not fatal.",
  "Believe you can and you're halfway there.",
  "Success is not final; failure is not fatal.",
  "Dream big and dare to fail.",
  "Start where you are. Do what you can.",
  "Small steps every day lead to big results.", 
  "Your only limit is your mind.", 
  "Don’t stop until you’re proud.",
  "Push yourself, because no one else will.", 
  "Stay positive. Work hard. Make it happen.", 
  "You are capable of amazing things.",
  "Doubt kills more dreams than failure ever will.", 
  "You get what you work for.", 
  "Focus on the step in front of you.", 
  "Rise up and attack the day with enthusiasm.", 
  "Consistency is more important than perfection.", 
  "Your future depends on what you do today.", 
  "Discipline creates freedom.", 
  "Keep going. You’re getting there.",
  "It's a slow process, but quitting won’t speed it up.",
  "Every day is a new beginning.",
  "Good things take time.",
  "If you can dream it, you can do it.",
  "Don't wish for it. Work for it.",
  "Wake up with determination.",
  "Strive for progress, not perfection.",
  "Be stronger than your excuses.",
  "Make today count.",
  "The best view comes after the hardest climb.",
  "Believe in yourself always.",
  "Your hard work will pay off.",
  "Stay hungry. Stay foolish.",
  "Nothing worth having comes easy.", 
  "Focus on the goal, not the obstacle.",
  "Work hard in silence. Let success make the noise.",
  "Be the best version of yourself.", 
  "Fall seven times, get up eight.",
  "Success starts with self-discipline.",
  "Don't stop until you're proud.", 
  "You can and you will.", 
  "Study now, shine later.",
  "Your dreams are worth fighting for.",
  "The expert was once a beginner.",
  "Winners never quit.", 
  "You are stronger than you think.",
  "Do it for your future self.", 
  "Every accomplishment starts with the decision to try.", 
  "Education is your superpower.", 
  "Prove yourself to yourself, not others.",
   "Keep studying — future you will thank you."
];

const Home = () => {
  const user = useSelector((state) => state.users.user);
  const { tasks } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (!user?.email) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    const r = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[r]);
  }, []);

  useEffect(() => {
    if (user?.email) {
      dispatch(getTasks(user.email));
    }
  }, [dispatch, user]);

  const allTasks = Array.isArray(tasks) ? tasks : [];

  // SPLITTING TASKS
  const filteredTasks = allTasks.filter((t) => t.type !== "Exam" && !t.done);
  const filteredExam = allTasks.filter((t) => t.type === "Exam" && !t.done);
  const doneItems = allTasks.filter((t) => t.done);

  return (
    <Container
      fluid
      style={{ backgroundColor: "#f5f9ff", minHeight: "100vh", paddingBottom: "80px" }}
    >

      {/* ---------------- HERO ---------------- */}
      <div
        style={{
          backgroundColor: "#2b63d9",
          color: "white",
          padding: "20px",
          borderRadius: "0 0 20px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5 style={{ fontWeight: "600" }}>Daily Study Planner</h5>
        <img src="https://img.icons8.com/color/96/books.png" alt="books" />
      </div>

      {/* ---------------- GREETING + QUOTE ---------------- */}
      <div className="p-4">
        <h2 style={{ fontWeight: "700" }}>Hey, {user?.uname || "User"}!</h2>

        <div
          style={{
            backgroundColor: "#cfe0ff",
            padding: "12px",
            borderRadius: "10px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <p style={{ margin: 0, fontSize: "18px" }}>"{quote}"</p>
        </div>

        {/* ---------------- TWO COLUMNS ---------------- */}
        <div style={{ display: "flex", gap: "12px" }}>

          {/* ---------------- TASKS COLUMN ---------------- */}
          <div style={{ flex: 1 }}>
            <h5 style={{ fontWeight: "600", marginBottom: "10px" }}>Tasks</h5>

            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={task._id}
                  style={{
                    backgroundColor: "#fff",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >

                  {/* LEFT: Checkbox + Info */}
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => dispatch(updateTaskDone(task._id))}
                    />

                    <div
                      onClick={() => navigate(`/add-task/${task._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <strong>{task.title}</strong>
                      <p style={{ margin: 0 }}>{task.details}</p>
                      <small>{task.subject}</small>
                    </div>
                  </div>

                  {/* RIGHT ICONS */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <img
                      width="22"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/add-task/${task._id}`)}
                      src="https://img.icons8.com/ios-glyphs/30/edit--v1.png"
                      alt="edit"
                    />

                    <img
                      width="22"
                      style={{ cursor: "pointer" }}
                      onClick={() => dispatch(deleteTask(task._id))}
                      src="https://img.icons8.com/material-outlined/30/filled-trash.png"
                      alt="delete"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks available.</p>
            )}
          </div>

          {/* ---------------- EXAMS COLUMN ---------------- */}
          <div style={{ flex: 1 }}>
            <h5 style={{ fontWeight: "600", marginBottom: "10px" }}>Exams</h5>

            {filteredExam.length > 0 ? (
              filteredExam.map((exam) => (
                <div
                  key={exam._id}
                  style={{
                    backgroundColor: "#fff",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >

                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={exam.done}
                      onChange={() => dispatch(updateTaskDone(exam._id))}
                    />

                    <div
                      onClick={() => navigate(`/add-task/${exam._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <strong>{exam.title}</strong>
                      <p style={{ margin: 0 }}>{exam.details}</p>
                      <small>{exam.subject}</small>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <img
                      width="22"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/add-task/${exam._id}`)}
                      src="https://img.icons8.com/ios-glyphs/30/edit--v1.png"
                    />

                    <img
                      width="22"
                      style={{ cursor: "pointer" }}
                      onClick={() => dispatch(deleteTask(exam._id))}
                      src="https://img.icons8.com/material-outlined/30/filled-trash.png"
                    />
                  </div>

                </div>
              ))
            ) : (
              <p>No exams available.</p>
            )}
          </div>
        </div>

        {/* ---------------- COMPLETED SECTION ---------------- */}
        <h5 style={{ fontWeight: "600", marginTop: "30px" }}>Completed</h5>

        {doneItems.length > 0 ? (
          doneItems.map((d) => (
            <div
              key={d._id}
              style={{
                backgroundColor: "#d4ffd4",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              ✔ {d.title}

              {/* ADDED DATE HERE */}
              {d.completedAt && (
                <div>
                  <small style={{ color: "#444" }}>
                    Completed on: {new Date(d.completedAt).toLocaleString()}
                  </small>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No completed items yet.</p>
        )}

      </div>

      {/* ---------------- BOTTOM NAV ---------------- */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "white",
          padding: "12px",
          display: "flex",
          justifyContent: "space-around",
          borderTop: "1px solid #ccc",
        }}
      >
        <Link to="/home">
          <img src="https://img.icons8.com/ios-filled/50/home.png" width="28" />
        </Link>

        <Link to="/calendar">
          <img src="https://img.icons8.com/ios-filled/50/calendar.png" width="28" />
        </Link>

        <Link to="/add-task">
          <img src="https://img.icons8.com/ios-glyphs/50/plus.png" width="32" />
        </Link>

        <Link to="/tasks">
          <img src="https://img.icons8.com/ios-glyphs/30/task.png" width="27" />
        </Link>

        <Link to="/profile">
          <img src="https://img.icons8.com/ios-filled/50/user.png" width="28" />
        </Link>
      </div>

    </Container>
  );
};

export default Home;