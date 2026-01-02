import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function VerifyOTP() {
  return (
    <div className="w-[60%] mx-auto py-4 mb-10 px-10 flex flex-col">
        <form>
          <FieldGroup>
            {/* OTP Fields */}
            <Field className="center">
              <InputOTP maxLength={6} id="otp" required>
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border mx-auto">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </Field>

            {/* Submit + Resend */}
            <FieldGroup>
              <Button type="submit" size="sm">Verify</Button>

              <FieldDescription className="text-center">
                Didn’t receive the code?{" "}
                <span className="cursor-pointer underline">Resend</span>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
    </div>
  );
}
