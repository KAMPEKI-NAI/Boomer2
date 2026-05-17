import { IconType } from 'react-icons';
import {useCallback } from 'react';
import { useRouter } from 'next/router';
import { BsDot } from 'react-icons/bs';

import  useCurrentUser  from '@/hooks/useCurrentUser';
import useLoginModel from '@/hooks/useLoginModel';



interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string; 
  onClick?: () => void; 
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({  
  label,
  icon: Icon, 
  href, 
  onClick,
  auth,
  alert
}) => {
  const loginModel = useLoginModel();
  const { data: currentUser } = useCurrentUser(); 
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
      return;
    }

    if (auth && !currentUser) {
      loginModel.onOpen();
    }else if (href) {
      router.push(href);
    }
    
  }, [router, onClick, href, auth, currentUser, loginModel]);

  return(
    <div onClick={handleClick} className="flex flex-row items-center">
      <div
        className='relative
        rounded-full
        h-14
        w-14
        flex
        items-center
        justify-center
        p-4
        hover:bg-opacity-10
        cursor-pointer
        lg:hidden
        hover:bg-slate-300
      '>
        <Icon size={20} color='white'/>
        {alert ? <BsDot className="text-[#c65f32] absolute -top-4 left-0" size={70}/> : null }
      </div>
      <div
      className='
      relative
      hidden
      lg:flex
      items-center
      gap-4
      p-4
      rounded-full
      hover:bg-slate-300
      hover:bg-opacity-10
      cursor-pointer
      '
      >
        <Icon size={24} color='white'></Icon>
        <p className='hidden lg:block text-white text-xl'>
          {label}
        </p>
        {alert ? <BsDot className="text-[#c65f32] absolute -top-4 left-0" size={70}/> : null }
      </div>
    </div>
  )
   
  }
  

  

//   return (
//     <button onClick={onClick} className="flex items-center space-x-3 p-3 w-full text-left hover:bg-gray-200 rounded-lg">
//       {iconElement}
//       <span>{label}</span>
//     </button>
//   );
// };

export default SidebarItem;
