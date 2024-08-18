import styles from "./Button.module.css";

type ButtonProps = React.PropsWithChildren<{
  onClick?: () => void;
}>;

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
