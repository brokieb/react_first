import { useCookies } from "react-cookie";
import { set } from "../../../app/features/counter/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Navbar,
  Nav,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";
import {
  faRocket,
  faShoppingCart,
  faCashRegister,
  faUsersCog,
  faSitemap,
  faChartLine,
  faFileAlt,
  faCog,
  faUserCircle,
  faCreditCard,
  faSignOutAlt,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";
import { useSession, signOut } from "next-auth/react";
import axiosInstance from "../../../app/lib/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function UserNavPanel(props) {
  const { data: session, status } = useSession();
  const [cookies, setCookie] = useCookies(["cart"]);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const router = useRouter;

  useEffect(() => {
    axiosInstance
      .get("/api/cart/getCartItems", {
        params: {
          cart: cookies.cartId,
        },
      })
      .then((res) => {
        if (res.data.main) {
          let data = res.data.main.cart.items;
          if (data) {
            dispatch(set(data.length));
          }
        }
      });
  }, []);

  function redirect(e) {
    e.preventDefault();
    router.push(e.target.getAttribute("href"));
  }

  return (
    <>
      {session && session.user.permission == 2 && (
        <>
          <Dropdown>
            <Dropdown.Toggle align="end" variant="link" bsPrefix="p-0">
              <FontAwesomeIcon
                icon={faRocket}
                className="text-light"
                size="lg"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              {[
                {
                  title: "Zamówienia",
                  icon: faCashRegister,
                  link: "/admin/all-orders",
                },
                {
                  title: "Konta",
                  icon: faUsersCog,
                  link: "admin/credentials",
                },
                {
                  title: "Produkty",
                  icon: faSitemap,
                  link: "/admin/products-list",
                },
                {
                  title: "Kody zniżkowe",
                  icon: faPercent,
                  link: "/admin/discounts",
                },
                {
                  title: "Aukcje allegro",
                  icon: faSitemap,
                  link: "/admin/auctions",
                },
                {
                  title: "Statystyki",
                  icon: faChartLine,
                  link: "/admin/stats",
                },
                {
                  title: "Logi",
                  icon: faFileAlt,
                  link: "/admin/logs",
                },
                { divider: true },
                {
                  title: "Ustawienia sklepu",
                  icon: faCog,
                  link: "/admin/settings",
                },
              ].map((item, index) => {
                if (item.divider) {
                  return <Dropdown.Divider key={index} />;
                }
                return (
                  <Dropdown.Item
                    href={item.link}
                    className="d-flex flex-row gap-2 align-items-center"
                    key={index}
                  >
                    <FontAwesomeIcon
                      style={{ width: "1.5em" }}
                      icon={item.icon}
                    />
                    {item.title}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}
      <Link href="/store/cart">
        <Button variant="link" className="position-relative ps-0">
          <FontAwesomeIcon
            style={{ width: "1.5em" }}
            icon={faShoppingCart}
            className="text-light"
            size="lg"
          />
          {count != 0 && (
            <Badge
              bg="warning"
              text="dark"
              pill
              className="position-absolute"
              style={{ fontSize: "0.7em", right: "-0.7em" }}
            >
              {count}
            </Badge>
          )}
        </Button>
      </Link>
      {session ? (
        <>
          <Dropdown>
            <Dropdown.Toggle variant="link" bsPrefix="p-0">
              <img
                style={{
                  width: "30px",
                  height: "30px",
                }}
                className="square-image rounded-circle"
                src={session.user.image}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              {[
                {
                  title: "Mój profil",
                  icon: faUserCircle,
                  link: "/user/profile",
                },
                {
                  title: "Moje zamówienia",
                  icon: faUserCircle,
                  link: "/user/orders",
                },
                { divider: true },
                {
                  title: "Wyloguj się ",
                  icon: faSignOutAlt,
                  cb: () => {
                    signOut(
                      signOut({
                        callbackUrl: `/`,
                      })
                    );
                  },
                },
              ].map((item, key) => {
                if (item.divider) {
                  return <Dropdown.Divider key={key} />;
                }
                return (
                  <Dropdown.Item
                    key={key}
                    href={item.link}
                    className="d-flex flex-row gap-2 align-items-center"
                    onClick={
                      item.cb
                        ? item.cb
                        : () => {
                            redirect.bind(this);
                          }
                    }
                  >
                    <FontAwesomeIcon
                      style={{ width: "1.5em" }}
                      icon={item.icon}
                    />
                    {item.title}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <>
          <Link href="/auth/login">
            <Nav.Link href="/auth/login">Login</Nav.Link>
          </Link>
        </>
      )}
    </>
  );
}
