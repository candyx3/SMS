import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Arun", course: "React" },
    { id: 2, name: "Priya", course: "Java" },
    { id: 3, name: "Karthik", course: "React" },
    { id: 4, name: "Divya", course: "Playwright" }
  ]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("React");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Courses");
  const [message, setMessage] = useState("");

  function addStudent(e) {
    e.preventDefault();
    setStudents([...students, {id: students.length ? Math.max(...students.map(s => s.id)) + 1: 1,name: name.trim(),course: course}]);
    setName("");
    setCourse("React");
    setMessage("");
  }

  function deleteStudent(id) {
    setStudents(students.filter(s => s.id !== id));
  }

  const result = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All Courses" || s.course === filter)
  );

  return (
    <div className="container">
      <h1>Student Management Dashboard</h1>
      <h3>Total Students: {students.length}</h3>
      <h2>Search Student</h2>
      <input placeholder="Search by name" value={search} onChange={e => setSearch(e.target.value)}/>
      <form onSubmit={addStudent}>
        <h2>Add Student</h2>
        <input placeholder="Student name" value={name} onChange={e => setName(e.target.value)}/>
        <select value={course} onChange={e => setCourse(e.target.value)}>
          <option>React</option>
          <option>Java</option>
          <option>Playwright</option>
          <option>Python</option>
          <option>Full Stack Web Development</option>
          <option>Software Testing</option>
        </select>
        <button>Add Student</button>
      </form>
      <h2>Filter by Course</h2>
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option>All Courses</option>
        <option>React</option>
        <option>Java</option>
        <option>Playwright</option>
        <option>Python</option>
        <option>Full Stack Web Development</option>
        <option>Software Testing</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {result.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td>
                <button type="button" onClick={() => deleteStudent(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {result.length === 0 && <p>No students found</p>}
      {message && <p>{message}</p>}
    </div>
  );
}
export default App