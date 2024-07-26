"use client";

import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useState } from "react";

export const Social = () => {
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    setLoading(true)
    if (provider === "google") {
      setGoogleLoading(true);
    } else if (provider === "github") {
      setGithubLoading(true);
    } else {
      console.log(provider);
    }

    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("google")} disabled={loading}>
        {googleLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <FcGoogle className="h-5 w-5" />
        )}
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("github")} disabled={loading}>
        {githubLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <FaGithub className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};
