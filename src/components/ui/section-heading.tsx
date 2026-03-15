import styles from './section-heading.module.scss';

interface SectionHeadingProps {
  children: React.ReactNode;
  color?: string;
}

export function SectionHeading({ children, color }: SectionHeadingProps) {
  return (
    <h2
      className={styles.heading}
      style={color ? { '--accent-color': color } as React.CSSProperties : undefined}
    >
      {children}
    </h2>
  );
}
