import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/app/api/dbConfig/dbConfig';
import managerModel from '@/app/api/models/managerModel';
connect();

export async function GET(request = NextRequest) {
  try {
    // Fetch data from the database
    const tasks = await managerModel.find();

    return NextResponse.json({
      tasks,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
