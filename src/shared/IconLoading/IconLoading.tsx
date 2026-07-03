import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import type { FC } from "react";

export interface IconLoadingProps {
  size?: number;
}

/** A small inline spinner, reused anywhere a component needs a loading indicator. */
const IconLoading: FC<IconLoadingProps> = ({ size = 16 }) => (
  <Box display="flex" px={1} aria-hidden="true">
    <CircularProgress size={size} />
  </Box>
);

export default IconLoading;
