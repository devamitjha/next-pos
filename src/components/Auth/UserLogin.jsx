import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function UserLogin({ className, openSheet }) {
  return (
    <div className={cn("w-full py-4 mb-10 px-10 flex flex-col", className)}>
      <form>
          <FieldGroup>
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
              <Input
                id="phone"
                type="text"
                placeholder="Enter phone"
                required
              />
            </Field>

            {/* Buttons */}
            <Field>
              <Button type="submit" className="w-full" onClick={() => openSheet('verifyOTP')}>
                Send OTP
              </Button>

              <FieldDescription className="text-center mt-4">
                Don&apos;t have an account? <span onClick={() => openSheet('register')}>Sign up</span>
              </FieldDescription>
            </Field>
          </FieldGroup>
      </form>
    </div>
  );
}
