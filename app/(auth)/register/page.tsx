import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterFrom from "./register-form";
import Link from "next/link";

export default function Register() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          Register
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterFrom />
      </CardContent>
      <CardFooter>
        Already have an account?
        <Link href="/login" className="pl-2 underline">
          Login here.
        </Link>
      </CardFooter>
    </Card>
  );
}