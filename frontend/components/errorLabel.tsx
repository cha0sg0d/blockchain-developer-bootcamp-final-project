import { colors } from "../helpers/theme";

const styles = {
  marginBottom: 16,
  padding: 8,
  color: colors.dfred,
};

export function ErrorLabel({ error }) {
  console.log("error in ErrorLabel", error);
  return error ? <p style={styles}>Error: {error.message}</p> : null;
}