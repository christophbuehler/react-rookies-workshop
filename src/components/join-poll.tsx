import { Button } from "./ui/button";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./ui/input-otp";

export const JoinPoll = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="text-3xl font-bold tracking-tight">Join Poll</h2>
      <p>Enter Poll id to contribute.</p>
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot autoComplete="off" index={0} />
          <InputOTPSlot autoComplete="off" index={1} />
          <InputOTPSlot autoComplete="off" index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot autoComplete="off" index={3} />
          <InputOTPSlot autoComplete="off" index={4} />
          <InputOTPSlot autoComplete="off" index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Link href="/survey/xxxxx">
        <Button>Join Poll</Button>
      </Link>
    </div>
  );
};
