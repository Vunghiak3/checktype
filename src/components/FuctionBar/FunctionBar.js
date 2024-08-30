import classNames from "classnames/bind";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./FunctionBar.module.scss";
import { dataFuction } from "~/pages/Home/dataFuction";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function FunctionBar({
  data,
  time,
  lengthWord,
  onModeChange,
  onTypeChange,
  onLevelChange,
}) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("item", "level")}>
        {data.level.map((item, index) => (
          <Button
            key={index}
            typeText
            leftIcon={<FontAwesomeIcon icon={item.icon} />}
            onClick={() => onLevelChange(item)}
          >
            {item.text}
          </Button>
        ))}
      </div>
      <div className={cx("item", "mode")}>
        {dataFuction.map((item, index) => (
          <Button
            key={index}
            typeText
            leftIcon={<FontAwesomeIcon icon={item.icon} />}
            className={cx({ selected: data.mode === item.mode })}
            onClick={() => {
              onModeChange(item);
            }}
          >
            {item.mode}
          </Button>
        ))}
      </div>
      <div className={cx("item", "type")}>
        {(data.time &&
          data.time.map((item, index) => (
            <Button
              key={index}
              typeText
              className={cx({ selected: time === item })}
              onClick={() => {
                onTypeChange(item);
              }}
            >
              {item}
            </Button>
          ))) ||
          (data.lengthWord &&
            data.lengthWord.map((item, index) => (
              <Button
                key={index}
                typeText
                className={cx({ selected: lengthWord === item })}
                onClick={() => {
                  onTypeChange(item);
                }}
              >
                {item}
              </Button>
            )))}
      </div>
    </div>
  );
}

export default memo(FunctionBar);
