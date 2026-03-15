import styles from './section-heading.module.scss';

interface SectionHeadingProps {
  children: React.ReactNode;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return <h2 className={styles.heading}>{children}</h2>;
}
