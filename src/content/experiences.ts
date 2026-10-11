import type { Experience } from "./types";

const MAP_LOGO_PATH = "/images/illustrations/map-logo";

export const experiences: Experience[] = [
  {
    id: "ratha-beedi",
    slug: "ratha-beedi",
    offeringId: "half-day-experience",

    title: "Ratha Beedi",
    teaser:
      "A walking trail through Udupi's living temple quarter, where ritual, commerce, architecture, and everyday life meet.",

    description:
      "From sacred chariot routes to the rhythm of a living bazaar, Ratha Beedi reveals the everyday layers around Udupi's temple culture.",

    duration: "2 hours",
    format: "Walking trail",

    highlights: [
      "The Krishna Temple complex",
      "The ritual life of the temple square",
      "Ratha Beedi and its changing streetscape",
      "Shops, eateries, and everyday life",
      "Historic buildings and local memory",
    ],

    map: {
      x: 38,
      y: 56,
      label: "Ratha Beedi",
      icon: `${MAP_LOGO_PATH}/IMG_4267.png`,
    },

    image: {
      src: "https://ik.imagekit.io/abr6j2ge8/Ratha%20beedi.jpg",
      alt: "Ratha Beedi trail in Udupi",
    },

    seo: {
      title: "Ratha Beedi Walking Trail | the koral collective",
      description:
        "Explore Ratha Beedi in Udupi through a curated cultural walking trail with the koral collective.",
    },
  },

  {
    id: "kallianpur",
    slug: "kallianpur",
    offeringId: "half-day-experience",

    title: "Kallianpur",
    teaser:
      "An ancient coastal settlement where Portuguese heritage, faith, and centuries of stories meet.",

    description:
      "From early settlement to Portuguese outpost and modern town, Kallianpur weaves together colonial intrigue, living faith, and centuries of resilience.",

    duration: "2 hours",
    format: "Walking trail",

    highlights: [
      "Ancient coastal settlement",
      "Portuguese heritage",
      "Churches and living faith",
      "Colonial history",
      "Stories of the Kallianpur community",
    ],

    map: {
      x: 38,
      y: 39,
      label: "Kallianpur",
      icon: `${MAP_LOGO_PATH}/IMG_4268.png`,
    },

    image: {
      src: "https://ik.imagekit.io/abr6j2ge8/Kaliyanpur.jpeg",
      alt: "Kallianpur trail in coastal Karnataka",
    },

    seo: {
      title: "Kallianpur Walking Trail | the koral collective",
      description:
        "Walk through Kallianpur's coastal history, Portuguese heritage, faith, and living community with the koral collective.",
    },
  },

  {
    id: "barkur",
    slug: "barkur",
    offeringId: "half-day-experience",

    title: "Barkur",
    teaser:
      "A historic capital of Tulunadu shaped by royal power, trade, temples, and the Seetha River.",

    description:
      "From Alupa dynasty capital to an ancient trading port, Barkur carries layers of royal history, religious architecture, and coastal trade.",

    duration: "6 hours",
    format: "Walking trail",

    highlights: [
      "Historic Alupa capital",
      "Ancient trading routes",
      "Temple architecture",
      "The Seetha River landscape",
      "Layers of Hindu, Jain, and coastal heritage",
    ],

    map: {
      x: 36,
      y: 28,
      label: "Barkur",
      icon: `${MAP_LOGO_PATH}/IMG_4269.png`,
    },

    image: {
      src: "https://ik.imagekit.io/abr6j2ge8/Barkur.jpeg",
      alt: "Barkur heritage trail in Tulunadu",
    },

    seo: {
      title: "Barkur Heritage Walking Trail | the koral collective",
      description:
        "Discover Barkur's royal, trading, architectural, and cultural history through a curated the koral collective trail.",
    },
  },

  {
    id: "basrur",
    slug: "basrur",
    offeringId: "half-day-experience",

    title: "Basrur",
    teaser:
      "A historic port settlement where maritime trade, colonial encounters, and village life meet.",

    description:
      "From Vijayanagara trading port to colonial battleground and tranquil village, Basrur carries the memory of a historic maritime landscape.",

    duration: "6 hours",
    format: "Walking trail",

    highlights: [
      "Historic maritime trade",
      "Vijayanagara-era connections",
      "Portuguese, Dutch, and British encounters",
      "Merchant quarters",
      "Temple heritage",
    ],

    map: {
      x: 29,
      y: 17,
      label: "Basrur",
      icon: `${MAP_LOGO_PATH}/IMG_4270.png`,
    },

    image: {
      src: "https://ik.imagekit.io/abr6j2ge8/Basrur.jpeg",
      alt: "Basrur heritage trail",
    },

    seo: {
      title: "Basrur Heritage Walking Trail | the koral collective",
      description:
        "Explore Basrur's maritime history, merchant quarters, colonial encounters, and temple heritage with the koral collective.",
    },
  },

  {
    id: "moodbidri",
    slug: "moodbidri",
    offeringId: "half-day-experience",

    title: "Moodbidri",
    teaser:
      "A Jain heritage town layered with sacred stone, royal patronage, literature, and living tradition.",

    description:
      "From ancient Jain shrines to the Thousand Pillar Temple, Moodbidri reveals the architectural and cultural depth of Tulunadu's Jain heritage.",

    duration: "6 hours",
    format: "Walking trail",

    highlights: [
      "The Thousand Pillar Temple",
      "Jain heritage",
      "Royal Alupa and Vijayanagara connections",
      "Historic Jain shrines",
      "Living literary traditions",
    ],

    map: {
      x: 72,
      y: 74,
      label: "Moodbidri",
      icon: `${MAP_LOGO_PATH}/IMG_4272.png`,
    },

    image: {
      src: "https://ik.imagekit.io/abr6j2ge8/Moodbidri%20.jpg",
      alt: "Moodbidri Jain heritage trail",
    },

    seo: {
      title: "Moodbidri Heritage Walking Trail | the koral collective",
      description:
        "Explore Moodbidri's Jain temples, architecture, royal history, and literary traditions with the koral collective.",
    },
  },

  {
    id: "karkala",
    slug: "karkala",
    offeringId: "half-day-experience",

    title: "Karkala",
    teaser:
      "A Jain pilgrimage centre shaped by monumental stone, medieval architecture, and living traditions.",

    description:
      "From black granite monuments to Jain pilgrimage sites, Karkala reveals the architectural, spiritual, and cultural layers of Tulunadu.",

    duration: "6 hours",
    format: "Walking trail",

    highlights: [
      "The Bahubali monolith",
      "Chaturmukha Basadi",
      "Jain pilgrimage heritage",
      "Medieval stone architecture",
      "Local artisan traditions",
    ],

    map: {
      x: 74,
      y: 59,
      label: "Karkala",
      icon: `${MAP_LOGO_PATH}/IMG_4274.png`,
    },

    image: {
      src: "https://ik.imagekit.io/abr6j2ge8/Gomateshwara%20Karkala.png",
      alt: "Karkala Jain heritage trail",
    },

    seo: {
      title: "Karkala Jain Heritage Trail | the koral collective",
      description:
        "Walk through Karkala's Jain heritage, monumental stone architecture, and living traditions with the koral collective.",
    },
  },

  {
    id: "shirva",
    slug: "shirva",
    offeringId: "half-day-experience",

    title: "Shirva",
    teaser:
      "A rural landscape where prehistoric remains, ritual, agriculture, and living traditions meet.",

    description:
      "From prehistoric megaliths to medieval sacred landscapes, Shirva offers a quieter journey through the agrarian and ritual life of Tulunadu.",

    duration: "6 hours",
    format: "Walking trail",

    highlights: [
      "Prehistoric megalithic remains",
      "The Nadibettu Palace",
      "Agrarian landscapes",
      "Local ritual traditions",
      "The Siri Paddana folk tradition",
    ],

    map: {
      x: 48,
      y: 70,
      label: "Shirva",
      icon: `${MAP_LOGO_PATH}/IMG_4275.png`,
    },

    image: {
      src: "https://ik.imagekit.io/abr6j2ge8/Shirva.JPG",
      alt: "Shirva cultural walking trail",
    },

    seo: {
      title: "Shirva Cultural Walking Trail | the koral collective",
      description:
        "Discover Shirva's megalithic heritage, rural landscapes, ritual traditions, and living culture with the koral collective.",
    },
  },

  {
    id: "coastal-tulunadu",
    slug: "coastal-tulunadu",
    offeringId: "half-day-experience",

    title: "Coastal Tulunadu",
    teaser:
      "A broader journey through the coast, connecting settlements, landscapes, architecture, food, and memory.",

    description:
      "A wider exploration of the coastal landscape that connects the communities and cultural histories of Tulunadu.",

    duration: "Full day",
    format: "Curated experience",

    highlights: [
      "Coastal landscapes",
      "Living communities",
      "Heritage architecture",
      "Food and local traditions",
    ],

    map: {
      x: 72,
      y: 78,
      label: "Coastal Tulunadu",
      icon: `${MAP_LOGO_PATH}/IMG_4276.png`,
    },

    image: {
      src: "/images/offerings/coastal-tulunadu-placeholder.jpg",
      alt: "Coastal Tulunadu cultural experience",
    },

    seo: {
      title: "Coastal Tulunadu Experience | the koral collective",
      description:
        "Experience the landscapes, heritage, food, communities, and living traditions of coastal Tulunadu with the koral collective.",
    },
  },
];