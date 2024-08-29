// import libary
import classNames from "classnames/bind";
import PropTypes from 'prop-types'

// import components
import Header from "../components/Header";

// import styles
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default DefaultLayout;
