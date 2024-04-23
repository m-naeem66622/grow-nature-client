import { getSeason } from "./utils/getSeason";
import Member_1 from "./assets/member_1.png";
import Member_2 from "./assets/member_2.png";
import Member_3 from "./assets/member_3.png";

const staticData = {
  services: [
    {
      icon: "fa-rotate",
      first: "100% Satisfaction",
      second: "Friendly & Reliable Service",
    },
    {
      icon: "fa-box",
      first: "Fast Shipping",
      second: "Only takes 3 working days",
    },
    {
      icon: "fa-spa",
      first: "Vast Collection of Plants",
      second: "Any plants for your space",
    },
  ],
  collections: [
    {
      src: "https://images.unsplash.com/photo-1531875456634-3f5418280d20?w=450",
      name: "Trendy Cactus Varieties",
      desc: "Buy Beautiful and glamorous Cactus Plant",
      value: ["cactus"],
    },
    {
      src: "https://images.unsplash.com/photo-1506634064465-7dab4de896ed?w=450",
      name: "Beautiful Succulents",
      desc: "Select from a vast variety of  succulents",
      value: ["succulent", "luxury-plants"],
    },
    {
      src: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=450",
      name: "Exotic Plants",
      desc: "Buy Quality Indoor & Outdoor Plants",
      value: ["exotic-plants"],
    },
    {
      src: "https://images.unsplash.com/photo-1474444417714-f5d07c4d6a38?w=450",
      name: "Pots & Containers",
      desc: "Ceramic, clay, plastic we got all of them",
      value: ["pots-&-containers"],
    },
    {
      src: "https://images.unsplash.com/photo-1624196364996-a16fd5d546b9?w=450",
      name: "Seeds",
      desc: "Quality seeds from all over the world",
      value: ["seeds"],
    },
    {
      src: "https://images.unsplash.com/photo-1526381805515-3fec2d69e7cc?w=450",
      name: "Gardening Accessories",
      desc: "Best quality gardening accessories",
      value: ["gardening-accessories"],
    },
  ],
  storeItems: [
    { name: "Swap Marketplace", value: "plant-swaps" },
    { name: "Services", value: "services" },
    { name: "Fertilizers", value: "fertilizers", collection: true },
    { name: "Cactus Plants", value: "cactus", collection: true },
    { name: "Succulent Plants", value: "succulent", collection: true },
    { name: "Exotic Plants", value: "exotic-plants", collection: true },
    {
      name: "Best Low Light Indoor Plants",
      value: "special-plants",
      collection: true,
    },
    {
      name: "Seasonal Plants",
      collection: true,
      dynamic: true,
      func: getSeason,
    },
    { name: "Seeds", value: "seeds", collection: true },
    { name: "Pots & Containers", value: "pots-&-containers", collection: true },
    {
      name: "Gardening Accessories",
      value: "gardening-accessories",
      collection: true,
    },
  ],
  plants: [
    {
      _id: "65ca7993cfa2493cf00b0a4c",
      src: [
        "https://boota.pk/wp-content/uploads/2021/03/Agave-Victoria-Plant-scaled.jpg",
        "https://boota.pk/wp-content/uploads/2021/03/Agave-Victoria-Plant-2-1.jpg",
      ],
      name: "Agave Victoria",
      categories: ["Cactus"],
      shortDesc: "The Noble Agave Victoria Plant",
      price: 1800.0,
      potType: "Plastic",
      potSize: "4 Inches",
      longDesc:
        "Agave Victoria, also known as the “queen Victoria agave,” is a striking, large-sized agave native to the highlands of central Mexico. It is a popular plant for cultivation, particularly in desert-like climates, due to its unique appearance and low maintenance requirements.\nThe Queen Victoria agave is characterized by its symmetrical, rosette-shaped leaves, which can grow up to 3-4 feet in length and 1-2 feet in width. These leaves are typically a deep green color, with a glossy sheen, and have a sharp, pointed tip. The plant's leaves are arranged in a spiral pattern around a central stem and have small, spiky teeth along their edges. In the summer months, the queen Victoria agave produces a tall, slender flower stalk, which can grow up to 10-15 feet in height. The plant’s flowers are small and yellow and are typically pollinated by hummingbirds.\nOne of the most appealing aspects of the queen Victoria agave is its low maintenance requirements. It is well-suited to life in a pot and can be grown indoors or outdoors in a sunny location. The plant is drought-tolerant and does not require frequent watering. When watering, it is important to allow the soil to dry out completely before watering again, as the queen Victoria agave is susceptible to root rot. The plant also benefits from being fertilized once a month during the growing season, using a general-purpose fertilizer.\nIn terms of care, the queen Victoria agave is a relatively low-maintenance plant. It is resistant to pests and diseases and does not require pruning. The plant's spines can be trimmed if desired, using a pair of sharp scissors or pruning shears. The plant can be repotted as needed, typically every 2-3 years, using a well-draining cactus potting soil.\nIn conclusion, the Agave Victoria, or queen Victoria agave, is a striking and easy-to-care-for plant that is well-suited to life in a pot. Its large, glossy leaves and tall flower stalk make it a distinctive addition to any desert-like landscape. With proper care, including proper watering, fertilization, and occasional repotting, the queen Victoria agave can thrive and bring beauty to any space.",
    },
    {
      _id: "65ca791ecfa2493cf00b0a4b",
      src: [
        "https://boota.pk/wp-content/uploads/2021/01/Astrophytum-myriostigma-white-2.jpg",
        "https://boota.pk/wp-content/uploads/2021/01/Astrophytum-myriostigma-white.jpg",
        "https://boota.pk/wp-content/uploads/2021/01/Astrophytum.jpg",
      ],
      name: "Astrophytum",
      categories: ["Cactus", "Luxury Plants"],
      shortDesc:
        "Astrophytum is a hard cactus plant with no spines. It blooms in summer and if perfect for your table decoration need",
      price: 799.0,
      potType: "Plastic",
      potSize: "4 Inches",
      longDesc: `Astrophytum is on of the very few varieties in cacti which does not has spines. Astrophytum is famous for its sturdiness and starts to round up with growth. The most common varieties include the white and the green ones with three, four and five sides. You can always message us to ask for your prefered one.

          Astrophytum is a genus of cactus that includes several species native to Mexico. These cacti are popular ornamental plants known for their unique shapes and easy care requirements.
          
          Here are 20 headings covering various aspects of Astrophytum:
          
          Genus overview:
          Astrophytum is a genus of cactus native to Mexico.
          It includes several species known for their unique shapes and easy care requirements.
          Common species:
          Some common species of Astrophytum include A. asterias (sand dollar cactus), A. myriostigma (bishop's cap cactus), and A. ornatum (peanut cactus).
          Appearance:
          Astrophytum cacti have a variety of shapes, including spherical, cylindrical, and flattened.
          They have raised ribs and tubercles, and may have spiny protuberances.
          The plants produce small, yellow flowers in the spring and summer months.
          Care requirements:
          Astrophytum cacti are easy to care for and can be grown indoors or outdoors.
          They prefer bright, indirect sunlight and well-draining soil.
          They should be watered deeply, but allowed to dry out between watering. Overwatering can lead to root rot.
          Pest and disease resistance:
          Astrophytum cacti are generally resistant to pests and diseases.
          However, they may be prone to mealybugs and aphids.
          Temperature tolerance:
          Astrophytum cacti can be damaged by extreme temperature fluctuations.
          They should be protected from frost and extreme heat.
          Propagation:
          Astrophytum cacti can be propagated by seed or by rooting offsets or cuttings.
          Offsets can be removed from the parent plant and replanted in well-draining soil.
          Cuttings can be taken from the stems or pads of the plant and allowed to dry before planting.
          Soil requirements:
          Astrophytum cacti prefer well-draining soil.
          A cactus mix or sandy soil with good drainage is recommended.
          The soil should be allowed to dry out between watering.
          Watering:
          Astrophytum cacti should be watered deeply, but allowed to dry out between watering.
          Overwatering can lead to root rot and other issues.
          The frequency of watering will depend on the humidity, temperature, and light levels in the plant’s environment.
          Sunlight requirements:
          Astrophytum cacti prefer bright, indirect sunlight.
          They should be protected from direct sunlight, which can cause sunburn or fade their colors.
          Fertilizing:
          Astrophytum cacti do not require frequent fertilizing.
          A cactus-specific fertilizer can be applied once or twice a year, according to the manufacturer’s instructions.
          Repotting:
          Astrophytum cacti should be repotted every 2-3 years or when the pot becomes overcrowded.
          They should be repotted in the spring or early summer, using a well-draining cactus mix.
          The new pot should be only slightly larger than the old one.
          Pruning:
          Astrophytum cacti do not require pruning, but dead or damaged pads can be removed as needed.
          Pruning should be done with clean, sharp scissors or a knife
           
          
          Transplanting:
          Astrophytum cacti can be transplanted outdoors in the spring or early summer, after the risk of frost has passed.
          They should be acclimated to outdoor conditions gradually, by placing them in a sheltered spot for a few days before moving them to a full sun location.
          When transplanting, the cactus should be placed in a hole that is slightly larger than its root ball, and the soil should be gently tamped down around the roots.
          Common problems:
          Some common problems with Astrophytum cacti include root rot, sunburn, and pest infestations.
          Root rot can be caused by overwatering or poorly-draining soil.
          Sunburn can be prevented by providing adequate shade and protecting the cactus from direct sunlight.
          Pest infestations can be treated with insecticidal soap or horticultural oil.
          Uses:
          Astrophytum cacti are primarily grown as ornamental plants.
          They are well-suited to a variety of indoor and outdoor environments.
          Some species of Astrophytum have been used in traditional medicine and as a food source.
          Interesting facts:
          Some species of Astrophytum are considered sacred by the indigenous people of Mexico.
          The plants are believed to have spiritual and medicinal properties.
          Astrophytum cacti are prized by collectors and can command high prices on the market.
          Conservation status:
          Some species of Astrophytum are listed as threatened or endangered by the International Union for Conservation of Nature (IUCN).
          Habitat destruction and over-collection are major threats to these cacti.
          Conservation efforts are underway to protect these species and their habitats.
          Cultivation:
          Astrophytum cacti are widely cultivated by cactus enthusiasts and collectors.
          They can be grown from seed, offsets, or cuttings, and are generally easy to care for.
          They are well-suited to a variety of indoor and outdoor environments.
          Popularity:
          Astrophytum cacti are popular ornamental plants known for their unique shapes and easy care requirements.
          They are widely cultivated and sought after by collectors and cactus enthusiasts.
          They make excellent houseplants or garden plants for those who want to add some interest and color to their spaces.
          Perfect for your table decor. Care needed for the provision of water and light. Growth depends on the atmosphere, nature and weather.`,
    },
    {
      _id: "65ca788fcfa2493cf00b0a4a",
      src: [
        "https://boota.pk/wp-content/uploads/2021/03/Brain-Cactus-Mammillaria-Pilcayensis-Cristata-7-100x100.jpg",
        "https://boota.pk/wp-content/uploads/2021/03/Brain-Cactus-Mammillaria-Pilcayensis-Cristata-4.jpg",
      ],
      name: "Brain Cactus (Mammillaria Pilcayensis Cristata)",
      categories: ["Cactus", "Luxury Plants"],
      shortDesc:
        "Brain cactus is a grafted mammalliria with the shape of a brain.",
      price: 3000.0,
      potType: "Plastic",
      potSize: "4 Inches",
      longDesc: `Brain cactus is a grafted mammillaria pilcayencis cristata on the rooting stock of mostly a dragon fruit cactus. It forms curves with age which looks like a brain after a few years of age. The graft is available in white and yellow color but the white one is most wanted.\nBrain cactus, also known as Mammillaria elongata, is a small, slow-growing cactus native to the arid regions of Mexico. It is a popular plant for cultivation, particularly among cactus enthusiasts, due to its unique appearance and easy care requirements.\nThe brain cactus is characterized by its spherical, brain-like stems, which can grow up to 3 inches in diameter. These stems are typically a pale green or blue-green color, with a smooth, waxy surface, and have small, white spines arranged in a spiral pattern. The plant has a short, central taproot, and does not have any visible ribs or tubercles. In the spring and summer months, the brain cactus produces small, pink or purple flowers that bloom from the plant's apex, or top.\nOne of the most appealing aspects of the brain cactus is its low maintenance requirements. It is well-suited to life in a pot, and can be grown indoors or outdoors in a sunny location. The plant is drought-tolerant, and does not require frequent watering. When watering, it is important to allow the soil to dry out completely before watering again, as the brain cactus is susceptible to root rot. The plant also benefits from being fertilized once a month during the growing season, using a cactus-specific fertilizer.\nIn terms of care, the brain cactus is a relatively low-maintenance plant. It is resistant to pests and diseases, and does not require pruning. The plant's spines can be trimmed if desired, using a pair of sharp scissors or pruning shears. The plant can be repotted as needed, typically every 2-3 years, using a well-draining cactus potting soil.\nIn conclusion, the Mammillaria elongata, or brain cactus, is a unique and easy-to-care-for plant that is well-suited to life in a pot. Its spherical stems and small, spiky spines give it a distinctive appearance that is sure to stand out in any cactus collection. With proper care, including proper watering, fertilization, and occasional repotting, the brain cactus can thrive and bring beauty to any space. It is a slow-growing plant, and can take several years to reach its full size.\nPerfect for your table decor. Care needed for the provision of water and light. Growth depends on the atmosphere, nature and weather.`,
    },
  ],
  offerings: [
    {
      src: "https://images.unsplash.com/photo-1687089331133-d6cc89156880?w=450",
      title: "Variety of Plants",
      description:
        "Explore a wide range of plants suitable for different environments and preferences.",
    },
    {
      src: "https://images.unsplash.com/photo-1709532390940-5c09fcdf098d?w=450",
      title: "Fertilizers",
      description:
        "High-quality fertilizers to help your plants thrive and grow healthy.",
    },
    {
      src: "https://images.unsplash.com/photo-1526381805515-3fec2d69e7cc?w=450",
      title: "Gardening Accessories",
      description:
        "Essential gardening tools and accessories for all your gardening needs.",
    },
    {
      src: "https://images.unsplash.com/photo-1657664058691-2633847111c4?w=450",
      title: "Gardening Services",
      description:
        "Book appointments with professional caretakers and provide feedback on their services.",
    },
  ],
  team: [
    {
      name: "Samar Fatima Butt",
      image: Member_1,
      role: "Software Requirement Engineer",
      bio: "Samar ensures all project specifications are clear and precise, making her an invaluable asset to the team."
    },
    {
      name: "Muhammad Shaharyar",
      image: Member_2,
      role: "Software Developer",
      bio: "Muhammad builds robust and scalable applications, tackling complex challenges with innovative solutions."
    },
    {
      name: "Uzair Kaira",
      image: Member_3,
      role: "UI/UX Designer",
      bio: "Uzair creates intuitive and visually appealing designs, ensuring our applications are functional and enjoyable."
    }
  ]
};

export const statusColorMap = {
  CANCELLED: "bg-red-500 text-white",
  PENDING: "bg-yellow-500 text-black",
  PAID: "bg-green-500 text-white",
  PROCESSING: "bg-yellow-500 text-black",
  SHIPPED: "bg-blue-500 text-white",
  DELIVERED: "bg-green-500 text-white",
};

export default staticData;
