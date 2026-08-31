import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Student from "@/app/models/Student";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const data = await request.json();

    const student = await Student.findByIdAndUpdate(
      id,
      {
        studentId: data.studentId,
        name: data.name,
        fatherName: data.fatherName,
        cnic: data.cnic,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("PUT /api/students/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to update student",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/students/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to delete student",
      },
      {
        status: 500,
      }
    );
  }
}