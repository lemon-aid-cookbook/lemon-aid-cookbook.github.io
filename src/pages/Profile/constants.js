import { makeStyles } from '@material-ui/core/styles'
import { COLOR } from 'ultis/functions'

export const TAB_TYPES = ['user', 'favorite', 'following']

export const profileStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'row'
  },
  left: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 180
  },
  column: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  right: {
    display: 'flex',
    flex: 4,
    flexDirection: 'column'
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9)
  },
  btnStyle: {
    borderRadius: 25,
    marginTop: theme.spacing(3)
  },
  grayText: {
    color: COLOR.deactiveGray
  },
  boldText: {
    marginTop: theme.spacing(2)
  },
  emptyText: {
    marginTop: theme.spacing(3)
  },
  flw: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 25,
    paddingLeft: 16,
    paddingRight: 16
  },
  loading: {
    alignSelf: 'center',
    marginTop: theme.spacing(4)
  }
}))
