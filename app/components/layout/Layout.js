import Container from "react-bootstrap/Container";

function Layout(props) {
  return (
    <Container className="pt-2 d-flex justify-content-center">
      {props.children}
    </Container>
  );
}

export default Layout;
