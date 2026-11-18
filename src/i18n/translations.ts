import { Language } from '../types';

export interface Translations {
  nav: {
    home: string;
    findParking: string;
    liveMap: string;
    citizenDashboard: string;
    ownerHub: string;
    adminCommand: string;
    signIn: string;
    signOut: string;
    municipalMobility: string;
    language: string;
  };
  landing: {
    heroBadge: string;
    heroHeadline: string;
    heroHeadlineAccent: string;
    heroSubtitle: string;
    findParkingBtn: string;
    getStartedBtn: string;
    instantSearchTitle: string;
    edgeActive: string;
    destinationLandmark: string;
    vehicleType: string;
    checkAvailabilityBtn: string;
    totalCapacity: string;
    acrossZones: string;
    liveOpenBays: string;
    updatedRealtime: string;
    freeShuttle: string;
    shuttleFreq: string;
    bookingSpeed: string;
    instantEntry: string;
    destinationsTitle: string;
    destinationsHeading: string;
    destinationsDesc: string;
    catAll: string;
    catTemple: string;
    catHeritage: string;
    catNature: string;
    catMuseum: string;
    baysFree: string;
    viewDetailsPrompt: string;
    nearby: string;
    nearbyAndInfo: string;
    reserveBay: string;
  };
  searchFilter: {
    searchPlaceholder: string;
    allKolhapur: string;
    filtersTitle: string;
  };
  hubCard: {
    viewDetails: string;
    perHour: string;
    dayPass: string;
    availableOf: string;
    capacity: string;
    fastFill: string;
    highDemand: string;
    normalFlow: string;
    freeBays: string;
    fullDetailsBtn: string;
    directionsBtn: string;
    bookSlotBtn: string;
    nearbySpots: string;
    tabAll: string;
    tabHospitals: string;
    tabFood: string;
    tabStay: string;
    minWalk: string;
    navigate: string;
    call: string;
  };
  vehicle: {
    twoWheeler: string;
    fourWheeler: string;
    ev: string;
  };
  modal: {
    close: string;
    share: string;
    liveParkingStatus: string;
    vehicleTariffs: string;
    amenities: string;
    aiAdvisory: string;
    realtimePerspectives: string;
    nearbyLocations: string;
    startGps: string;
    reserveSlot: string;
    pointsOfInterest: string;
  };
  dashboards: {
    citizenTitle: string;
    ownerTitle: string;
    adminTitle: string;
    activeBookings: string;
    registeredVehicles: string;
    addVehicle: string;
    cancel: string;
    extend: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      findParking: 'Find Parking',
      liveMap: 'Live Map',
      citizenDashboard: 'My Citizen Dashboard',
      ownerHub: 'Slot Owner Hub',
      adminCommand: 'KMC Admin Command',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      municipalMobility: 'Kolhapur Municipal Smart Mobility',
      language: 'Language',
    },
    landing: {
      heroBadge: 'KMC Official Smart City Pilot',
      heroHeadline: 'Smart Parking,',
      heroHeadlineAccent: 'Smarter Kolhapur.',
      heroSubtitle: 'Find parking, check live availability, and reserve your parking space effortlessly across Kolhapur.',
      findParkingBtn: 'Find Parking',
      getStartedBtn: 'Get Started',
      instantSearchTitle: 'Instant Bay Search',
      edgeActive: 'Live Edge Telemetry Active',
      destinationLandmark: 'Destination Landmark',
      vehicleType: 'Vehicle Type',
      checkAvailabilityBtn: 'Check Live Bay Availability',
      totalCapacity: 'Total City Capacity',
      acrossZones: 'Across 14 municipal zones',
      liveOpenBays: 'Live Open Bays',
      updatedRealtime: 'Updated every 15 seconds',
      freeShuttle: 'Free Darshan Shuttle',
      shuttleFreq: '4-6 min frequency to Temple',
      bookingSpeed: 'Booking Speed',
      instantEntry: 'Instant QR & FastTag entry',
      destinationsTitle: 'Authentic Kolhapur Destinations',
      destinationsHeading: "Seamless Parking at Kolhapur's Historic Landmarks",
      destinationsDesc: 'From the sanctum of Ambabai Temple & Jyotiba Hill to the historic Swargamandapa of Khidrapur, Kaneri Math, and Dajipur Wildlife Sanctuary, explore guaranteed parking spaces.',
      catAll: 'All Destinations',
      catTemple: 'Temples & Pilgrimage',
      catHeritage: 'Palaces & Forts',
      catNature: 'Lakes & Wildlife',
      catMuseum: 'Museums & Culture',
      baysFree: 'Bays Free',
      viewDetailsPrompt: 'View Details ↗',
      nearby: 'Nearby',
      nearbyAndInfo: 'Nearby & Info',
      reserveBay: 'Reserve Bay',
    },
    searchFilter: {
      searchPlaceholder: 'Search temple gates, Rankala, New Palace, CBS...',
      allKolhapur: 'All Kolhapur',
      filtersTitle: 'Filters',
    },
    hubCard: {
      viewDetails: 'View Details',
      perHour: '/hr',
      dayPass: '/day pass',
      availableOf: 'Available of',
      capacity: 'capacity',
      fastFill: 'Fast-Fill Warning',
      highDemand: 'High Demand Zone',
      normalFlow: 'Normal Capacity Flow',
      freeBays: 'Bays Free',
      fullDetailsBtn: 'Full Details',
      directionsBtn: 'GPS Route',
      bookSlotBtn: 'Reserve Bay',
      nearbySpots: 'Nearby Spots',
      tabAll: 'All',
      tabHospitals: 'Hospitals',
      tabFood: 'Food & Misal',
      tabStay: 'Hotels for Stay',
      minWalk: 'min walk',
      navigate: 'Navigate',
      call: 'Call',
    },
    vehicle: {
      twoWheeler: '2-Wheeler',
      fourWheeler: '4-Wheeler',
      ev: 'EV Charging',
    },
    modal: {
      close: 'Close',
      share: 'Share',
      liveParkingStatus: 'Live Smart Parking Status',
      vehicleTariffs: 'Vehicle Tariffs & Pricing',
      amenities: 'Facility Amenities & Smart Features',
      aiAdvisory: 'AI Smart Advisory',
      realtimePerspectives: 'Realtime Ground Perspectives',
      nearbyLocations: 'Nearby Real-Time Locations & Navigator',
      startGps: 'Start Turn-by-Turn GPS Navigation',
      reserveSlot: 'Reserve Parking Slot',
      pointsOfInterest: 'Points of Interest',
    },
    dashboards: {
      citizenTitle: 'My Citizen Dashboard',
      ownerTitle: 'Slot Owner Hub',
      adminTitle: 'KMC Municipal Command Center',
      activeBookings: 'Active Bookings',
      registeredVehicles: 'Registered Vehicles',
      addVehicle: 'Add Vehicle',
      cancel: 'Cancel',
      extend: 'Extend',
    },
  },

  mr: {
    nav: {
      home: 'मुख्यपृष्ठ',
      findParking: 'पार्किंग शोधा',
      liveMap: 'थेट नकाशा',
      citizenDashboard: 'माझे नागरिक डॅशबोर्ड',
      ownerHub: 'जागा मालक केंद्र',
      adminCommand: 'मनपा प्रशासन केंद्र',
      signIn: 'साइन इन करा',
      signOut: 'बाहेर पडा',
      municipalMobility: 'कोल्हापूर महानगरपालिका स्मार्ट मोबिलिटी',
      language: 'भाषा',
    },
    landing: {
      heroBadge: 'कोल्हापूर मनपा अधिकृत स्मार्ट सिटी उपक्रम',
      heroHeadline: 'स्मार्ट पार्किंग,',
      heroHeadlineAccent: 'स्मार्ट कोल्हापूर.',
      heroSubtitle: 'कोल्हापुरात सहजपणे पार्किंग शोधा, थेट उपलब्धता तपासा आणि आपली जागा आरक्षित करा.',
      findParkingBtn: 'पार्किंग शोधा',
      getStartedBtn: 'सुरू करा',
      instantSearchTitle: 'त्वरित जागा शोध',
      edgeActive: 'थेट सेन्सर माहिती कार्यरत',
      destinationLandmark: 'गंतव्य स्थळ',
      vehicleType: 'वाहन प्रकार',
      checkAvailabilityBtn: 'थेट उपलब्धता तपासा',
      totalCapacity: 'एकूण मनपा क्षमता',
      acrossZones: '१४ मनपा विभागांमध्ये',
      liveOpenBays: 'उपलब्ध मोकळ्या जागा',
      updatedRealtime: 'दर १५ सेकंदांनी अद्ययावत',
      freeShuttle: 'मोफत दर्शन ई-शटल',
      shuttleFreq: 'मंदिरासाठी दर ४-६ मिनिटांनी',
      bookingSpeed: 'बुकिंग वेग',
      instantEntry: 'झटपट QR व फास्टॅग प्रवेश',
      destinationsTitle: 'ऐतिहासिक कोल्हापूर पर्यटन स्थळे',
      destinationsHeading: 'कोल्हापूरच्या ऐतिहासिक स्थळांवर सुलभ पार्किंग',
      destinationsDesc: 'अंबाबाई मंदिर व ज्योतिबा डोंगरापासून खिद्रापूरचा स्वर्गमंडप, कणेरी मठ आणि दाजीपूर अभयारण्यापर्यंत खात्रीशीर पार्किंग जागा शोधा.',
      catAll: 'सर्व स्थळे',
      catTemple: 'मंदिरे व तीर्थक्षेत्रे',
      catHeritage: 'राजवाडे व किल्ले',
      catNature: 'तलाव व वन्यजीव',
      catMuseum: 'संग्रहालये व संस्कृती',
      baysFree: 'जागा उपलब्ध',
      viewDetailsPrompt: 'तपशील पहा ↗',
      nearby: 'जवळपास',
      nearbyAndInfo: 'माहिती व जवळपास',
      reserveBay: 'जागा बुक करा',
    },
    searchFilter: {
      searchPlaceholder: 'मंदिर, रंकाळा, न्यू पॅलेस, मध्यवर्ती बस स्थानक शोधा...',
      allKolhapur: 'संपूर्ण कोल्हापूर',
      filtersTitle: 'फिल्टर्स',
    },
    hubCard: {
      viewDetails: 'तपशील पहा',
      perHour: '/तास',
      dayPass: '/दिवस पास',
      availableOf: 'उपलब्ध एकूण',
      capacity: 'क्षमतेपैकी',
      fastFill: 'जलद भरणारी जागा',
      highDemand: 'अति गर्दीचे क्षेत्र',
      normalFlow: 'सामान्य गर्दी',
      freeBays: 'जागा मोकळ्या',
      fullDetailsBtn: 'सविस्तर माहिती',
      directionsBtn: 'जीपीएस मार्ग',
      bookSlotBtn: 'जागा बुक करा',
      nearbySpots: 'जवळपासची ठिकाणे',
      tabAll: 'सर्व',
      tabHospitals: 'रुग्णालये',
      tabFood: 'खाद्यसंस्कृती व मिसळ',
      tabStay: 'मुक्कामासाठी हॉटेल्स',
      minWalk: 'मि. पायी',
      navigate: 'मार्गदर्शन',
      call: 'कॉल करा',
    },
    vehicle: {
      twoWheeler: 'दुचाकी',
      fourWheeler: 'चारचाकी',
      ev: 'ईव्ही चार्जिंग',
    },
    modal: {
      close: 'बंद करा',
      share: 'शेअर करा',
      liveParkingStatus: 'थेट स्मार्ट पार्किंग स्थिती',
      vehicleTariffs: 'वाहन दरपत्रक',
      amenities: 'पार्किंग सुविधा व वैशिष्ट्ये',
      aiAdvisory: 'एआय स्मार्ट सूचना',
      realtimePerspectives: 'थेट छायाचित्रे व दृश्ये',
      nearbyLocations: 'जवळपासची ठिकाणे व जीपीएस नेव्हिगेशन',
      startGps: 'जीपीएस नेव्हिगेशन सुरू करा',
      reserveSlot: 'पार्किंग जागा आरक्षित करा',
      pointsOfInterest: 'जवळपासची आकर्षणे',
    },
    dashboards: {
      citizenTitle: 'माझे नागरिक डॅशबोर्ड',
      ownerTitle: 'जागा मालक केंद्र',
      adminTitle: 'मनपा प्रशासन नियंत्रण कक्ष',
      activeBookings: 'सक्रिय बुकिंग्ज',
      registeredVehicles: 'नोंदणीकृत वाहने',
      addVehicle: 'वाहन जोडा',
      cancel: 'रद्द करा',
      extend: 'वेळ वाढवा',
    },
  },

  hi: {
    nav: {
      home: 'होम',
      findParking: 'पार्किंग खोजें',
      liveMap: 'लाइव मैप',
      citizenDashboard: 'मेरा नागरिक डैशबोर्ड',
      ownerHub: 'स्लॉट ओनर हब',
      adminCommand: 'केएमसी एडमिन कमांड',
      signIn: 'साइन इन करें',
      signOut: 'लॉग आउट',
      municipalMobility: 'कोल्हापुर नगर निगम स्मार्ट मोबिलिटी',
      language: 'भाषा',
    },
    landing: {
      heroBadge: 'केएमसी आधिकारिक स्मार्ट सिटी पायलट',
      heroHeadline: 'स्मार्ट पार्किंग,',
      heroHeadlineAccent: 'स्मार्ट कोल्हापुर।',
      heroSubtitle: 'कोल्हापुर में आसानी से पार्किंग खोजें, लाइव उपलब्धता जांचें और अपनी जगह आरक्षित करें।',
      findParkingBtn: 'पार्किंग खोजें',
      getStartedBtn: 'शुरू करें',
      instantSearchTitle: 'त्वरित पार्किंग खोज',
      edgeActive: 'लाइव सेंसर डेटा सक्रिय',
      destinationLandmark: 'गंतव्य स्थल',
      vehicleType: 'वाहन प्रकार',
      checkAvailabilityBtn: 'लाइव उपलब्धता जांचें',
      totalCapacity: 'कुल नगर क्षमता',
      acrossZones: '14 नगर निगम क्षेत्रों में',
      liveOpenBays: 'उपलब्ध खुली जगहें',
      updatedRealtime: 'हर 15 सेकंड में अपडेट',
      freeShuttle: 'मुफ्त दर्शन ई-शटल',
      shuttleFreq: 'मंदिर के लिए हर 4-6 मिनट में',
      bookingSpeed: 'बुकिंग स्पीड',
      instantEntry: 'त्वरित क्यूआर व फास्टैग प्रवेश',
      destinationsTitle: 'ऐतिहासिक कोल्हापुर पर्यटन स्थल',
      destinationsHeading: 'कोल्हापुर के ऐतिहासिक स्थलों पर आसान पार्किंग',
      destinationsDesc: 'अंबाबाई मंदिर और ज्योतिबा पहाड़ी से लेकर खिद्रापुर के स्वर्गमंडप, कणेरी मठ और दाजीपुर अभयारण्य तक गारंटीड पार्किंग खोजें।',
      catAll: 'सभी स्थल',
      catTemple: 'मंदिर और तीर्थस्थल',
      catHeritage: 'राजमहल और किले',
      catNature: 'झील और वन्यजीव',
      catMuseum: 'संग्रहालय और संस्कृति',
      baysFree: 'जगहें उपलब्ध',
      viewDetailsPrompt: 'विवरण देखें ↗',
      nearby: 'आसपास',
      nearbyAndInfo: 'जानकारी व आसपास',
      reserveBay: 'जगह बुक करें',
    },
    searchFilter: {
      searchPlaceholder: 'मंदिर, रंकाला, न्यू पैलेस, सेंट्रल बस स्टैंड खोजें...',
      allKolhapur: 'पूरा कोल्हापुर',
      filtersTitle: 'फिल्टर्स',
    },
    hubCard: {
      viewDetails: 'विवरण देखें',
      perHour: '/घंटा',
      dayPass: '/डे पास',
      availableOf: 'उपलब्ध कुल',
      capacity: 'क्षमता में से',
      fastFill: 'जल्दी भरने की चेतावनी',
      highDemand: 'उच्च मांग क्षेत्र',
      normalFlow: 'सामान्य भीड़',
      freeBays: 'जगहें खाली',
      fullDetailsBtn: 'पूरा विवरण',
      directionsBtn: 'जीपीएस मार्ग',
      bookSlotBtn: 'जगह बुक करें',
      nearbySpots: 'आसपास के स्थल',
      tabAll: 'सभी',
      tabHospitals: 'अस्पताल',
      tabFood: 'खानपान और मिसल',
      tabStay: 'ठहरने के होटल',
      minWalk: 'मिनट पैदल',
      navigate: 'नेविगेट',
      call: 'कॉल करें',
    },
    vehicle: {
      twoWheeler: 'दोपहिया',
      fourWheeler: 'चारपहिया',
      ev: 'ईवी चार्जिंग',
    },
    modal: {
      close: 'बंद करें',
      share: 'शेयर करें',
      liveParkingStatus: 'लाइव स्मार्ट पार्किंग स्थिति',
      vehicleTariffs: 'वाहन शुल्क दर',
      amenities: 'पार्किंग सुविधाएं व विशेषताएं',
      aiAdvisory: 'एआई स्मार्ट सलाह',
      realtimePerspectives: 'वास्तविक तस्वीरें व दृश्य',
      nearbyLocations: 'आसपास के स्थल व जीपीएस नेविगेशन',
      startGps: 'जीपीएस नेविगेशन शुरू करें',
      reserveSlot: 'पार्किंग जगह बुक करें',
      pointsOfInterest: 'आसपास के आकर्षण',
    },
    dashboards: {
      citizenTitle: 'मेरा नागरिक डैशबोर्ड',
      ownerTitle: 'स्लॉट ओनर हब',
      adminTitle: 'केएमसी नगर निगम कमान केंद्र',
      activeBookings: 'सक्रिय बुकिंग',
      registeredVehicles: 'पंजीकृत वाहन',
      addVehicle: 'वाहन जोड़ें',
      cancel: 'रद्द करें',
      extend: 'समय बढ़ाएं',
    },
  },
};
