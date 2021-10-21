import { useSession } from "next-auth/react"
import Router from 'next/router'

export default function Home(currentPage) {
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
		  // The user is not authenticated, handle it here.
		  Router.push('/')
		}
	  })
	
	  if (status === "loading") {
		return "Loading or not authenticated..."
	  }
	
	  return <>Masz uprawnienie</>
	}

	Home.auth = {
		role: "admin",
		loading:  <>Loading admin...</>,
		unauthorized: "/ad", // redirect to this url
	  }