"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput} from "@/components/ui/input-group"
import { EyeOff, Eye  } from 'lucide-react';
import { useAgentLogin } from "@/services/useAgentLogin";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const { trigger, isMutating } = useAgentLogin();

  const [agentCode, setAgentCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 NEW

  const storeAgentLogin = async (e) => {
    e.preventDefault();

    if (!agentCode.trim()) {
      toast.error("Agent code is required");
      return;
    }

    if (password.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }

    try {
      await trigger({ agentCode, password });
      toast.success("Login successful");
      router.push("/profile");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={storeAgentLogin}
    >
      <div className="flex flex-col items-center justify-between gap-8">
        <div className="flex items-center text-center">
          <h1 className="text-2xl">Agent Login</h1>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <Field>
            <Input
              className="h-15"
              type="text"
              value={agentCode}
              onChange={(e) => setAgentCode(e.target.value)}
              placeholder="Enter Agent Code"
              required
            />
          </Field>

          <InputGroup  className="h-15 relative">
            <InputGroupInput placeholder="Enter password" type={showPassword ? "text" : "password"} required  value={password}  onChange={(e) => setPassword(e.target.value)}/>   
            <div className="w-15 h-full flex justify-center items-center" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <Eye size={18} color="gray"/> : <EyeOff size={18} color="gray" />}
            </div>
          </InputGroup>

          <Field>
              <Button
                type="submit"
                className="h-15 w-full uppercase text-lg cursor-pointer"
                disabled={isMutating}
              >
                {isMutating ? "Logging in..." : "Login"}
              </Button>

            <FieldDescription className="text-center">
              <a href="#" className="underline underline-offset-4">
                Contact Administrator
              </a>
            </FieldDescription>
          </Field>
        </div>
      </div>
    </form>
  );
}
