"use client";

import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Link from "next/link";

export interface ToolbarProps {
  title?: string;
}

export const Toolbar = ({ title }: ToolbarProps) => {
  return (
    <header className="sticky flex flex-col gap-4 mb-12">
      <div className="flex gap-4">
        Logo
        <span className="flex-1"></span>
        <Link href="/survey">
          <Button>Create a new Poll</Button>
        </Link>
        <ModeToggle />
      </div>
      {title && <h1 className="text-xl font-bold tracking-tight">{title}</h1>}
    </header>
  );
};
