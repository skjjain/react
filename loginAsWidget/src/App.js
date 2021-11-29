import React, { useState, useEffect } from 'react';

import "./App.scss";
export default function App() {

  const [name, setName] = useState()

  function nameOnChange(e){
    let val = e.target.value
    setName(val)
  }

  return (
    <div id="embeddedWidget">
      <div className="box-main">
        <h2>Register {name && 'me as'} {name}</h2>
        <div className="form-group">
          <div className="mat-input">
            <div className="mat-input-outer">
              <input
                className="form-control filterInput"
                id="first_name"
                name="first_name"
                maxlength="50"
                minlength="1"
                required=""
                aria-required="true"
                placeholder="Name"
                value={name}
                onChange={e => nameOnChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="mat-input">
            <div className="mat-input-outer">
              <input
                className="form-control filterInput"
                type="email"
                id="email_id"
                name="email_id"
                required=""
                aria-required="true"
                placeholder="Email"
              />
            </div>
          </div>
        </div>
        <div className="form-group mobSumo">
          <div className="mat-input">
            <div className="mat-input-outer">
              <select
                className="form-control filterInput"
                name="user_city"
                id="user_city"
                title="Please Select City"
                tabindex="8"
                required=""
                aria-required="true"
              >
                <option value="">Select a City</option>
                <option value="51">Ahmedabad</option>
                <option value="105">Bangalore</option>
                <option value="42">Chandigarh</option>
                <option value="280">Chennai</option>
                <option value="74">Gurgaon</option>
                <option value="8">Hyderabad</option>
                <option value="269">Jaipur</option>
                <option value="338">Kolkata</option>
                <option value="201">Mumbai</option>
                <option value="49">New Delhi</option>
                <option value="205">Pune</option>
              </select>
              <label className="active-o">City</label>
            </div>
          </div>
          
        </div>
        
        <div className="form-group">
          <div className="mat-input">
            <div className="mat-input-outer">
              <input
                className="form-control filterInput onlyNumbers"
                type="tel"
                pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                name="phone_no"
                id="phone_no"
                maxlength="10"
                required=""
                aria-required="true"
                placeholder="Mobile Number"
              />
            </div>
          </div>
          
        </div>
        <div
          className="form-group config-chk margin-bottom-0"
        >
          <span className="d-flex positionleft">
            <input type="hidden" value="0" name="isCommChk" id="isCommChk" />
            <input
              type="checkbox"
              name="is_comm_chk"
              id="is_comm_chk"
              value="0"
              className="trigger inputAbs"
              data-rel=""
              tabindex="12"
            />
            <label for="is_comm_chk">
              <span className="dt-yes"></span>Communicate on WhatsApp{" "}
              <img
                src="http://poslocal.insurancedekho.com/public/b2c/zigwheels/img/ic_whatsapp.png"
                alt=""
                width="24"
              />
            </label>
          </span>
        </div>
        <button className="btn btn-id" id="join_now" >
          Join Now &nbsp;{" "}
          <img src="http://poslocal.insurancedekho.com/public/b2c/zigwheels/img/arrow.svg" />
        </button>
        <p className="mrg-t font-14">
          Already Registered?{" "}
          <a href="javascript:void(0)" id="loginPageUrl">
            {" "}
            Login Now{" "}
          </a>
        </p>
      </div>
    </div>
  );
}
