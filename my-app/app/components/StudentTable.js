"use client";

import {
  Edit3,
  Trash2,
  User,
} from "lucide-react";

import "./StudentTable.css";

export default function StudentTable({
  students,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="table-loading">
        Loading students...
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="empty-students">
        <div className="empty-icon">
          <User size={25} />
        </div>

        <h3>No Students Found</h3>

        <p>
          Add your first student to start managing
          student records.
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Student ID</th>
            <th>Father Name</th>
            <th>CNIC</th>
            <th>Registered</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>
                <div className="student-name">
                  <div className="student-avatar">
                    {student.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>

                  <div>
                    <strong>{student.name}</strong>
                    <span>Student</span>
                  </div>
                </div>
              </td>

              <td>
                <span className="student-id">
                  {student.studentId}
                </span>
              </td>

              <td>{student.fatherName}</td>

              <td>{student.cnic}</td>

              <td>
                {new Date(
                  student.createdAt
                ).toLocaleDateString("en-PK")}
              </td>

              <td>
                <div className="table-actions">
                  <button
                    className="edit-action"
                    title="Edit"
                    onClick={() => onEdit(student)}
                  >
                    <Edit3 size={16} />
                  </button>

                  <button
                    className="delete-action"
                    title="Delete"
                    onClick={() => onDelete(student)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}