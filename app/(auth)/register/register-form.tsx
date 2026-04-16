"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ContinueWithGoogleButton from "@/components/continue-with-google-button";
import { registerUserSchema } from "@/app/validation/registerUser";
import { registerUser } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterFrom() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    }
  });

  const handleSubmit = async (data: z.infer<typeof registerUserSchema>) => {
    const response = await registerUser(data);

    if (!!response?.error) {
      toast.error("Error!", {
        description: response.message,
      });
      return;
    }

    toast.success("Success", {
      description: "Your account was created successfully",
    });

    router.push("/login");
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset disabled={form.formState.isSubmitting} className="flex flex-col gap-4">
          <FormField control={form.control} name="name" render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  Your name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />
          <FormField control={form.control} name="email" render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  Email
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />
          <FormField control={form.control} name="password" render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  Password
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Password" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />
          <FormField control={form.control} name="passwordConfirm" render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Confirm Password" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />
          <Button type="submit">Register</Button>
          <div className="text-center">or</div>
        </fieldset>
      </form>
      <ContinueWithGoogleButton />
    </Form>
  )
}