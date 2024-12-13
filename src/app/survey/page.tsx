"use client";

import { Toolbar } from "@/components/toolbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useId } from "react";

// import { graphql, useLazyLoadQuery } from "react-relay";

export default () => {
  const id = useId();
  return (
    <>
      <div className="flex flex-col gap-4">
        <label htmlFor={id + "-title"}>Survey Title</label>
        <Input type="email" placeholder="My awesome survey" />
      </div>
      <hr className="bg-primary" />
      <Toolbar title="Create a Survey" />
      enter title:
      <div className="flex flex-col gap-8 items-start">
        <Button>Add Question</Button>
      </div>
      {/* <Button onClick={() => create()}>Create Survey</Button> */}
    </>
  );
};
