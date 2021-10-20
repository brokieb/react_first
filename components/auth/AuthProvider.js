import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

function AuthProvider(props) {
  const router = useRouter();
  const { data: session } = useSession();
console.log(session)
  let allowed = null;

  if (router.pathname.startsWith('/auth') && session) {
    allowed = false;
  }else if(router.pathname.startsWith('/user') && !session){
    allowed = false;
  }else{
    allowed = true;
  }

  console.log(allowed);
  
    if (allowed == true) {
    return<Container className='pt-2 d-flex justify-content-center flex-column align-items-center'>{props.children}</Container>;
	}else{
		return(
		<Container className='pt-2 d-flex justify-content-center flex-column align-items-center'>
		        <h2>Błąd strony container</h2>
		        <h4>Strona którą próbujesz odwiedzić nie istnieje w tym miejscu</h4>
		        <p>Przekierowywanie...</p>
		      </Container>
			  )
	}
}

export default AuthProvider;
