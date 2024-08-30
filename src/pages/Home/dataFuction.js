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
    level: [
      {
        icon: faAt,
        text: "punctuation",
      },
      {
        icon: faHashtag,
        text: "number",
      },
    ],
    time: [15, 30, 60, 120],
  },
  {
    mode: "words",
    icon: faA,
    level: [
      {
        icon: faAt,
        text: "punctuation",
      },
      {
        icon: faHashtag,
        text: "word",
      },
    ],
    lengthWord: [10, 25, 50, 70],
  },
];
