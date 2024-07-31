import dbConnect from "@/lib/dbConnect";
import Task from "@/model/TaskModel";
import User from "@/model/UserModel";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

interface TaskRequestBody {
  title: string;
  description?: string;
  status: string;
  priority?: string;
  deadline?: Date;
  createdAt: Date;
}

export async function GET(req: any) {
    try {
      await dbConnect();
      const session:any = await getServerSession(req);
      console.log('Full session object:', JSON.stringify(session, null, 2));
  
      if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
  
      // Fetch user from database using email
      const user = await User.findOne({ email: session.user.email });
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
      const userId = user._id;
  
      console.log('User ID:', userId);
  
      const tasks = await Task.find({ user: userId });
      console.log('Tasks:', tasks);
  
      return NextResponse.json(tasks);
    } catch (error: any) {
      console.error('Error fetching tasks:', error.message);
      return NextResponse.json({ message: 'Failed to fetch tasks' }, { status: 500 });
    }
  }

export async function POST(req: Request) {
    try {
      await dbConnect();
      const session = await getServerSession();
      console.log("Full session object:", JSON.stringify(session, null, 2));
  
      if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
  
      // Fetch user from database using email
      const user = await User.findOne({ email: session.user.email });
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
      const userId = user._id;
  
      console.log("User ID:", userId);
  
      const requestBody: TaskRequestBody = await req.json();
      if (!requestBody.title || !requestBody.status) {
        return NextResponse.json({ message: 'Title and status are required' }, { status: 400 });
      }
  
      const allowedPriorities = ['Low', 'Medium', 'Urgent'];
      if (requestBody.priority && !allowedPriorities.includes(requestBody.priority)) {
        return NextResponse.json({ message: 'Invalid priority value' }, { status: 400 });
      }
  
      // Add userId to requestBody
      const task = new Task({ ...requestBody, user: userId });
      console.log(task);
      const savedTask = await task.save();
      return NextResponse.json(savedTask, { status: 201 });
    } catch (error: any) {
      console.error('Error saving task:', error.message);
      return NextResponse.json({ message: 'Failed to save task' }, { status: 500 });
    }
  }