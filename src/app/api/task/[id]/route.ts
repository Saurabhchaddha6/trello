import dbConnect from "@/lib/dbConnect";
import Task from "@/model/TaskModel";
import User from "@/model/UserModel"; // Assuming you have a User model
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // Adjust this import based on your auth setup

async function getUserFromSession(session) {
  if (!session || !session.user || !session.user.email) {
    return null;
  }
  return await User.findOne({ email: session.user.email });
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const session = await getServerSession(req);
    console.log('Full session object:', JSON.stringify(session, null, 2));

    const user = await getUserFromSession(session);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;
    const updatedData = await req.json(); // Parse the request body

    const task = await Task.findOne({ _id: id, user: user._id });
    if (!task) {
      return NextResponse.json({ message: "Task not found or you're not authorized to modify it" }, { status: 404 });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updatedData, { new: true });
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ message: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const session = await getServerSession(req);
    console.log('Full session object:', JSON.stringify(session, null, 2));

    const user = await getUserFromSession(session);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;
    const task = await Task.findOne({ _id: id, user: user._id });
    if (!task) {
      return NextResponse.json({ message: "Task not found or you're not authorized to delete it" }, { status: 404 });
    }

    await Task.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ message: 'Failed to delete task' }, { status: 500 });
  }
}