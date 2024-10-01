import { NextResponse } from 'next/server';

let users: { id: number; name: string; phone: string }[] = [];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { name, phone } = await request.json();
  const newUser = { id: users.length + 1, name, phone };
  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}
