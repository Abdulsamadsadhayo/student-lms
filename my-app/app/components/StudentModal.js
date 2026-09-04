"use client";

import { useState } from "react";
import { X, UserPlus, Save } from "lucide-react";

import "./StudentModal.css";

export default function StudentModal({
  isOpen,
  onClose,
  student,
  onSuccess,
}) {
  const [form, setForm] = useState(() => ({
    studentId: student?.studentId || "",
    name: student?.name || "",
    fatherName: student?.fatherName || "",
    cnic: student?.cnic || "",
  }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(student);

  if (!isOpen) {
    return null;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (
      !form.studentId ||
      !form.name ||
      !form.fatherName ||
      !form.cnic
    ) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const url = isEdit
        ? `/api/students/${student._id}`
        : "/api/students";

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      onSuccess(data.student);

      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="student-modal">
        <div className="modal-header">
          <div>
            <div className="modal-title-icon">
              {isEdit ? <Save size={20} /> : <UserPlus size={20} />}
            </div>

            <div>
              <h2>
                {isEdit ? "Update Student" : "Add New Student"}
              </h2>

              <p>
                {isEdit
                  ? "Update student information"
                  : "Enter student information below"}
              </p>
            </div>
          </div>

          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Student ID</label>

              <input
                type="text"
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
                placeholder="e.g. STD-001"
              />
            </div>

            <div className="form-group">
              <label>CNIC</label>

              <input
                type="text"
                name="cnic"
                value={form.cnic}
                onChange={handleChange}
                placeholder="42101-1234567-1"
              />
            </div>

            <div className="form-group full-width">
              <label>Student Name</label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter student name"
              />
            </div>

            <div className="form-group full-width">
              <label>Father Name</label>

              <input
                type="text"
                name="fatherName"
                value={form.fatherName}
                onChange={handleChange}
                placeholder="Enter father name"
              />
            </div>
          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <div className="modal-footer">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : isEdit
                ? "Update Student"
                : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}