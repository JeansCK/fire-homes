import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./login-form";
import Link from "next/link";

export default function Login() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        Don&apos;t have an account?
        <Link href="/register" className="pl-2 underline">
          Register here.
        </Link>
      </CardFooter>
    </Card>
  );
}