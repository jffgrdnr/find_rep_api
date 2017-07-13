var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');

class Home extends React.Component {
  	constructor(props) {
    	super(props);
    	this.state = {
      		type: '',
      		state: '',
      		officers: [],
      		showDetails: 'hide',
      		showHeaders: 'hide',
      		officerIsSelected: false,
      		selectedOfficer: '',
      		officerObject: []
      	},
    	this.handleTypeChange = this.handleTypeChange.bind(this);
    	this.handleStateChange = this.handleStateChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
  	}
  	setStateWithServants(response) {
		this.setState({officers:response})
	}

	// Handle change of select with officer type
	handleTypeChange(event) {
		if (event.target.value != undefined) {
			this.setState({type: event.target.value});
			this.resetDetails();
		}
  	}
  	// Handle change of select with state 
  	handleStateChange(event) {
		if (event.target.value != undefined) {
			this.setState({state: event.target.value});
			this.resetDetails();
		}
  	}
  	resetDetails() {
  		this.setState({showHeaders:'hide', showDetails:'hide'})
  	}
  	handleOfficerSelect(index, event) {
  		//console.log(index);
  		event.preventDefault();
  		if (index != undefined) {
  			let officersList = this.state.officers,
  				selectedOfficer = index,
  				activeOfficer;
	  			activeOfficer = officersList[selectedOfficer];
  			this.setState({showDetails:'show', officerIsSelected:true, selectedOfficer:index, officerObject:activeOfficer})
  			//console.log(this.state.officerObject);
  		}
  	}

  	// handle submit of form
  	handleSubmit(event) {
  		event.preventDefault();
  		//console.log(event.target.officer.value, event.target.state.value);
    	if (event.target.officer.value === "" || event.target.state.value === "") {
    		if (event.target.officer.value === "") {
	    		alert('Please select an officer type');
	    		return;
	    	}
	    	if (event.target.state.value === "") {
	    		alert('Please select a state');
	    		return;
	    	}
	    } else {
    		//console.log('event: ', event.target.officer.value, event.target.state.value);
    		var officer = event.target.officer.value,
    			state = event.target.state.value,
    			data = '',
    			self = this;

    		axios.get(`http://localhost:3000/${officer}/${state}`)
	  		.then(function (response) {
	  			self.setState({officers:response.data.results})
	  			//console.log(self.state.officers);
	  		})
	  		.catch(function (error) {
				console.log(error);
			})
			this.setState({showHeaders:'show'})
    	}
  	}

  render() {
    return (
      <div>
      	<form onSubmit={this.handleSubmit}>
	        <select value={this.state.type} name="officer" onChange={this.handleTypeChange}>
	        	<option value="">Choose officer type</option>
				<option value="representatives">Representatives</option>
				<option value="senators">Senators</option>
			</select>
			<select value={this.state.state} name="state" onChange={this.handleStateChange}>
	        	<option value="">Choose state</option>
				<option value="AL">Alabama</option>
				<option value="AK">Alaska</option>
				<option value="AZ">Arizona</option>
				<option value="AR">Arkansas</option>
				<option value="CA">California</option>
				<option value="CO">Colorado</option>
				<option value="CT">Connecticut</option>
				<option value="DE">Delaware</option>
				<option value="DC">District Of Columbia</option>
				<option value="FL">Florida</option>
				<option value="GA">Georgia</option>
				<option value="HI">Hawaii</option>
				<option value="ID">Idaho</option>
				<option value="IL">Illinois</option>
				<option value="IN">Indiana</option>
				<option value="IA">Iowa</option>
				<option value="KS">Kansas</option>
				<option value="KY">Kentucky</option>
				<option value="LA">Louisiana</option>
				<option value="ME">Maine</option>
				<option value="MD">Maryland</option>
				<option value="MA">Massachusetts</option>
				<option value="MI">Michigan</option>
				<option value="MN">Minnesota</option>
				<option value="MS">Mississippi</option>
				<option value="MO">Missouri</option>
				<option value="MT">Montana</option>
				<option value="NE">Nebraska</option>
				<option value="NV">Nevada</option>
				<option value="NH">New Hampshire</option>
				<option value="NJ">New Jersey</option>
				<option value="NM">New Mexico</option>
				<option value="NY">New York</option>
				<option value="NC">North Carolina</option>
				<option value="ND">North Dakota</option>
				<option value="OH">Ohio</option>
				<option value="OK">Oklahoma</option>
				<option value="OR">Oregon</option>
				<option value="PA">Pennsylvania</option>
				<option value="RI">Rhode Island</option>
				<option value="SC">South Carolina</option>
				<option value="SD">South Dakota</option>
				<option value="TN">Tennessee</option>
				<option value="TX">Texas</option>
				<option value="UT">Utah</option>
				<option value="VT">Vermont</option>
				<option value="VA">Virginia</option>
				<option value="WA">Washington</option>
				<option value="WV">West Virginia</option>
				<option value="WI">Wisconsin</option>
				<option value="WY">Wyoming</option>
			</select>
			<input type="submit" className="button" value="Submit" />
		</form>
		<div className="dataLayout clearfix">
			<div className="officersList">
				<table className={this.state.showHeaders}>
					<tbody>
						<tr className="header big">
							<th>List / <span className="blue">{this.state.type}</span></th>
							<th></th>
						</tr>
						<tr className="header">
							<th>Name</th>
							<th>Party</th>
						</tr>
					{this.state.officers.map((officer, index) => (
	        			<tr key={index} data-item={index} onClick={() => { this.handleOfficerSelect(index, event) }}>
	        				<td className="name" >{officer.name}</td>
	        				<td>{officer.party}</td>
	        			</tr>
	    			))}
	    			</tbody>
	    		</table>
			</div>
			<div className={"officersDetailList " + this.state.showDetails}>
				<h2 className="big">Info</h2>
					<ul>
	    				<li>Name: <span className="bold">{this.state.officerObject.name}</span></li>
	    				<li>District: <span className="bold">{this.state.officerObject.district ? this.state.officerObject.district : "n/a"}</span></li>
	    				<li>Phone: <span className="bold">{this.state.officerObject.phone}</span></li>
	    				<li>Address: <span className="bold">{this.state.officerObject.office}</span></li>
	    			</ul>
			</div>
		</div>
    </div>
    );
  }
}

module.exports = Home
