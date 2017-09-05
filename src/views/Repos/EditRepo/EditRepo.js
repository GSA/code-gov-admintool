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
      licenses: [],
      partners: [],
      related_code: [],
      reused_code: [],
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
    const licenses = this.state.licenses;
    const related_code = this.state.related_code;
    const reused_code = this.state.reused_code;

    for (var i = 0; i < partners.length; i++) {
      partners[i].name = this.refs['partnerName' + i].value;
      partners[i].email = this.refs['partnerEmail' + i].value;
    }

    for (var i = 0; i < licenses.length; i++) {
      licenses[i].name = this.refs['licenseName' + i].value;
      licenses[i].URL = this.refs['licenseURL' + i].value;
    }

    for (var i = 0; i < related_code.length; i++) {
      related_code[i].codeName = this.refs['relatedCodeName' + i].value;
      related_code[i].codeURL = this.refs['relatedCodeURL' + i].value;
      related_code[i].isGovernmentRepo = this.refs['relatedCodeGovernment' + i].checked;
    }

    for (var i = 0; i < reused_code.length; i++) {
      reused_code[i].name = this.refs['reusedCodeName' + i].value;
      reused_code[i].URL = this.refs['reusedCodeURL' + i].value;
    }

    updateVars['languages'] = JSON.stringify(langs);
    updateVars['tags'] = JSON.stringify(tags);
    updateVars['partners'] = JSON.stringify(partners);
    updateVars['licenses'] = JSON.stringify(licenses);
    updateVars['related_code'] = JSON.stringify(related_code);
    updateVars['reused_code'] = JSON.stringify(reused_code);

    post(resolveBackendUrl('/repos/update'), Session.getToken(), updateVars, function(err, data) {
      window.location.reload();
    });
  }

  loadRepo() {
    let that = this;
    get(resolveBackendUrl('/repos/raw/') + this.state.repoId, Session.getToken(), function(err, data) {
      if (data) {
        that.setState({
          curRepo: data,
          languages: JSON.parse(data.languages) || [],
          tags: JSON.parse(data.tags) || [],
          partners: JSON.parse(data.partners) || [],
          licenses: JSON.parse(data.licenses) || [],
          related_code: JSON.parse(data.related_code) || [],
          reused_code: JSON.parse(data.reused_code) || [],
        });
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

  addLicense() {
    let licenses = this.state.licenses || [];
    licenses.push({name: '', URL: ''});
    this.setState({licenses});
  }

  removeLicense(index) {
    let licenses = this.state.licenses || [];
    delete licenses[index]
    this.setState({licenses});
  }

  addRelatedCode() {
    let related_code = this.state.related_code || [];
    related_code.push({codeName: '', codeURL: '', isGovernmentRepo: false});
    this.setState({related_code});
  }

  removeRelatedCode(index) {
    let related_code = this.state.related_code || [];
    delete related_code[index]
    this.setState({related_code});
  }

  addReusedCode() {
    let reused_code = this.state.reused_code || [];
    reused_code.push({name: '', URL: ''});
    this.setState({reused_code});
  }

  removeReusedCode(index) {
    let reused_code = this.state.reused_code || [];
    delete reused_code[index]
    this.setState({reused_code});
  }

  render() {
    const { tags, languages, curRepo, licenses, related_code, reused_code } = this.state;

    if (!curRepo) {
      return (<h1></h1>);
    }

    if (licenses.length == 0) licenses.push({name: '', URL: ''});

    const _licensesInputs = licenses.map((license, key) => {
      return (
        <div className="row" key={key}>
          <div className="form-group col-sm-3">
            <input type="text" className="form-control" placeholder="ex. CCO" ref={'licenseName'+key} defaultValue={license.name} />
          </div>
          <div className="form-group col-sm-3">
            <input type="text" className="form-control" placeholder="ex. https://path.to/license" ref={'licenseURL'+key} defaultValue={license.URL}/>
          </div>
          <div className="form-group col-sm-3">
            <button className='btn btn-danger btn-sm' onClick={this.removeLicense.bind(this, key)}><i className='fa fa-trash'></i> Remove</button>
          </div>
        </div>
      )
    });

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

    if (related_code.length == 0) related_code.push({codeName: '', codeURL: '', isGovernmentRepo: false});

    const _relatedCodeInputs = related_code.map((rc, key) => {
      return (
        <div className="row" key={key}>
          <div className="form-group col-sm-3">
            <input type="text" className="form-control" placeholder="ex. Related Code Library" ref={'relatedCodeName'+key} defaultValue={rc.codeName} />
          </div>
          <div className="form-group col-sm-3">
            <input type="text" className="form-control" placeholder="ex. https://path.to/relatedCode" ref={'relatedCodeURL'+key} defaultValue={rc.codeURL}/>
          </div>
          <div className="form-group col-sm-3">
            <input type="checkbox" ref={'relatedCodeGovernment'+key} defaultChecked={rc.isGovernmentRepo} />
          </div>
          <div className="form-group col-sm-3">
            <button className='btn btn-danger btn-sm' onClick={this.removeRelatedCode.bind(this, key)}><i className='fa fa-trash'></i> Remove</button>
          </div>
        </div>
      )
    });

    if (reused_code.length == 0) reused_code.push({name: '', URL: ''});

    const _reusedCodeInputs = reused_code.map((rc, key) => {
      return (
        <div className="row" key={key}>
          <div className="form-group col-sm-3">
            <input type="text" className="form-control" placeholder="ex. Reused Code Library" ref={'reusedCodeName'+key} defaultValue={rc.name} />
          </div>
          <div className="form-group col-sm-3">
            <input type="text" className="form-control" placeholder="ex. https://path.to/reusedCode" ref={'reusedCodeURL'+key} defaultValue={rc.URL}/>
          </div>
          <div className="form-group col-sm-3">
            <button className='btn btn-danger btn-sm' onClick={this.removeLicense.bind(this, key)}><i className='fa fa-trash'></i> Remove</button>
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
                  <div className="form-group col-sm-8">
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
                  <div className="form-group col-sm-4">
                    <label>Version</label>
                    <input type="text" className="form-control" placeholder="ex. 1.0.0"  defaultValue={curRepo.version} name='version' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Status</label>
                    <select className="form-control" defaultValue={curRepo.status} name='status' onChange={this.handleChange.bind(this)}>
                      <option value="Ideation">Ideation</option>
                      <option value="Development">Development</option>
                      <option value="Alpha">Alpha</option>
                      <option value="Beta">Beta</option>
                      <option value="Release Candidate">Release Candidate</option>
                      <option value="Production">Production</option>
                      <option value="Archival">Archival</option>
                    </select>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Labor Hours</label>
                    <input type="number" className="form-control" placeholder="ex. 1000"  defaultValue={curRepo.labor_hours} name='labor_hours' onChange={this.handleChange.bind(this)}/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-4">
                    <label>Usage</label>
                    <select className="form-control" defaultValue={curRepo.usage_type} name='usage_type' onChange={this.handleChange.bind(this)}>
                      <option value="openSource">Open Source</option>
                      <option value="governmentWideReuse">Government-wide Reuse</option>
                      <option value="exemptByLaw">Exempt by Law</option>
                      <option value="exemptByNationalSecurity">Exempt by National Security</option>
                      <option value="exemptByAgencySystem">Exempt by Agency System</option>
                      <option value="exemptByAgencyMission">Exempt by Agency Mission</option>
                      <option value="exemptByCIO">Exempt by CIO</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-4">
                    <label>Version Control System</label>
                    <input type="text" className="form-control" placeholder="ex. Git" defaultValue={curRepo.vcs} name='vcs' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Source Code URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://github.com/presidential-innovation-fellows/code-gov-web" defaultValue={curRepo.source_code_url} name='source_code_url' onChange={this.handleChange.bind(this)}/>
                  </div>
                </div>

                <div className="row">
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
                  <div className="form-group col-sm-4">
                    <label>Disclaimer Text</label>
                    <input type="text" className="form-control" placeholder="ex. This software is provided as-is with no warranty" defaultValue={curRepo.disclaimer_text} name='disclaimer_text' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Disclaimer URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://github.com/presidential-innovation-fellows/code-gov-web/disclaimer.md" defaultValue={curRepo.disclaimer_url} name='disclaimer_url' onChange={this.handleChange.bind(this)}/>
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
                    <label>Created</label>
                    <input type="text" className="form-control" placeholder="ex. 2016-04-12" defaultValue={curRepo.date_created} name='date_created' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Last Modified</label>
                    <input type="text" className="form-control" placeholder="ex. 2016-04-12" defaultValue={curRepo.date_last_modified} name='date_last_modified' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Metadata Last Updated</label>
                    <input type="text" className="form-control" placeholder="ex. 2016-04-13"  defaultValue={curRepo.date_metadata_last_updated} name='date_metadata_last_updated' onChange={this.handleChange.bind(this)}/>
                  </div>
                </div>

                <hr />
                <h6>Licenses</h6>
                <div className="row">
                  <div className="col-sm-3">
                    <label>Name</label>
                  </div>
                  <div className="col-sm-3">
                    <label>URL</label>
                  </div>
                </div>
                { _licensesInputs }

                <button className='btn btn-primary btn-sm' onClick={this.addLicense.bind(this)}><i className='fa fa-plus'></i> Add New License</button>

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

                <hr />
                <h6>Related Code</h6>
                <div className="row">
                  <div className="col-sm-3">
                    <label>Name</label>
                  </div>
                  <div className="col-sm-3">
                    <label>URL</label>
                  </div>
                  <div className="col-sm-3">
                    <label>Is Government?</label>
                  </div>
                </div>
                { _relatedCodeInputs }

                <button className='btn btn-primary btn-sm' onClick={this.addRelatedCode.bind(this)}><i className='fa fa-plus'></i> Add Related Code</button>

                <hr />
                <h6>Reused Code</h6>
                <div className="row">
                  <div className="col-sm-3">
                    <label>Name</label>
                  </div>
                  <div className="col-sm-3">
                    <label>URL</label>
                  </div>
                </div>
                { _reusedCodeInputs }

                <button className='btn btn-primary btn-sm' onClick={this.addReusedCode.bind(this)}><i className='fa fa-plus'></i> Add Reused Code</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditRepo;
