import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "../components/layout/loading";

export default function AuthProvider({ children }) {
  const { data: session, status, token } = useSession();
  const [allowed, setAllowed] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const perm = session && session.user ? session.user.permission : 0;
  useEffect(() => {
    if (status == "loading") {
      setLoading(true);
    } else {
      if (router.pathname.startsWith("/admin") && perm < 2) {
        setAllowed(false);
      } else {
        setAllowed(true);
      }
      setLoading(false);
    }

    if (!allowed && !loading) {
      router.push("/");
    }
  }, [session, router, status]);

  return loading ? (
    <Loading />
  ) : (
    <>{allowed ? children : <>Brak uprawnień</>}</>
  );
}
