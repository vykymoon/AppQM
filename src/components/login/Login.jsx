import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FireBase'; // ajusta la ruta si está en otro lugar

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario logueado:', userCredential.user);
      navigate('/Welcome'); // Redirige al home después de iniciar sesión
    } catch (error) {
      console.error('Error en login:', error.message);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://pbs.twimg.com/media/GBJ0MQjXwAAtW6m.jpg:large')`,
        }}
      />

      {/* Degradado morado */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2E2955]/80 to-transparent" />

      {/* Logo QuickMeal arriba */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
        <img
          src="https://cdn.discordapp.com/attachments/1353908594571083930/1368724264915828927/image.png?ex=6819434e&is=6817f1ce&hm=eade4d4b5abf1741fe2f3c5b9b8f2ed8c56219cb23a87335c3ef1f7f0fe47d53&"
          alt="QuickMeal Logo"
          className="w-66"
        />
      </div>

      {/* Formulario de login */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-20 w-80 bg-white bg-opacity-90 rounded-3xl p-6 shadow-xl">
        <h2 className="text-center text-[#2E2955] text-lg font-semibold mb-4">
          Welcome to QuickMeal
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b border-gray-400 focus:outline-none py-2 px-1 bg-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b border-gray-400 focus:outline-none py-2 px-1 bg-transparent"
          />
          <button
            type="submit"
            className="bg-[#2E2955] hover:bg-[#221f44] text-white py-2 rounded-xl font-semibold mt-4"
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          You don't have an account?{' '}
          <Link to="/signup" className="text-[#2E2955] font-semibold underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
