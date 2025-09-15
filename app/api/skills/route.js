import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper functions to read and write to db.json
const dbPath = path.join(process.cwd(), 'db.json');

const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { skills: [] };
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to database:', error);
    return false;
  }
};

// GET - Fetch all skills
export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json(db.skills);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST - Create a new skill
export async function POST(request) {
  try {
    const db = readDB();
    const body = await request.json();
    
    // Generate a new ID
    const maxId = db.skills.length > 0 
      ? Math.max(...db.skills.map(s => s.id)) 
      : 0;
    
    const newSkill = {
      id: maxId + 1,
      name: body.name,
      percentage: body.percentage,
      description: body.description
    };
    
    db.skills.push(newSkill);
    
    if (writeDB(db)) {
      return NextResponse.json(newSkill, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Failed to save skill' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}