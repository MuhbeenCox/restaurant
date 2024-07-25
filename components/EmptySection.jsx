import Image from "next/image";

const EmptySection=({label})=>{
    return(
        <div className="flex justify-center items-center  h-full  w-full">
        <div className=" relative w-auto h-auto">
          <Image
            src="/assets/images/empty_cart1.jpg"
            width={260}
            height={240}
            alt="empty_cart"
            className=""
          />
          <p className="text-center text-softtext absolute bottom-5 right-1/3">
          {label}
          </p>
        </div>
      </div>
    );
}

export default EmptySection;