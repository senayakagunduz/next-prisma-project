import {NextResponse} from "next/server";

export async function PATCH() {
  return NextResponse.json({ message: "Hello World" });
}
