"use client";

import { RelayEnvironmentProvider } from "react-relay";
import environment from "@/relay/environment";

export default ({ children }: { children: React.ReactNode }) => (
  <RelayEnvironmentProvider environment={environment}>
    {children}
  </RelayEnvironmentProvider>
);
