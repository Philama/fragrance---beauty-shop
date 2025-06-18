
import React from 'react';
import { UserProfilePageProps } from '../types';
import { HouseIcon, SignOutIcon, GoogleIcon } from './Icons'; // Assuming GoogleIcon exists

export const UserProfilePage: React.FC<UserProfilePageProps> = ({
  currentUser,
  onGoogleSignIn,
  onLogout,
  onNavigateHome,
  authInProgress
}) => {

  const handleSignIn = async () => {
    await onGoogleSignIn();
  };
  
  return (
    <div 
        className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 group/design-root"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-[#181111] mb-8">
          {currentUser ? 'Tu Perfil' : 'Ingresar / Registrarse'}
        </h1>

        {authInProgress && (
            <div className="text-center py-4">
                <p className="text-gray-600">Cargando...</p>
            </div>
        )}

        {!authInProgress && currentUser && (
          <div className="space-y-6 text-center">
            <img 
              src={currentUser.user_metadata?.avatar_url || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(currentUser.email || 'user')}`} 
              alt="User avatar" 
              className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-200"
            />
            <p className="text-lg text-gray-800">
              Conectado como: <span className="font-semibold">{currentUser.email}</span>
            </p>
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 rounded-full h-11 px-6 bg-gray-600 text-white text-sm font-bold hover:bg-gray-700 transition-colors"
              aria-label="Cerrar sesión"
            >
              <SignOutIcon size="20px" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        )}

        {!authInProgress && !currentUser && (
          <div className="space-y-4">
            <p className="text-center text-gray-600 mb-6">
              Inicia sesión con Google para ver tu perfil y gestionar tu cuenta.
            </p>
            <button
              onClick={handleSignIn}
              disabled={authInProgress}
              className="w-full flex items-center justify-center gap-3 rounded-full h-12 px-6 bg-white border border-gray-300 text-gray-700 text-base font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4] transition-colors"
            >
              <GoogleIcon size="20px" />
              <span>Ingresar con Google</span>
            </button>
          </div>
        )}

        <div className="mt-10 text-center">
            <button
                onClick={onNavigateHome}
                className="flex items-center justify-center w-full gap-2 px-4 py-3 bg-gray-200 text-[#181111] text-sm font-medium rounded-full hover:bg-gray-300 transition-colors"
                aria-label="Volver a la tienda"
            >
                <HouseIcon className="text-[#181111]" size="20px" />
                <span>Volver a la Tienda</span>
            </button>
        </div>
      </div>
    </div>
  );
};
