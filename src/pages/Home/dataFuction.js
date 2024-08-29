import {
  faA,
  faAt,
  faClock,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";

export const dataFuction = [
  {
    mode: "time",
    icon: faClock,
    type: [
      {
        icon: faAt,
        data: "punctuation",
      },
      {
        icon: faHashtag,
        data: "number",
      },
    ],
    time: [15, 30, 60, 120],
  },
  {
    mode: "words",
    icon: faA,
    type: [
      {
        icon: faAt,
        data: "punctuation",
      },
      {
        icon: faHashtag,
        data: "word",
      },
    ],
    countWord: [10, 25, 50, 70],
  },
];
