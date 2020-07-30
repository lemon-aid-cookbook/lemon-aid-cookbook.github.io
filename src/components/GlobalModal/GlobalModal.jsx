import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { COLOR, MODAL_TYPE } from "ultis/functions";

class ModalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      title: "",
      content: "",
      type: MODAL_TYPE.NORMAL,
      onPress: () => {},
    };
  }

  alertMessage = (iTitle, iContent, iType, onPress) => {
    this.setState({
      isShow: true,
      title: iTitle,
      content: iContent || "Đã có lỗi xảy ra",
      type: iType ? iType : MODAL_TYPE.NORMAL,
      onPress: onPress ? onPress : () => {},
    });
  };

  closeModal = () => {
    this.setState({ isShow: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.isShow}
          onClose={() => this.closeModal()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {this.state.type === MODAL_TYPE.CHOICE && (
              <Button onClick={() => this.closeModal()} color={COLOR.primary}>
                Hủy
              </Button>
            )}
            <Button
              onClick={() => {
                this.state.onPress();
                this.closeModal();
              }}
              color={COLOR.primary}
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ModalScreen;
