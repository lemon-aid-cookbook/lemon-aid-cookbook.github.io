import { makeStyles } from '@material-ui/core/styles'
import { MAX_COOKING_TIME } from 'pages/RecipeCreate/constant'

export const MARK_RANGE = [
  {
    value: 1,
    label: '1 phút'
  },
  {
    value: MAX_COOKING_TIME,
    label: `${MAX_COOKING_TIME} phút`
  }
]

export const LEVEL_ITEMS = [
  {
    title: 'Dễ',
    code: 'easy',
    status: false
  },
  {
    title: 'Trung bình',
    code: 'normal',
    status: false
  },
  {
    title: 'Khó',
    code: 'hard',
    status: false
  }
]

export const CATEGORIES = [
  {
    title: 'Món Việt',
    code: 'vietfood',
    status: false
  },
  {
    title: 'Món Trung',
    code: 'chinafood',
    status: false
  },
  {
    title: 'Món Hàn',
    code: 'koreafood',
    status: false
  },
  {
    title: 'Món Thái',
    code: 'thaifood',
    status: false
  },
  {
    title: 'Món Âu',
    code: 'eurofood',
    status: false
  },
  {
    title: 'Đồ uống',
    code: 'drink',
    status: false
  },
  {
    title: 'Tráng miệng',
    code: 'dessert',
    status: false
  }
]

export const filterStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(0deg)'
  },
  filterMenu: {
    marginRight: theme.spacing(2)
  },
  range: {
    width: '60%',
    minWidth: 270,
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(3)
  }
}))
