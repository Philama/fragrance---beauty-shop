
import React from 'react';
import { IconProps } from '../types';

export const ShoppingCartIcon: React.FC<IconProps> = ({ className, size = "24px" }) => (
  <div className={className} data-icon="ShoppingCart" data-size={size} data-weight="regular" aria-label="Bolsa de Compras">
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      <path
        d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"
      ></path>
    </svg>
  </div>
);

export const HouseIcon: React.FC<Omit<IconProps, 'className'> & { className?: string }> = ({ className, size = "24px", weight = "regular" }) => (
  <div className={className} data-icon="House" data-size={size} data-weight={weight} aria-label="Inicio">
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      <path
        d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"
      ></path>
    </svg>
  </div>
);

export const MagnifyingGlassIcon: React.FC<Omit<IconProps, 'className'> & { className?: string }> = ({ className, size = "24px", weight = "regular" }) => (
  <div className={className} data-icon="MagnifyingGlass" data-size={size} data-weight={weight} aria-label="Buscar">
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
    </svg>
  </div>
);

export const HashIcon: React.FC<Omit<IconProps, 'className'> & { className?: string }> = ({ className, size = "24px", weight = "regular" }) => (
  <div className={className} data-icon="Hash" data-size={size} data-weight={weight} aria-label="Marcas">
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      <path
        d="M224,88H175.4l8.47-46.57a8,8,0,0,0-15.74-2.86l-9,49.43H111.4l8.47-46.57a8,8,0,0,0-15.74-2.86L95.14,88H48a8,8,0,0,0,0,16H92.23L83.5,152H32a8,8,0,0,0,0,16H80.6l-8.47,46.57a8,8,0,0,0,6.44,9.3A7.79,7.79,0,0,0,80,224a8,8,0,0,0,7.86-6.57l9-49.43H144.6l-8.47,46.57a8,8,0,0,0,6.44,9.3A7.79,7.79,0,0,0,144,224a8,8,0,0,0,7.86-6.57l9-49.43H208a8,8,0,0,0,0-16H163.77l8.73-48H224a8,8,0,0,0,0-16Zm-76.5,64H99.77l8.73-48h47.73Z"
      ></path>
    </svg>
  </div>
);

export const HeartIcon: React.FC<Omit<IconProps, 'className'> & { className?: string }> = ({ className, size = "24px", weight = "regular" }) => (
  <div className={className} data-icon="Heart" data-size={size} data-weight={weight} aria-label="Favoritos">
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      <path
        d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"
      ></path>
    </svg>
  </div>
);

export const UserCircleIcon: React.FC<Omit<IconProps, 'className'> & { className?: string }> = ({ className, size = "24px", weight = "regular" }) => (
  <div className={className} data-icon="UserCircle" data-size={size} data-weight={weight} aria-label="Perfil">
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      <path
        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"
      ></path>
    </svg>
  </div>
);

export const AdminIcon: React.FC<Omit<IconProps, 'className'> & { className?: string }> = ({ className, size = "24px", weight = "regular" }) => (
  <div className={className} data-icon="Gear" data-size={size} data-weight={weight} aria-label="Admin">
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      <path d="M128,80a48,48,0,1,0,48,48A48.05452,48.05452,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32.03622,32.03622,0,0,1,128,160Z"></path>
      <path d="M228.44629,116.77734l-22.60937-10.29882c-2.00049-.91114-3.3711-2.82227-3.3711-4.99951s1.37061-4.08837,3.3711-4.99951l22.60937-10.29883a8.00018,8.00018,0,0,0,4.32618-10.18945l-16-32a7.99944,7.99944,0,0,0-10.18848-4.32617l-22.60058,10.29c-2.00049.91113-4.23047.27246-5.59082-1.54981L168.001,26.43164a7.99954,7.99954,0,0,0-7.21875-4.43164H95.21777a7.99954,7.99954,0,0,0-7.21875,4.43164L81.23828,48.5127c-1.36035,1.82227-3.59033,2.46094-5.59082,1.5498l-22.60058-10.29a7.99944,7.99944,0,0,0-10.18848,4.32617l-16,32a8.00018,8.00018,0,0,0,4.32618,10.18945l22.60937,10.29883c2.00049.91113,3.3711,2.82226,3.3711,4.99951s-1.37061,4.08838-3.3711,4.99951L27.5752,139.22266a8.00018,8.00018,0,0,0-4.32618,10.18945l16,32a7.99944,7.99944,0,0,0,10.18848,4.32617l22.60058-10.29c2.00049-.91113,4.23047.27246,5.59082,1.54981L88.001,229.56836a7.99954,7.99954,0,0,0,7.21875,4.43164h63.5625a7.99954,7.99954,0,0,0,7.21875-4.43164l6.76074-22.08301c1.36035-1.82226,3.59033-2.46093,5.59082-1.5498l22.60058,10.29a7.99944,7.99944,0,0,0,10.18848-4.32617l16-32A8.00018,8.00018,0,0,0,228.44629,116.77734ZM128,176a64,64,0,1,1,64-64A64.07271,64.07271,0,0,1,128,176Z"></path>
    </svg>
  </div>
);

