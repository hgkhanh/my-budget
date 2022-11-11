import {
  brown,
  lime,
  deepPurple,
  deepOrange,
  amber,
  green,
  lightGreen,
  lightBlue,
  purple,
  red,
  grey
} from '@mui/material/colors';
interface CategoryConfig {
  [key: string]: {
    color: string;
  }
}
export const CATEGORY_CONFIG: CategoryConfig = {
  "Rents & Utilities": {
    color: brown['A400']
  },
  "Furniture & Appliances": {
    color: lime['500']
  },
  "Service Bill & Insurance": {
    color: deepPurple['600']
  },
  "Groceries": {
    color: deepOrange['A200']
  },
  "Work & Equipment": {
    color: green['A400']
  },
  "Food & Drink": {
    color: amber['A700']
  },
  "Entertainment": {
    color: lightBlue['A400']
  },
  "Transportation": {
    color: lightGreen['A400']
  }, "Shopping": {
    color: purple['A100']
  }, "Travel": {
    color: red['A100']
  }, "Others": {
    color: grey['A400']
  }
};

