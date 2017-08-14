import React, { Component, ReactDOM } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { WithContext as ReactTags } from 'react-tag-input';

import Session from '../../../middleware/Session';
import { post, get, resolveBackendUrl} from '../../../middleware/Networking';

class EditRepo extends Component {
  constructor(props) {
    super(props);

    let agency = Session.getSession();
    if (agency == null) { window.location.href = "/"; }

    this.state = {
      repoId: this.props.match.params.repoId,
      updateVars: {},
      tags: [],
      languages: [],
      partners: [],
      curRepo: null
    };

    this.loadRepo();
  }

  componentDidUpdate() {
    let curRepoId = this.props.match.params.repoId;
    if (this.state.repoId !== curRepoId) {
      window.location.reload();
      // this.setState({repoId: curRepoId});
      // this.loadRepo();
    }
  }

  handleChange(e) {
    let updateVars = this.state.updateVars;
    updateVars[e.target.name] = e.target.value;

    if (e.target.name === 'open_source' || e.target.name === 'reusable') {
      updateVars[e.target.name] = e.target.checked;
    }

    this.setState(updateVars: updateVars);
  }

  save() {
    let that = this;
    let updateVars = this.state.updateVars;
    updateVars['id'] = this.state.repoId;

    let langs = this.state.languages;
    let tags = this.state.tags;
    let partners = this.state.partners;

    for (var i = 0; i < partners.length; i++) {
      partners[i].name = this.refs['partnerName' + i].value;
      partners[i].email = this.refs['partnerEmail' + i].value;
    }

    updateVars['languages'] = JSON.stringify(langs);
    updateVars['tags'] = JSON.stringify(tags);
    updateVars['partners'] = JSON.stringify(partners);

    post(resolveBackendUrl('/repos/update'), Session.getToken(), updateVars, function(err, data) {
      window.location.reload();
    });
  }

  loadRepo() {
    let that = this;
    get(resolveBackendUrl('/repos/raw/') + this.state.repoId, Session.getToken(), function(err, data) {
      if (data) {
        console.log(data);
        that.setState({curRepo: data, languages: JSON.parse(data.languages) || [], tags: JSON.parse(data.tags) || [], partners: JSON.parse(data.partners) || []});
      }
    });
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

  addPartner() {
    let partners = this.state.partners || [];
    partners.push({name: '', email: ''});
    this.setState({partners: partners});
  }

  removePartner(index) {
    let partners = this.state.partners || [];
    delete partners[index]
    this.setState({partners: partners});
  }

  render() {
    const { tags, languages, curRepo} = this.state;

    if (!curRepo) {
      return (<h1></h1>);
    }

    let partners = this.state.partners;
    if (partners.length == 0) partners.push({name: '', email: ''});

    let _partnerInputs = partners.map((partner, key) => {
      return (
        <div className="row" key={key}>
          <div className="form-group col-sm-3">
            <input type="text" className="form-control" placeholder="ex. Philip Bale" ref={'partnerName'+key} defaultValue={partner.name} />
          </div>
          <div className="form-group col-sm-3">
            <input type="text" className="form-control" placeholder="ex. team@omb.eop.gov" ref={'partnerEmail'+key} defaultValue={partner.email}/>
          </div>
          <div className="form-group col-sm-3">
            <button className='btn btn-danger btn-sm' onClick={this.removePartner.bind(this, key)}><i className='fa fa-trash'></i> Remove</button>
          </div>
        </div>
      )
    });

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <button type="submit" onClick={this.save.bind(this)} className="btn btn-sm btn-success" style={{float: 'right'}}><i className="fa fa-dot-circle-o"></i> Save</button>
                <strong>Repo Name</strong> <small>ID #{ curRepo.id }</small>
              </div>
              <div className="card-block">
                <div className="row">
                  <div className="form-group col-sm-4">
                    <label>Repository Name</label>
                    <input type="text" className="form-control" placeholder="ex. HR Recruiting Management" defaultValue={curRepo.name} name='name' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Organization</label>
                    <input type="text" className="form-control" placeholder="ex. OFCIO" defaultValue={curRepo.organization} name='organization' onChange={this.handleChange.bind(this)}/>
                  </div>
                </div>


                <div className="form-group">
                  <label>Description</label>
                  <textarea rows='3' type="text" className="form-control" placeholder="ex. Helps HR recruit the best candidates!"  defaultValue={curRepo.description} name='description' onChange={this.handleChange.bind(this)}/>
                </div>

                <div className="row">
                  <div className="form-group col-sm-3">
                    <label>Status</label>
                    <input type="text" className="form-control" placeholder="ex. Alpha"  defaultValue={curRepo.status} name='status' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>License</label>
                    <input type="text" className="form-control" placeholder="ex. MIT" defaultValue={curRepo.license} name='license' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Version Control System</label>
                    <input type="text" className="form-control" placeholder="ex. Git" defaultValue={curRepo.vcs} name='vcs' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Availability</label><br />
                    <input type="checkbox" name="inline-checkbox1" defaultChecked={curRepo.reusable} name='reusable' onChange={this.handleChange.bind(this)}/> Reusable
                    &nbsp; &nbsp;
                    <input type="checkbox" name="inline-checkbox1" defaultChecked={curRepo.open_source} name='open_source' onChange={this.handleChange.bind(this)}/> Open Source
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-3">
                    <label>Contact Name</label>
                    <input type="text" className="form-control" placeholder="ex. Philip Bale"  defaultValue={curRepo.contact_name} name='contact_name' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Contact Email</label>
                    <input type="text" className="form-control" placeholder="ex. team@code.gov"  defaultValue={curRepo.contact_email} name='contact_email' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Contact Phone</label>
                    <input type="text" className="form-control" placeholder="ex. (123) 456-7890"  defaultValue={curRepo.contact_phone} name='contact_phone' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Contact URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://twitter.com/@codedotgov"  defaultValue={curRepo.contact_url} name='contact_url' onChange={this.handleChange.bind(this)}/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-4">
                    <label>Source Code URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://github.com/presidential-innovation-fellows/code-gov-web" defaultValue={curRepo.source_code_url} name='source_code_url' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Homepage URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://code.gov" defaultValue={curRepo.homepage_url} name='homepage_url' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Download URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://github.com/presidential-innovation-fellows/code-gov-web/dist.tar.gz"  defaultValue={curRepo.download_url} name='download_url' onChange={this.handleChange.bind(this)}/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-3">
                    <label>Exemption</label>
                    <input type="text" className="form-control" placeholder="ex. 0" defaultValue={curRepo.exemption} name='exemption' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Exemption Text</label>
                    <input type="text" className="form-control" placeholder="ex. National Security" defaultValue={curRepo.exemption_text} name='exemption_text' onChange={this.handleChange.bind(this)}/>
                  </div>
                </div>

                <hr />
                <h6>Partners</h6>
                <div className="row">
                  <div className="col-sm-3">
                    <label>Name</label>
                  </div>
                  <div className="col-sm-3">
                    <label>Email</label>
                  </div>
                </div>
                { _partnerInputs }

                <button className='btn btn-primary btn-sm' onClick={this.addPartner.bind(this)}><i className='fa fa-plus'></i> Add New Partner</button>

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
