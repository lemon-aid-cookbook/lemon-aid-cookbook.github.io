import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Typography,
  TextField,
  Paper,
  IconButton,
  Divider,
  Button,
  Avatar
} from '@material-ui/core'
import ImageUploader from 'react-images-upload'
import AppHeader from '../../components/Header/AppHeader'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  thumbnail: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    width: '100%',
    borderRadius: '1rem'
  },
  group: {
    marginBottom: theme.spacing(2)
  },
  field: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  add: {
    marginRight: theme.spacing(2)
  },
  stepNum: {
    width: '30px',
    height: '30px',
    marginRight: theme.spacing(1)
  },
  button: {
    paddingLeft: '4rem',
    paddingRight: '4rem',
    borderRadius: '1rem'
  }
}))

let nextId = 1

export default props => {
  const classes = useStyles()

  const [post, setPost] = useState({
    title: '',
    thumbnail:
      'https://thumbs.dreamstime.com/b/lay-flat-herb-spices-table-top-image-ration-shot-dark-moody-cooking-111890196.jpg',
    description: '',
    materials: [
      {
        id: nextId++,
        name: ''
      }
    ],
    steps: [
      {
        id: nextId++,
        text: '',
        picture: ''
      }
    ]
  })

  const handleChange = prop => event =>
    setPost({ ...post, [prop]: event.target.value })

  const addMaterial = () => {
    const material = { id: nextId++, name: '' }
    setPost({ ...post, materials: [...post.materials, material] })
  }

  const handleMaterial = id => event => {
    const index = post.materials.findIndex(m => m.id === id)
    const materials = [...post.materials]
    materials[index].name = event.target.value

    setPost({ ...post, materials })
  }

  const removeMaterial = id => {
    const materials = post.materials.filter(m => m.id !== id)
    setPost({ ...post, materials })
  }

  const addStep = () => {
    const step = { id: nextId++, text: '', picture: '' }
    setPost({ ...post, steps: [...post.steps, step] })
  }

  const handleStep = id => event => {
    const index = post.steps.findIndex(m => m.id === id)
    const steps = [...post.steps]
    steps[index].text = event.target.value

    setPost({ ...post, steps })
  }

  const removeStep = id => {
    const steps = post.steps.filter(m => m.id !== id)
    setPost({ ...post, steps })
  }

  const onDrop = id => picture => {
    const index = post.steps.findIndex(m => m.id === id)
    const steps = [...post.steps]
    steps[index].picture = picture

    setPost({ ...post, steps })
  }

  return (
    <>
      <AppHeader />
      <Container maxWidth="md" className={classes.root}>
        <Typography variant="h5">Tạo bài đăng</Typography>
        <img
          src={post.thumbnail}
          alt={post.title}
          className={classes.thumbnail}
        />

        <div className={classes.group}>
          <Typography variant="body1">
            <strong>Tiêu đề</strong>
          </Typography>
          <TextField
            placeholder="Gỏi..."
            variant="outlined"
            fullWidth
            className={classes.field}
            value={post.title}
            onChange={handleChange('title')}
          />
        </div>

        <div className={classes.group}>
          <Typography variant="body1">
            <strong>Mô tả</strong>
          </Typography>
          <TextField
            placeholder="Món ăn dành cho mùa hè..."
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            className={classes.field}
            value={post.description}
            onChange={handleChange('description')}
          />
        </div>

        <div className={classes.group}>
          <Typography variant="body1" style={{ marginBottom: '0.75rem' }}>
            <strong>Nguyên liệu</strong>
          </Typography>
          {post.materials.map(material => (
            <Paper
              component="div"
              elevation={0}
              key={material.id}
              className={classes.paper}
            >
              <TextField
                placeholder="100g thịt ba chỉ..."
                variant="outlined"
                fullWidth
                className={classes.field}
                onChange={handleMaterial(material.id)}
              />
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton
                color="primary"
                className={classes.iconButton}
                onClick={() => removeMaterial(material.id)}
              >
                <CloseIcon />
              </IconButton>
            </Paper>
          ))}
          <Button
            size="small"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.add}
            onClick={addMaterial}
          >
            Thêm nguyên liệu
          </Button>
          <Button size="small" color="primary" startIcon={<AddIcon />}>
            Thêm phần
          </Button>
        </div>

        <div className={classes.group}>
          <Typography variant="body1" style={{ marginBottom: '0.75rem' }}>
            <strong>Các bước thực hiện</strong>
          </Typography>
          {post.steps.map((step, i) => (
            <div key={step.id}>
              <Paper component="div" elevation={0} className={classes.paper}>
                <Avatar className={classes.stepNum}>{i + 1}</Avatar>
                <TextField
                  placeholder="Sơ chế thịt..."
                  variant="outlined"
                  fullWidth
                  className={classes.field}
                  onChange={handleStep(step.id)}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton
                  color="primary"
                  className={classes.iconButton}
                  onClick={() => removeStep(step.id)}
                >
                  <CloseIcon />
                </IconButton>
              </Paper>
              <ImageUploader
                withIcon={true}
                buttonText="Thêm ảnh minh hoạ"
                onChange={onDrop(step.id)}
                imgExtension={['.jpg', '.png']}
                maxFileSize={5242880}
                singleImage
                withPreview
              />
            </div>
          ))}
          <Button
            size="small"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.add}
            onClick={addStep}
          >
            Thêm bước
          </Button>
        </div>

        <div className={classes.group} style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            style={{ marginRight: '5rem' }}
          >
            Huỷ
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Đăng
          </Button>
        </div>
      </Container>
    </>
  )
}
