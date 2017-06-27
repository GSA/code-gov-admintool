import React, { Component, ReactDOM } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { WithContext as ReactTags } from 'react-tag-input';

class EditRepo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [{ id: 1, text: "platform" }, { id: 2, text: "government" }, { id: 3, text: "connecting" }, { id: 4, text: "people" }],
      languages: [{ id: 1, text: "java" }, { id: 2, text: "mysql" }]
    };
  }

  componentDidLoad() { 
    ReactDOM.findDOMNode(this).scrollTop = 0
  }

  handleDelete(tagType, i) {
    let tags = this.state[tagType];
    tags.splice(i, 1);
    let obj = {};
    obj[tagType] = tags;
    this.setState(obj);
  }

  handleAddition(tagType, tag) {
    let tags = this.state[tagType];
    tags.push({
        id: tags.length + 1,
        text: tag
    });
    let obj = {};
    obj[tagType] = tags;
    this.setState(obj);
  }

  handleDrag(tagType, tag, currPos, newPos) {
    let tags = this.state[tagType];

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    let obj = {};
    obj[tagType] = tags;

    // re-render
    this.setState(obj);
  }

  render() {
    const { tags, languages } = this.state;

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <button type="submit" className="btn btn-sm btn-success" style={{float: 'right'}}><i className="fa fa-dot-circle-o"></i> Save</button>
                <strong>Repo Name</strong> <small>ID #{ this.props.match.params.repoId }</small>
              </div>
              <div className="card-block">
                <div className="row">
                  <div className="form-group col-sm-4">
                    <label>Repository Name</label>
                    <input type="text" className="form-control" placeholder="ex. HR Recruiting Management"/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Organization</label>
                    <input type="text" className="form-control" placeholder="ex. OFCIO"/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Version (deprecate?)</label>
                    <input type="text" className="form-control" placeholder="ex. 1.0.1"/>
                  </div>
                </div>


                <div className="form-group">
                  <label>Description</label>
                  <textarea rows='3' type="text" className="form-control" placeholder="ex. Helps HR recruit the best candidates!"/>
                </div>

                <div className="row">
                  <div className="form-group col-sm-3">
                    <label>Status</label>
                    <input type="text" className="form-control" placeholder="ex. Alpha"/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>License</label>
                    <input type="text" className="form-control" placeholder="ex. MIT"/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Version Control System</label>
                    <input type="text" className="form-control" placeholder="ex. Git"/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Availability</label><br />
                    <input type="checkbox" name="inline-checkbox1" value="option1"/> Reusable
                    &nbsp; &nbsp;
                    <input type="checkbox" name="inline-checkbox1" value="option1"/> Open Source
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-3">
                    <label>Contact Name</label>
                    <input type="text" className="form-control" placeholder="ex. Philip Bale"/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Contact Email</label>
                    <input type="text" className="form-control" placeholder="ex. team@code.gov"/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Contact Phone</label>
                    <input type="text" className="form-control" placeholder="ex. (123) 456-7890"/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Contact URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://twitter.com/@codedotgov"/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-4">
                    <label>Source Code URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://github.com/presidential-innovation-fellows/code-gov-web"/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Homepage URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://code.gov"/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Download URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://github.com/presidential-innovation-fellows/code-gov-web/dist.tar.gz"/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-3">
                    <label>Exemption</label>
                    <input type="text" className="form-control" placeholder="ex. 0"/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Exemption Text</label>
                    <input type="text" className="form-control" placeholder="ex. National Security"/>
                  </div>
                </div>

                <hr />
                <h6>Partners</h6>
                <div className="row">
                  <div className="form-group col-sm-3">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="ex. Philip Bale"/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="ex. team@omb.eop.gov"/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>&nbsp;</label><br />
                    <button className='btn btn-danger btn-sm'><i className='fa fa-trash'></i> Remove</button>
                  </div>
                </div>
                <button className='btn btn-primary btn-sm'><i className='fa fa-plus'></i> Add New Partner</button>

                <br />
                <hr />
                <h6>Tags</h6>
                <div>
                  <ReactTags tags={tags}
                    autofocus={false}
                    handleDelete={this.handleDelete.bind(this, 'tags') }
                    handleAddition={this.handleAddition.bind(this, 'tags') }
                    handleDrag={this.handleDrag.bind(this, 'tags') } />
                </div>

                <hr />
                <h6>Languages</h6>
                <div>
                  <ReactTags tags={languages}
                    autofocus={false}
                    handleDelete={this.handleDelete.bind(this, 'languages') }
                    handleAddition={this.handleAddition.bind(this, 'languages') }
                    handleDrag={this.handleDrag.bind(this, 'languages') } />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditRepo;
