
import React from 'react';
import { AdminLoginPageProps } from '../types';
import { HouseIcon } from './Icons'; 
import { GoogleIcon } from './Icons'; // Assuming a GoogleIcon is available or will be added

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ 
  onGoogleSignIn, 
  onNavigateHome, 
  currentUser, 
  isCurrentUserAdmin,
  authInProgress 
}) => {
  
  const handleSignIn = async () => {
    await onGoogleSignIn();
    // Navigation to admin page if successful is handled by App.tsx's onAuthStateChange
  };

  let content;

  if (authInProgress) {
    content = <p className="text-gray-600 text-center">Verificando autenticación...</p>;
  } else if (currentUser && !isCurrentUserAdmin) {
    content = (
      <div className="text-center">
        <p className="text-red-600 font-semibold mb-4">Acceso Denegado</p>
        <p className="text-gray-700 mb-6">
          La cuenta <span className="font-medium">{currentUser.email}</span> no tiene permisos de administrador.
        </p>
      </div>
    );
  } else if (!currentUser) { // Prompt to sign in if no user or if user is not admin
    content = (
      <>
        <p className="text-center text-gray-600 mb-8">
          Inicia sesión con tu cuenta de Google de administrador.
        </p>
        <button
          onClick={handleSignIn}
          disabled={authInProgress}
          className="w-full flex items-center justify-center gap-3 rounded-full h-12 px-6 bg-white border border-gray-300 text-gray-700 text-base font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4] transition-colors disabled:opacity-70"
        >
          <GoogleIcon size="20px" />
          <span>Ingresar con Google</span>
        </button>
      </>
    );
  } else { 
    // This case (currentUser && isCurrentUserAdmin) should ideally redirect to AdminPage by App.tsx
    // But if somehow landed here, show a message.
    content = <p className="text-gray-600 text-center">Ya has iniciado sesión como administrador. Redirigiendo...</p>;
  }


  return (
    <div 
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 group/design-root"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-[#181111] mb-6">
          Panel de Administrador
        </h1>
        
        {content}

        <div className="mt-8 text-center">
            <button
                onClick={onNavigateHome}
                className="flex items-center justify-center w-full gap-2 px-4 py-3 bg-gray-200 text-[#181111] text-sm font-medium rounded-full hover:bg-gray-300 transition-colors"
                aria-label="Volver a la tienda"
            >
                <HouseIcon className="text-[#181111]" size="20px" />
                <span>Volver a la Tienda</span>
            </button>
        </div>
        
        {ADMIN_EMAIL_FOR_DISPLAY && !isCurrentUserAdmin && (
             <p className="mt-8 text-xs text-gray-500 text-center">
                Acceso restringido. Solo administradores ({ADMIN_EMAIL_FOR_DISPLAY}) pueden ingresar.
             </p>
        )}
      </div>
    </div>
  );
};

// For display purposes only, in a real app, don't expose admin email like this.
const ADMIN_EMAIL_FOR_DISPLAY = 'admin@example.com';
