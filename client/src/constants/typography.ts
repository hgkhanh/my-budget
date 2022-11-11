import {
  green,
  red,
  grey,
} from '@mui/material/colors';

interface TextColor {
  [key: string]: string;
}

export const TEXT_COLOR = {
  green: green['500'],
  red: red['500'],
  dark: grey['900']
};
