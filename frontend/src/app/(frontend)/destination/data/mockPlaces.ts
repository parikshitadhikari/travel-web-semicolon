const mockPlaces = [
  {
    id: 1,
    name: "Kathmandu Durbar Square",
    description:
      "Kathmandu Durbar Square is a historical site located in the heart of the capital city, Kathmandu. It is a UNESCO World Heritage Site, rich in history and cultural significance. The square is home to ancient palaces, temples, and courtyards that were once the seat of Nepalese kings. Visitors can explore structures such as the Hanuman Dhoka Palace, Kumari Ghar (the house of the Living Goddess), and various pagoda-style temples. The site reflects traditional Nepalese art and architecture.",
    budget: "$20-50/day",
    guide_name: "Ram Prasad",
    people_liking_this_place: ["Rajan", "Priya", "Bimal"],
    image_of_the_place:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYmA5DQMDfYQPjplzGXgBksGlwQ6IezTARoQ&s",
    tag: ["Cultural Enthusiast", "History Buffs"],
  },
  {
    id: 2,
    name: "Pokhara",
    description:
      "Pokhara is a lakeside city that serves as the gateway to the Annapurna mountain range. Known for its stunning natural beauty, the city is home to Phewa Lake, where visitors can enjoy boating with a backdrop of snow-capped peaks. Pokhara is also a hub for adventure activities such as paragliding, ultralight flights, and trekking. The city's laid-back atmosphere and stunning views make it a popular destination for both adventurers and those seeking relaxation.",
    budget: "$30-70/day",
    guide_name: "Sita Khadka",
    people_liking_this_place: ["Anil", "Roshni", "Suman"],
    image_of_the_place:
      "https://xcmag.com/wp-content/uploads/2014/02/pokhara-602-402.gif",
    tag: ["Adventure Seeker", "Nature Lover", "Relaxation and Wellness"],
  },
  {
    id: 3,
    name: "Chitwan National Park",
    description:
      "Chitwan National Park is Nepal's first national park and a UNESCO World Heritage Site. Located in the subtropical lowlands of southern Nepal, it is famous for its rich biodiversity. Visitors can go on jungle safaris to spot wildlife such as one-horned rhinos, Bengal tigers, and elephants. The park also offers activities like canoe rides, birdwatching, and guided jungle walks. It is one of the best places in Asia for wildlife observation.",
    budget: "$50-100/day",
    guide_name: "Bishnu Thapa",
    people_liking_this_place: ["Arun", "Maya", "Deepak"],
    image_of_the_place:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAkBDnxxMQVZ5-vetFbga6dCZwojEubQFvzA&s",
    tag: ["Adventure Seeker", "Nature Lover", "Thrill Seeker"],
  },
  {
    id: 4,
    name: "Lumbini",
    description:
      "Lumbini is one of the most sacred places for Buddhists, as it is the birthplace of Lord Buddha. Located in the Terai region of Nepal, Lumbini is a UNESCO World Heritage Site. The key attraction here is the Maya Devi Temple, which marks the exact spot where Buddha was born. The site is also home to various monasteries built by Buddhist communities from around the world, making it a serene and spiritual destination.",
    budget: "$20-40/day",
    guide_name: "Nima Sherpa",
    people_liking_this_place: ["Pooja", "Suresh", "Ravi"],
    image_of_the_place:
      "https://upload.wikimedia.org/wikipedia/commons/1/18/BRP_Lumbini_Mayadevi_temple.jpg",
    tag: ["Cultural Enthusiast", "History Buffs", "Relaxation and Wellness"],
  },
  {
    id: 5,
    name: "Bhaktapur Durbar Square",
    description:
      "Bhaktapur Durbar Square is located in the city of Bhaktapur, about 13 km from Kathmandu. This square is renowned for its well-preserved medieval architecture, art, and culture. The square features several important structures, including the 55-Window Palace, Vatsala Temple, and the Nyatapola Temple, which is the tallest pagoda in Nepal. Bhaktapur is famous for its pottery, wood carvings, and metal crafts, offering a glimpse into Nepal's artistic heritage.",
    budget: "$20-40/day",
    guide_name: "Anju Joshi",
    people_liking_this_place: ["Santosh", "Kritika", "Pawan"],
    image_of_the_place:
      "https://www.nepalsanctuarytreks.com/wp-content/uploads/2018/10/lumbini.jpg",
    tag: ["Cultural Enthusiast", "History Buffs"],
  },
  {
    id: 6,
    name: "Everest Base Camp",
    description:
      "Everest Base Camp (EBC) is one of the most sought-after trekking destinations in the world. Located at an altitude of about 5,364 meters, it offers adventurers a chance to get up close to the world's highest peak, Mount Everest. The trek to EBC takes about 12-15 days, passing through Sherpa villages, monasteries, and breathtaking landscapes. This trek offers a unique combination of physical challenge and cultural experience.",
    budget: "$1000-1500",
    guide_name: "Ang Tshering Sherpa",
    people_liking_this_place: ["Nima", "Sangita", "Bijay"],
    image_of_the_place:
      "https://www.natureloverstrek.com/pagegallery/a-comprehensive-guide-to-everest-base-camp-trek-in-202415.JPG",
    tag: ["Adventure Seeker", "Thrill Seeker", "Nature Lover"],
  },
  {
    id: 7,
    name: "Patan Durbar Square",
    description:
      "Patan Durbar Square, located in the city of Lalitpur, is another UNESCO World Heritage Site. The square is famous for its artistic and architectural heritage, particularly its Newari-style temples and courtyards. Key attractions include the Krishna Mandir, the Patan Museum, and the Mahabouddha Temple. Patan is also known as the 'City of Fine Arts,' with a rich tradition in metalwork and sculpture.",
    budget: "$15-30/day",
    guide_name: "Surya Manandhar",
    people_liking_this_place: ["Keshav", "Bhawana", "Nabin"],
    image_of_the_place:
      "https://nepaltraveller.com/images/main/1644130288.sidetrackimagetemple-g9444dc0a6_1920.jpg",
    tag: ["Cultural Enthusiast", "History Buffs"],
  },
  {
    id: 8,
    name: "Rara Lake",
    description:
      "Rara Lake, the largest lake in Nepal, is located in the remote far-western region of the country. This pristine lake is set amidst the Rara National Park, surrounded by forests of pine, spruce, and juniper. The lake offers stunning views of the surrounding mountains and is a perfect destination for those looking for solitude and untouched natural beauty. It requires a few days of trekking to reach, making it a more adventurous destination.",
    budget: "$100-200/day",
    guide_name: "Dorje Lama",
    people_liking_this_place: [
      "Sabin",
      "Manju",
      "Tara",
      "Ujjwal",
      "Rohan",
      "Sudeep",
    ],
    image_of_the_place:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUjR7tRTLhjE5AnjI3porbtynBFgMyz5jb_A&s",
    tag: ["Nature Lover", "Adventure Seeker"],
  },
  {
    id: 9,
    name: "Annapurna Circuit",
    description:
      "The Annapurna Circuit is one of the most famous trekking routes in the world, known for its diversity in landscape and culture. The trek takes you through subtropical forests, alpine meadows, and arid desert-like terrain, offering stunning views of the Annapurna and Dhaulagiri mountain ranges. The trek also passes through traditional villages inhabited by Gurung, Thakali, and Manangi people, providing an immersive cultural experience.",
    budget: "$800-1200",
    guide_name: "Dawa Tamang",
    people_liking_this_place: ["Shyam", "Rina", "Sunil", "Rohan", "Sudeep"],
    image_of_the_place:
      "https://www.muchbetteradventures.com/magazine/content/images/2019/05/23144145/Annapurna-Circuit-6-1600x1067.jpeg",
    tag: ["Adventure Seeker", "Nature Lover", "Cultural Enthusiast"],
  },
  {
    id: 10,
    name: "Nagarkot",
    description:
      "Nagarkot is a popular hill station located just 32 km from Kathmandu. It is known for offering panoramic views of the Himalayan range, including Mount Everest on clear days. Nagarkot is especially famous for its sunrise and sunset views. The village is surrounded by lush forests and is a peaceful retreat from the hustle and bustle of the city.",
    budget: "$50-80/day",
    guide_name: "Milan Gurung",
    people_liking_this_place: ["Pratik", "Jyoti", "Rashmi", "Karan"],
    image_of_the_place:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/40/02/28/nagarkot.jpg?w=1100&h=1100&s=1",
    tag: ["Nature Lover", "Relaxation and Wellness"],
  },
  {
    id: 11,
    name: "Gosaikunda",
    description:
      "Gosaikunda is a high-altitude lake located in the Langtang National Park. It is considered sacred by both Hindus and Buddhists and is believed to be the abode of Lord Shiva. Pilgrims visit the lake during the Janai Purnima festival. The trek to Gosaikunda passes through beautiful landscapes, including forests, rivers, and terraced fields, making it a perfect destination for trekkers and pilgrims alike.",
    budget: "$100-200",
    guide_name: "Tashi Lama",
    people_liking_this_place: ["Madan", "Bina", "Pradeep"],
    image_of_the_place:
      "https://mountainroutes.com/wp-content/uploads/2022/07/Gosaikunda-trek-langtang-region.jpg",
    tag: ["Adventure Seeker", "Nature Lover", "Cultural Enthusiast"],
  },
  {
    id: 12,
    name: "Bandipur",
    description:
      "Bandipur is a picturesque hilltop town that has retained its old-world charm. The town is known for its preserved traditional Newari architecture and offers stunning views of the Himalayas. Bandipur's main attractions include the Siddha Cave, the largest cave in Nepal, and the Thani Mai Temple, which offers panoramic views of the surrounding landscapes. Visitors can also enjoy the quiet, traffic-free streets and the town’s cultural ambiance.",
    budget: "$40-80/day",
    guide_name: "Raju Manandhar",
    people_liking_this_place: ["Sabita", "Bishal", "Nabin"],
    image_of_the_place:
      "https://cdn.kimkim.com/files/a/content_articles/featured_photos/b04d6fe32a18d15c8f2ccf170a3e2b83c9af1c55/big-a9a20530ac77e5af349e6b67777a4549.jpg",
    tag: ["Cultural Enthusiast", "Nature Lover", "Relaxation and Wellness"],
  },
  {
    id: 13,
    name: "Tilicho Lake",
    description:
      "Tilicho Lake is located in the Annapurna region and is one of the highest lakes in the world at an altitude of 4,919 meters. It is renowned for its stunning turquoise waters set against a backdrop of snow-capped peaks. The trek to Tilicho Lake is challenging but offers some of the most breathtaking views of the Annapurna range and is often included as part of the Annapurna Circuit.",
    budget: "$800-1200",
    guide_name: "Mingma Sherpa",
    people_liking_this_place: ["Binod", "Asha", "Rajan"],
    image_of_the_place:
      "https://whatthenepal.com/wp-content/uploads/2023/08/sanjay-hona-2DzAu5J1Bc8-unsplash_2000x.jpg",
    tag: ["Adventure Seeker", "Nature Lover"],
  },
];
export default mockPlaces;
