import { Typography, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  listUnstyled: {
    listStyleType: 'none',
    marginTop: 0,
    lineHeight: '1.75rem'
  },
  listStyled: {
    listStyleType: 'circle',
    marginTop: 0,
    lineHeight: '1.75rem'
  },
  stepStyle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'justify'
  },
  image: {
    width: '100%',
    paddingTop: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    borderRadius: '1.5rem',
    marginBottom: theme.spacing(1)
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}))

export default props => {
  const { cookTime, ration, materials, steps, level, categories } = props

  const classes = useStyles()

  return (
    <>
      <Typography variant="body1">
        <strong>Thời gian thực hiện:</strong> {cookTime} phút
      </Typography>
      {ration && (
        <Typography variant="body1">
          <strong>Khẩu phần:</strong> {ration} người
        </Typography>
      )}
      <Typography variant="body1">
        <strong>Độ khó:</strong>{' '}
        {level === 1 ? 'Dễ' : level === 2 ? 'Trung bình' : 'Khó'}
      </Typography>
      {categories && categories.length > 0 && categories[0] !== '' && (
        <div className="materials" style={{ marginTop: 16 }}>
          <Typography variant="h6" color="primary">
            Nhóm thức ăn
          </Typography>
          {categories.map((item, index) => (
            <Chip
              key={`chip${index}`}
              label={item}
              color={'primary'}
              className={classes.chip}
              onClick={() => {}}
            />
          ))}
        </div>
      )}
      {materials && materials.length > 0 && (
        <div className="materials">
          <Typography variant="h6" color="primary">
            Nguyên liệu
          </Typography>
          <ul className={classes.listUnstyled}>
            {materials.map(material => (
              <li key={material}>{material}</li>
            ))}
          </ul>
        </div>
      )}
      {steps && steps.length > 0 && (
        <div className="steps">
          <Typography variant="h6" color="primary">
            Các bước thực hiện
          </Typography>
          {steps.map((step, index) => (
            <div className="step" key={`step${index}`}>
              <Typography variant="body1" className={classes.stepStyle}>
                <strong>Bước {step.stt}:</strong> {step.making}
              </Typography>
              {step.image && (
                <div
                  style={{ backgroundImage: `url('${step.image}')` }}
                  className={classes.image}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