export const XIcon: React.FC<IconProps> = ({ className = "text-[#171212]", size = "24px", onClick }) => (
  <button onClick={onClick} className={`${className} flex size-12 shrink-0 items-center justify-center`} aria-label="Cerrar" data-icon="X" data-size={size} data-weight="regular">
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      <path
        d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
      ></path>
    </svg>
  </button>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ className = "text-[#171212]", size = "24px", onClick }) => (
  <button onClick={onClick} className={`${className} flex size-12 shrink-0 items-center justify-center`} aria-label="Volver atrás" data-icon="ArrowLeft" data-size={size} data-weight="regular">
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
    </svg>
  </button>
);

export const ShoppingBagIcon: React.FC<IconProps> = ({ className = "text-[#171212]", size = "24px", onClick }) => (
 <button onClick={onClick} className={`${className} flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-transparent text-[#171212] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0`} aria-label="Bolsa de Compras">
    <div className={className} data-icon="ShoppingBag" data-size={size} data-weight="regular">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
        <path
          d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z"
        ></path>
      </svg>
    </div>
 </button>
);

export const CaretDownIcon: React.FC<IconProps> = ({ className = "text-[#171212]", size = "20px", weight = "regular", style }) => (
  <div className={className} data-icon="CaretDown" data-size={size} data-weight={weight} style={style} aria-label="Desplegar">
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
    </svg>
  </div>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ className = "text-[#171212]", size = "18px", filled = false }) => (
  <div className={className} data-icon="Star" data-size={size} data-weight={filled ? "fill" : "regular"} aria-label={filled ? "Estrella llena" : "Estrella vacía"}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      {filled ? (
        <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
      ) : (
        <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path>
      )}
    </svg>
  </div>
);

export const ThumbsUpIcon: React.FC<IconProps> = ({ className = "text-inherit", size = "20px" }) => (
  <div className={className} data-icon="ThumbsUp" data-size={size} data-weight="regular" aria-label="Me gusta">
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path>
    </svg>
  </div>
);

export const ThumbsDownIcon: React.FC<IconProps> = ({ className = "text-inherit", size = "20px" }) => (
  <div className={className} data-icon="ThumbsDown" data-size={size} data-weight="regular" aria-label="No me gusta">
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"></path>
    </svg>
  </div>
);

export const SignOutIcon: React.FC<Omit<IconProps, 'className'> & { className?: string }> = ({ className, size = "24px", weight = "regular" }) => (
  <div className={className} data-icon="SignOut" data-size={size} data-weight={weight} aria-label="Cerrar sesión">
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
      <path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-92.69-48-48a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-34.35,34.37a8,8,0,0,0,11.32,11.32l48-48A8,8,0,0,0,221.66,123.31Z"></path>
    </svg>
  </div>
);

export const GoogleIcon: React.FC<Omit<IconProps, 'className'> & { className?: string }> = ({ className, size = "24px" }) => (
  <div className={className} data-icon="GoogleLogo" data-size={size} data-weight="regular" aria-label="Google">
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.51H17.96C17.73 15.63 17.07 16.59 16.11 17.22V19.74H19.92C21.62 18.03 22.56 15.39 22.56 12.25Z" fill="#4285F4"/>
      <path d="M12 23C14.97 23 17.45 22.04 19.24 20.59L15.43 18.07C14.47 18.72 13.31 19.09 12 19.09C9.47 19.09 7.27 17.41 6.46 15.06H2.58V17.65C4.36 20.91 7.92 23 12 23Z" fill="#34A853"/>
      <path d="M6.46 15.06C6.23 14.39 6.12 13.68 6.12 12.94C6.12 12.2 6.23 11.49 6.46 10.82V8.24H2.58C1.55 10.09 1 12.45 1 15C1 17.55 1.55 19.91 2.58 21.76L6.46 19.18V15.06Z" fill="#FBBC05"/>
      <path d="M12 6.91C13.44 6.91 14.73 7.42 15.76 8.39L19.31 4.84C17.45 3.14 14.97 2 12 2C7.92 2 4.36 4.09 2.58 7.35L6.46 9.94C7.27 7.59 9.47 5.91 12 5.91V6.91Z" fill="#EA4335"/>
    </svg>
  </div>
);
