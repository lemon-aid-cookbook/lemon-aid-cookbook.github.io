import { makeStyles } from '@material-ui/core/styles'
import { MAX_COOKING_TIME } from 'pages/RecipeCreate/constant'

export const MARK_RANGE = [
  {
    value: 0,
    label: '0 phút'
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
    image:
      'https://www.qantas.com/content/travelinsider/en/explore/australia/new-south-wales/sydney/vietnamese-restaurants-food-in-cabramatta/_jcr_content/parsysTop/hero.img.full.medium.jpg/1561101957431.jpg',
    status: false
  },
  {
    title: 'Món Trung',
    code: 'chinafood',
    image:
      'https://images.chinahighlights.com/allpicture/2019/01/482fb1f829ce4e6496b94fea_894x596.jpg',
    status: false
  },
  {
    title: 'Món Hàn',
    code: 'koreafood',
    image:
      'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_1100,c_fill,g_auto,h_619,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F181114130138-korean-food-2620014201204004k-jeonju-bibimbap.jpg',
    status: false
  },
  {
    title: 'Món Nhật',
    code: 'japanfood',
    image:
      'https://c4.wallpaperflare.com/wallpaper/762/417/270/sushi-plate-dish-wallpaper-preview.jpg',
    status: false
  },
  {
    title: 'Món Thái',
    code: 'thaifood',
    image:
      'https://www.bangkokairblog.com/wp-content/uploads/2017/10/OG-imagetom-yum-goong.jpg',
    status: false
  },
  {
    title: 'Món Âu',
    code: 'eurofood',
    image:
      'https://www.skinnytaste.com/wp-content/uploads/2020/03/Whole-Wheat-Spaghetti-9-500x500.jpg',
    status: false
  },
  {
    title: 'Đồ uống',
    code: 'drink',
    image:
      'https://media.npr.org/assets/img/2014/01/08/istock_000021309811small_wide-578d260088ae91587b73570982a13d8f711c78da-s800-c85.jpg',
    status: false
  },
  {
    title: 'Tráng miệng',
    code: 'dessert',
    image:
      'https://firstclasse.com.my/wp-content/uploads/2020/02/Classic-Afternoon-Tea-1-scaled-1920x2400.jpg',
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
  },
  rightMenu: {
    textAlign: 'right'
  },
  recipesNum: {
    marginRight: theme.spacing(2)
  },
  sortMenu: {
    height: '2rem',
    marginLeft: theme.spacing(2)
  },
  namebar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  itemName: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  itemNameCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1
  }
}))
