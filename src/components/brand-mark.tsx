import Link from "next/link";

import styles from "./brand-mark.module.css";

type BrandMarkProps = {
  context: string;
};

export function BrandMark({ context }: BrandMarkProps) {
  return (
    <Link className={styles.brand} href="/" aria-label="ArcadiA, accueil">
      <span className={styles.symbol} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span>
        <strong>ArcadiA</strong>
        <small>{context}</small>
      </span>
    </Link>
  );
}
