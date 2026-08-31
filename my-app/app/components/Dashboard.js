"use client";

import { useEffect, useState } from "react";

import {
  Users,
  UserPlus,
  GraduationCap,
  Search,
  Menu,
  Bell,
} from "lucide-react";

import Sidebar from "./Sidebar";
import StudentModal from "./StudentModal";
import StudentTable from "./StudentTable";

import "./Dashboard.css";

export default function Dashboard() {
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activePage, setActivePage] =
    useState("dashboard");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      setLoading(true);

      const response = await fetch("/api/students", {
        cache: "no-store",
      });

      const data = await response.json();

      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setSelectedStudent(null);
    setModalOpen(true);
  }

  function openEditModal(student) {
    setSelectedStudent(student);
    setModalOpen(true);
  }

  async function deleteStudent(student) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/students/${student._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      setStudents((previous) =>
        previous.filter(
          (item) => item._id !== student._id
        )
      );
    } catch (error) {
      alert("Failed to delete student");
    }
  }

  function handleStudentSuccess(student) {
    if (selectedStudent) {
      setStudents((previous) =>
        previous.map((item) =>
          item._id === student._id ? student : item
        )
      );
    } else {
      setStudents((previous) => [
        student,
        ...previous,
      ]);
    }
  }

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    return (
      student.name
        ?.toLowerCase()
        .includes(searchText) ||
      student.studentId
        ?.toLowerCase()
        .includes(searchText) ||
      student.fatherName
        ?.toLowerCase()
        .includes(searchText) ||
      student.cnic
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  return (
    <div className="admin-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={21} />
          </button>

          <div className="topbar-title">
            <h1>Student Management</h1>
            <p>
              Manage all registered students from one
              place.
            </p>
          </div>

          <div className="topbar-right">
            <button className="notification">
              <Bell size={19} />
              <span />
            </button>

            <div className="admin-profile">
              <div className="admin-avatar">A</div>

              <div>
                <strong>Admin</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="page-heading">
            <div>
              <span className="breadcrumb">
                Admin / Students
              </span>

              <h2>Students</h2>

              <p>
                View and manage student information.
              </p>
            </div>

            <button
              className="add-student-btn"
              onClick={openAddModal}
            >
              <UserPlus size={18} />
              Add Student
            </button>
          </div>

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">
                <Users size={23} />
              </div>

              <div>
                <span>Total Students</span>
                <strong>{students.length}</strong>
                <small>Registered students</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <GraduationCap size={23} />
              </div>

              <div>
                <span>Student Records</span>
                <strong>{students.length}</strong>
                <small>Available records</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">
                <UserPlus size={23} />
              </div>

              <div>
                <span>Latest Students</span>
                <strong>
                  {Math.min(students.length, 5)}
                </strong>
                <small>Recent registrations</small>
              </div>
            </div>
          </section>

          <section className="student-section">
            <div className="section-header">
              <div>
                <h3>All Students</h3>
                <p>
                  Complete list of registered students
                </p>
              </div>

              <div className="search-box">
                <Search size={17} />

                <input
                  type="text"
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />
              </div>
            </div>

            <StudentTable
              students={filteredStudents}
              loading={loading}
              onEdit={openEditModal}
              onDelete={deleteStudent}
            />
          </section>
        </div>
      </main>

      <StudentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        student={selectedStudent}
        onSuccess={handleStudentSuccess}
      />
    </div>
  );
}