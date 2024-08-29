import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  typeIcon = false,
  typeLogo = false,
  typeText = false,
  leftIcon,
  rightIcon,
  className,
  children,
  onClick,
  disabled = false,
  ...passProps
}) {
  let Comp = "button";
  const props = { onClick, ...passProps };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  const classes = cx("btn-menu", {
    [className]: className,
    typeIcon,
    typeLogo,
    typeText,
  });

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
