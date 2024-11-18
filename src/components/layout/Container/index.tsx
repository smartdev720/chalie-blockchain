import React from "react";

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
    return (
        <div className="bg-center bg-contain bg-no-repeat h-[2143px] 2xl:h-[1599px] xl:h-[1599px] lg:xl:h-[1599px] md:xl:h-[1599px] sm:xl:h-[2143px] py-10 overflow-hidden background-image">
        <div className="w-[80%] mx-auto">
          {children}
        </div>
      </div>
    );
}

export default Container;