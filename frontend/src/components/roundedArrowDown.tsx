import { useState } from "react";

interface PlayIconProps {
  onClick?: () => void;
}

export const RoundedArrowDownIcon: React.FC<PlayIconProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
       onMouseEnter={handleMouseEnter}
       onMouseLeave={handleMouseLeave}
       onClick={onClick}
    >
      <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25.666 33.9422L36.5718 23.0364L33.7581 20.2885L25.666 28.3806L17.5739 20.2885L14.7602 23.0364L25.666 33.9422ZM25.6704 50.668C22.2127 50.668 18.9626 50.0118 15.9201 48.6995C12.8776 47.3873 10.2311 45.6063 7.98051 43.3568C5.72989 41.1072 3.94815 38.4618 2.6353 35.4206C1.32244 32.3795 0.666016 29.1301 0.666016 25.6724C0.666016 22.2146 1.32216 18.9646 2.63444 15.9221C3.94673 12.8796 5.72765 10.233 7.97722 7.98246C10.2268 5.73184 12.8722 3.95011 15.9134 2.63725C18.9545 1.3244 22.2039 0.667969 25.6616 0.667969C29.1193 0.667969 32.3694 1.32411 35.4119 2.6364C38.4544 3.94868 41.1009 5.7296 43.3515 7.97917C45.6021 10.2288 47.3839 12.8742 48.6967 15.9153C50.0096 18.9564 50.666 22.2058 50.666 25.6636C50.666 29.1213 50.0099 32.3714 48.6976 35.4138C47.3853 38.4564 45.6044 41.1029 43.3548 43.3535C41.1052 45.6041 38.4598 47.3858 35.4187 48.6987C32.3776 50.0115 29.1281 50.668 25.6704 50.668Z"
          fill="white"
          fillOpacity={isHovered ? "1" : "0.5"}
        />
        <path
          d="M36.571 23.0371L25.6652 33.9429L14.7594 23.0371L17.5731 20.2892L25.6652 28.3813L33.7573 20.2892L36.571 23.0371Z"
          fill={isHovered ? "black" : "white"}
        />
      </svg>
    </div>
  );
};