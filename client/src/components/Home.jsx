import { Container, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux"; // 1. Added useDispatch
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTasks } from "../features/TaskSlice"; // 2. Import the Redux action

const quotes = [
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
  // 3. Get tasks from Redux instead of local useState
  const { tasks } = useSelector((state) => state.tasks); 
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [quote, setQuote] = useState("");
  const [activeTab, setActiveTab] = useState("Today");

  // Check Login
  useEffect(() => {
    if (!user?.email) navigate("/");
  }, [user, navigate]);

  // Set Random Quote
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  // 4. Fetch Tasks via Redux when page loads
  useEffect(() => {
    if (user?.email) {
      dispatch(getTasks(user.email));
    }
  }, [dispatch, user]);

  // 5. Filter from Redux state (Safety check included)
  const allTasks = Array.isArray(tasks) ? tasks : [];
  const filteredTasks = allTasks.filter((t) => t.type !== "Exam");
  const filteredExam = allTasks.filter((t) => t.type === "Exam");

  return (
    <Container fluid style={{ backgroundColor: "#f5f9ff", minHeight: "100vh", paddingBottom: "80px" }}>
      {/* Hero Section */}
      <div style={{
        backgroundColor: "#2b63d9",
        color: "white",
        padding: "20px",
        borderRadius: "0 0 20px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h5 style={{ fontWeight: "600" }}>Daily Study Planner</h5>
        </div>
        <img src="https://img.icons8.com/color/96/books.png" alt="books" />
      </div>

      {/* Greeting & Quote */}
      <div className="p-4">
        <h2 style={{ fontWeight: "700" }}>Hey, {user?.uname || "User"}!</h2>
        <div style={{
          backgroundColor: "#cfe0ff",
          padding: "12px",
          borderRadius: "10px",
          marginTop: "10px",
          marginBottom: "20px"
        }}>
          <p style={{ margin: 0, fontSize: "18px" }}>"{quote}"</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          {["Yesterday", "Today", "Tomorrow", "Next 7 days"].map((tab) => (
            <Button
              key={tab}
              color={activeTab === tab ? "warning" : "light"}
              onClick={() => setActiveTab(tab)}
              style={{ flex: 1, margin: "0 4px", fontSize: "14px" }}
            >
              {tab}
            </Button>
          ))}
          <Link to="/tasks" style={{ fontSize: "14px", alignSelf: "center" }}>See All</Link>
        </div>

        {/* Tasks Section */}
        <h5 style={{ fontWeight: "600", marginBottom: "10px" }}>Tasks</h5>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div 
              key={task._id} 
              // 6. ON CLICK: Navigate to Edit Screen
              onClick={() => navigate(`/add-task/${task._id}`)}
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                cursor: "pointer" // Shows hand cursor
              }}
            >
              <strong>{task.title}</strong>
              <p style={{ margin: "4px 0" }}>{task.details}</p>
              <small>{task.subject}</small>
            </div>
          ))
        ) : (
          <div style={{
            backgroundColor: "#c5d8f3ff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center"
          }}>
            <img src="https://img.icons8.com/color/96/student-male--v1.png" alt="no tasks" />
            <p style={{ marginTop: "10px", fontWeight: "500" }}>You don't have any tasks!</p>
            <p style={{ fontSize: "14px" }}>Press + button to add new tasks</p>
          </div>
        )}
      </div>

      {/* Bottom Menu Bar */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "white",
        padding: "12px",
        display: "flex",
        justifyContent: "space-around",
        borderTop: "1px solid #ccc"
      }}>
        <Link to="/home">
          <img src="https://img.icons8.com/ios-filled/50/home.png" width="28" alt="home" />
        </Link>

        <Link to="/calendar">
          <img src="https://img.icons8.com/ios-filled/50/calendar.png" width="28" alt="calendar" />
        </Link>

        <Link to="/add-task">
          <img src="https://img.icons8.com/ios-glyphs/50/plus.png" width="32" alt="add" />
        </Link>

        <Link to="/tasks">
          <img src="https://img.icons8.com/ios-glyphs/30/task.png" width="27" alt="tasks" />
        </Link>

        <Link to="/profile">
          <img src="https://img.icons8.com/ios-filled/50/user.png" width="28" alt="profile" />
        </Link>
      </div>
    </Container>
  );
};

export default Home;



















