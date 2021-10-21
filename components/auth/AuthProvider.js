import React from 'react';
import { useSession,signIn  } from 'next-auth/react';
import { useRouter } from "next/router";

// import signIn from '../../pages/auth/login'
function AuthProvider({ children }) {
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  const router = useRouter();
  const role = 'admin';
  let needAuth = false;

  if (router.pathname.startsWith("/admin") && role !== "admin") {
    needAuth = true;
  }else if(router.pathname.startsWith("/auth") && session){
    needAuth = true
  }

  if(needAuth == true){
    React.useEffect(() => {
      if (status === "loading") return // Do nothing while loading
      if (!isUser) {
        return <>nie dziala</>
      } // If not authenticated, force log in
    }, [isUser, status])
    if (isUser) {
      return children
    }
    
  }else{
    return children;
  }



 



  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Wczytywanie strony lub nie masz uprawnień...</div>
}

export default AuthProvider;
