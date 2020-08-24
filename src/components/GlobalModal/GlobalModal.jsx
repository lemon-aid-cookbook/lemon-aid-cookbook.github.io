import { Modal, Paper } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'
import { MODAL_TYPE } from 'ultis/functions'

const paper = {
  position: 'absolute',
  width: '40vw',
  backgroundColor: 'white',
  padding: 24,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

class GlobalModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      title: '',
      content: '',
      type: MODAL_TYPE.NORMAL,
      onPress: () => {}
    }
  }

  alertMessage = (iTitle, iContent, iType, onPress) => {
    this.setState({
      isShow: true,
      title: iTitle,
      content: iContent ? iContent : 'Đã có lỗi xảy ra',
      type: iType ? iType : MODAL_TYPE.NORMAL,
      onPress: onPress ? onPress : () => {}
    })
  }

  closeModal = () => {
    this.setState({ isShow: false })
  }

  render() {
    return (
      <Modal
        open={this.state.isShow}
        onClose={() => this.closeModal()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Paper elevation={0} style={paper}>
          <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {this.state.type === MODAL_TYPE.CHOICE && (
              <Button
                onClick={() => this.closeModal()}
                color="primary"
                variant="contained"
              >
                Hủy
              </Button>
            )}
            <Button
              onClick={() => {
                this.state.onPress()
                this.closeModal()
              }}
              color="primary"
              variant="contained"
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Paper>
      </Modal>
    )
  }
}

export default GlobalModal
