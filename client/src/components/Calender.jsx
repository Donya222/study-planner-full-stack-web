import React, { useState } from "react";

const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getStartDay = (month, year) => new Date(year, month, 1).getDay(); // 0 = Sunday

  const handleNextYear = () => setYear((prev) => prev + 1);
  const handlePrevYear = () => setYear((prev) => prev - 1);

  return (
    <div className="calendar-container">
      {/* Year Navigation */}
      <div className="calendar-header">
        <button onClick={handlePrevYear}>◀</button>
        <h2 className="calendar-title">{year} Study Calendar</h2>
        <button onClick={handleNextYear}>▶</button>
      </div>

      {/* Month Grid */}
      <div className="calendar-grid">
        {months.map((month, index) => {
          const daysInMonth = getDaysInMonth(index, year);
          const startDay = getStartDay(index, year);
          const blanks = Array(startDay).fill(null);
          const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
          const allCells = [...blanks, ...days];

          return (
            <div className="month" key={month}>
              <h4 className="month-title">{month}</h4>
              <div className="days-header">
                {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                  <div key={d} className="day-name">{d}</div>
                ))}
              </div>
              <div className="days-grid">
                {allCells.map((day, i) => (
                  <div key={i} className={`day-cell ${day ? "filled" : "blank"}`}>
                    {day || ""}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
