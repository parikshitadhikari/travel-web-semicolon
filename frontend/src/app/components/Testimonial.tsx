const Testimonial = () => {
    const testimonial = [
      {
        id: 1,
        description:
          "\"Met my travel crew here, and now we plan every adventure together!\"",
        personImage:
          "https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg",
        personName: "Ram Sundar",
        personPosition: "Travel Vlogger",
      },
      {
        id: 2,
        description:
          "\"Found friends who love exploring as much as I do. Best trips ever!\"",
        personImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHNbQHm5JxxqX9oy5KER7O8aSKzblZZ7aVfZT3jB7IqQ&s",
        personName: "Salomi Airy",
        personPosition: "Digital Nomad",
      },
      {
        id: 3,
        description:
          "\"This site helped me connect with travelers who share my vibe. Love it!\"",
        personImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPVFwiCwqjKjyL7tVfEMrswvIV_NgKDbRCdw&usqp=CAU",
        personName: "Sherry Cherry",
        personPosition: "Content Creator",
      },
    ];
  
    return (
      <div className="mt-20 ">
        <div className="text-5xl text-center w-full mb-16 font-bold">
          Testimonials
        </div>
        <div className="testimonial-container w-full flex justify-center items-center gap-20 mb-20">
          {testimonial.map(
            ({
              id,
              description,
              personImage,
              personName,
              personPosition,
            }) => {
              return (
                <div
                  key={id}
                  className="card h-[14rem] w-[22rem] rounded-md shadow-lg flex flex-col space-y-3  bg-gray-50"
                >
                  <div className="desc h-[35%] mx-8 mt-10 text-gray-500  bg-gray-50">
                    {description}
                  </div>
                  <div className="h-[20%] flex flex-row">
                    <div className="personImage w-[40px] mr-5 flex justify-center items-center mx-5">
                      <img
                        src={personImage}
                        alt=""
                        className="rounded-full h-[80%] border-2 border-white mt-5"
                      />
                    </div>
                    <div className="personDesc flex flex-col justify-center items-center  bg-gray-50">
                      <div className="h-[50%] text-xl">{personName}</div>
                      <div className="h-[20%] text-md  text-blue-400">
                        {personPosition}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  };
  
  export default Testimonial;
  