import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faGear,
  faInfoCircle,
  faKeyboard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// import components
import config from "~/config";
import images from "~/assets/images";
import Button from "~/components/Button";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {

  return (
    <header className={cx("wrapper")}>
      <div className={cx("logo")}>
        <Button to={config.routes.home} typeLogo>
          <img src={images.logo} alt="logo" />
          <span>checktype</span>
        </Button>
      </div>
      <div className={cx("menu")}>
        <div className={cx("menu-item")}>
          <Button
            to={config.routes.home}
            typeIcon
            leftIcon={<FontAwesomeIcon icon={faKeyboard} />}
          ></Button>
        </div>
        <div className={cx("menu-item")}>
          <Button
            to={config.routes.about}
            typeIcon
            leftIcon={<FontAwesomeIcon icon={faInfoCircle} />}
          ></Button>
        </div>
        <div className={cx("menu-item")}>
          <Button
            to={config.routes.setting}
            typeIcon
            leftIcon={<FontAwesomeIcon icon={faGear} />}
          ></Button>
        </div>
      </div>
      <div className={cx("actions")}>
        <FontAwesomeIcon icon={faBell} />
        <FontAwesomeIcon icon={faUser} />
      </div>
    </header>
  );
}

export default Header;
