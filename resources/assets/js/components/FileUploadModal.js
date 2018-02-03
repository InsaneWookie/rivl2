import React, { Component } from 'react';

export default class FileUploadModal extends Component {
  constructor(props) {
    super(props);

    this.uploadFile = this.uploadFile.bind(this);
  }

  uploadFile(e){

    e.preventDefault();
    this.props.uploadFile(this.form).then((res) => {
      $('#fileUploadModal').modal('hide');
    });
  }

  render() {
    return (
      <div className="modal fade" id="fileUploadModal">
        {/*TODO: don't want to reference the modal by id*/}
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form method="post" action="#"  ref={el => (this.form = el)}>
                <input type="file" name='avatar' ref={input => { this.fileInput = input; }}/>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.uploadFile}>Upload</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
