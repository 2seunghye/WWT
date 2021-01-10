import React, { useState } from 'react';
import { authService } from 'fBase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);

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

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onChange={onChange} onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="Email" required value={email} />
        <input onChange={onChange} name="password" type="password" placeholder="Password" required value={password} />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
      </form>
      <div>
        <button>Contivue with Google</button>
        <button>Contivue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
