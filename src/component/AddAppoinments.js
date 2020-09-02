import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

class AddAppoinments extends Component {
    constructor() {
        super();
        this.state = {
            petName: '',
            ownerName: '',
            aptDate: '',
            aptTime: '',
            aptNotes:''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
         
    }
    handleAdd(e) {
        e.preventDefault();
        let tempApts = {
            petName: this.state.petName,
            ownerName: this.state.ownerName,
            aptDate: this.state.aptDate + " " + this.state.aptTime,
            
            aptNotes: this.state.aptNotes
        };
        console.log(`${tempApts.aptDate} ${tempApts.aptNotes}`);
        this.props.addAppointments(tempApts);
        this.setState({
            petName: '',
            ownerName: '',
            aptDate: '',
            aptTime: '',
            aptNotes:''
        })

    }
    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }
    render() {
        return(
            <div className={
                "card textcenter mt-3 "+
                (this.props.formDisplay?'':'add-appointment')
                }>
                <div className="apt-addheading bg-primary text-white  card-header"
                onClick={this.props.toggleForm}>
                  <h4> <FaPlus/> Add Appointments</h4>
                </div>
                <div className="card-body">
                    <form id="aptForm" noValidate onSubmit={this.handleAdd}>
                        <div className="form-group form-row">
                            <label className="col-md-2 col-form-label text-md-right" htmlFor="petName" readOnly>
                                Pet Name
                            </label>
                            <div className="col-md-10">
                                <input type="text"
                                    className="form-control"
                                    name="petName"
                                    placeholder="Pet's Name"
                                    value={this.state.petName} onChange={this.handleChange}/>
                            </div>
                        </div>
                            <div className="form-group form-row">
                                <label className="col-md-2 col-form-label text-md-right" htmlFor="OwnerName" readOnly>
                                    Pet Name
                                </label>
                                <div className="col-md-10">
                                    <input type="text" 
                                        className="form-control"
                                        name="ownerName"
                                    placeholder="Owner's Name"
                                    value={this.state.ownerName}
                                    onChange={this.handleChange}/>
                                </div>
                            </div>
                                
                        <div className="form-group form-row">
                                <label className="col-md-2 col-form-label text-md-right" htmlFor="aptDate" readOnly>
                                    Date
                                </label>
                                <div className="col-md-4">
                                    <input type="date" 
                                        className="form-control"
                                        name="aptDate"
                                        value={this.state.aptDate}
                                        onChange={this.handleChange} />
                                </div>
                                <label className="col-md-2 col-form-label text-md-right" htmlFor="aptTime" readOnly>
                                    Time
                                </label>
                                <div className="col-md-4">
                                    <input type="time"
                                    className="form-control"
                                    name="aptTime"
                                    value={this.state.aptTime}
                                    onChange={this.handleChange}
                                    />
                                 </div>
                                
                            </div>
                        <div className="form-group form-row">
                                <label className="col-md-2 col-form-label text-md-right" htmlFor="aptNotes" readOnly>
                                    Appointment Notes
                                </label>
                                <div className="col-md-10">
                                <textarea type="text" 
                                    cols="50"
                                    rows="5"
                                        className="form-control"
                                        name="aptNotes"
                                    placeholder="Appointment Notes"
                                    value={this.state.aptNotes}
                                    onChange={this.handleChange}/>
                                 </div>
                                
                        </div>
                        <div className="form-group form-row mb-0 ml-auto">
                            <button type="submit" className="btn btn-primary d-block ml-auto">
                                Add Appointment
                            </button>
                        </div>
                    </form>

                </div>
            
            </div>
         );
        
    }
}
export default AddAppoinments;