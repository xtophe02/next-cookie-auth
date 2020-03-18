import React from "react";

const LoginForm = ({state, handleChange, loading}) => {

  return (
    <div className='container'>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input className="input" type="email" placeholder="Email" onChange={handleChange} value={state.email} name="email"/>
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"/>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"/>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left">
          <input className="input" type="password" placeholder="Password" onChange={handleChange} value={state.password} name="password"/>
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>
  <button className={`button is-info is-outlined ${loading ? 'is-loading' : null}`} type="submit">Login</button>
    </div>
  );
};

export default LoginForm;
