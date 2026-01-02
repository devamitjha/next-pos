import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function Register({ className, openSheet}) {
  return (
    <div
      className={cn(
        "w-full py-4 mb-10 px-10 flex flex-col",
        className
      )}
    >
      <form>
        <FieldGroup>

          {/* Full Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" type="text" placeholder="John Doe" required />
          </Field>

          {/* Phone */}
          <Field>
            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
            <Input id="phone" type="text" placeholder="Enter phone" required />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>

          {/* Submit Button */}
          <Field>
            <Button type="submit" className="w-full" onClick={() => openSheet('verifyOTP')}>
              Send OTP
            </Button>

            <FieldDescription className="text-center mt-4">
              Already have an account?{" "}
              <span
                className="text-primary cursor-pointer underline-offset-4 hover:underline"
                onClick={() => openSheet("login")}
              >
                Login
              </span>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
