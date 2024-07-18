import styles from "./Highlight.module.scss";

type HighlightTextProps = {
  text: string;
  highlight: string;
  color: "black" | "blue";
};

const Highlight = ({
  text,
  highlight,
  color
}: HighlightTextProps): React.ReactNode => {
  if (!highlight) {
    return text;
  }
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={index} className={[styles.highlight, styles[color]].join(" ")}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

export default Highlight;
