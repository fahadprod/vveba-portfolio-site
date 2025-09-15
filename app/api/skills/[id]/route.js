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

// GET - Fetch a specific skill
export async function GET(request, { params }) {
  try {
    const db = readDB();
    const skill = db.skills.find(s => s.id === parseInt(params.id));
    
    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch skill' },
      { status: 500 }
    );
  }
}

// PATCH - Update a skill
export async function PATCH(request, { params }) {
  try {
    const db = readDB();
    const body = await request.json();
    const skillIndex = db.skills.findIndex(s => s.id === parseInt(params.id));
    
    if (skillIndex === -1) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }
    
    // Update the skill with the new data
    db.skills[skillIndex] = { 
      ...db.skills[skillIndex], 
      ...body 
    };
    
    if (writeDB(db)) {
      return NextResponse.json(db.skills[skillIndex]);
    } else {
      return NextResponse.json(
        { error: 'Failed to update skill' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update skill' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a skill
export async function DELETE(request, { params }) {
  try {
    const db = readDB();
    const skillIndex = db.skills.findIndex(s => s.id === parseInt(params.id));
    
    if (skillIndex === -1) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }
    
    db.skills.splice(skillIndex, 1);
    
    if (writeDB(db)) {
      return NextResponse.json({ message: 'Skill deleted successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete skill' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
}