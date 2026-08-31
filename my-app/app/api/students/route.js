import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Student from "@/app/models/Student";

export async function GET() {
  try {
    await connectDB();

    const students = await Student.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      students,
    });
  } catch (error) {
    console.error("GET /api/students error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch students",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();

    const student = await Student.create({
      studentId: data.studentId,
      name: data.name,
      fatherName: data.fatherName,
      cnic: data.cnic,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student created successfully",
        student,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/students error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to create student",
      },
      {
        status: 400,
      }
    );
  }
}