import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onChange={onChange} onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="Email" required value={email} />
        <input onChange={onChange} name="password" type="password" placeholder="Password" required value={password} />
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button>Contivue with Google</button>
        <button>Contivue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
