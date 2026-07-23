import { cn } from "#/lib/utils.ts"
import { Button } from "#/components/ui/button.tsx"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "#/components/ui/field.tsx"
import { Input } from "#/components/ui/input.tsx"
import { Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import toast from "react-hot-toast"
import { authClient } from "#/lib/auth-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    }, {
      onRequest: (_) => {
        toast('requesting for login user')
      },
      onSuccess: (ctx) => {
        toast.success("user login successful")
        const role = ctx.data?.user?.role;
        if (role === "admin") {
          navigate({ to: "/admin" })
        } else {
          navigate({ to: "/" })
        }
      },
      onError: (_) => {
        toast.error("error in user login")
      },
    });

    console.log(data, error)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Field>
              <Field>
                <Button onClick={handleSignIn}>Login</Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/auth/register">Sign up</Link>
                </FieldDescription> 
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
