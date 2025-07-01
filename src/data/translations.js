import { Shield, Leaf, Brain, Hand } from 'lucide-react';
import one from '../assets/1.webp'
import two from '../assets/2.webp'
import three from '../assets/3.webp'
import four from '../assets/4.webp'
import five from '../assets/5.webp'

export const translations = {
  en: {
    nav: {
      home: 'Home',
      homelink: '/',
      aboutUs: 'About Us',
      aboutUslink: '/about',
      product: 'Shop D-52',
      productlink: '/product',
      privacyPolicy: 'Privacy Policy',
      privacyPolicylink: '/privacy',
      returnPolicy: 'Return Policy',
      returnPolicylink: '/return',
      Checkout: 'Checkout',
      Checkoutlink: '/checkouts',
      contactUs: 'Contact Us',
      contactUslink: '/contact',
      terms: "Terms & Conditions",
      natural: "100% Natural",
      lastone: "© 2025. All Rights Reserved By D-52",
      termslink: '/terms',
      // blog: 'Blog',
      // bloglink: '/blog',
    },
    hero: {
      title: 'Natural Support for Diabetes Management',
      description: 'Empower your health journey with safe, herbal diabetes care solutions'
    },
    about: {
      title: 'About Us',
      content1: `At D-52 Diabetes Care, our mission is to support individuals in managing diabetes naturally and effectively. Our herbal formulation is crafted to help regulate blood sugar levels, improve energy, and support overall wellness without side effects. Each bottle contains powerful plant-based extracts, designed for easy, daily use.`,
      content2: `We believe in natural wellness without compromise. D-52 is committed to delivering safe, science-informed, and AYUSH-certified alternatives to support your body in maintaining balance and vitality. Whether you're newly diagnosed or managing long-term diabetes, D-52 is your reliable companion on the journey to better health.`,
      question1: `Why Choose D-52 for Diabetes Care?`,
      question2: "Blood Sugar Balance:",
      answer1: `Our herbal drops are designed to help regulate blood glucose naturally by supporting insulin sensitivity and metabolic function. This helps stabilize your energy and reduce fluctuations throughout the day.`,
      question3: "Liver & Digestive Support:",
      answer2: `D-52 includes liver-friendly herbs that not only aid in detoxification but also support digestion—both critical factors for effective diabetes control.`,
      question4: "Simple & Safe to Use:",
      answer3: `With just 5 drops in water before meals—morning and evening—D-52 is easy to use daily. The formula is free from chemicals and additives, making it a gentle, natural solution to long-term diabetes care.`,
    },
    product: {
      title: 'Product',
      subtitle: 'Natural Herbal Drops for Diabetes Management',
      title2: `How D-52 Helps You Live Healthier with Diabetes`,
      content1: `Managing diabetes requires more than just avoiding sugar—your body needs real support to stay balanced. D-52 helps your system regain control by supporting glucose metabolism, liver function, and overall energy levels.`,
      content2: `These drops are ideal for anyone looking to manage blood sugar naturally, reduce fatigue, and improve digestion. D-52 works with your body—not against it—to gently promote stability and strength from within.`,
      content3: `Each pack contains 5 mini 30 ml bottles. Just add 5 drops in a glass of water before breakfast and dinner. That’s it. No complicated routines or pills—just a simple herbal solution for better blood sugar control.`,
    },
    faq: {
      title: "FAQ's",
      faqData: [
        {
          question: "What is D-52 Diabetes Care?",
          answer: "D-52 is a natural herbal drop formulation designed to help manage blood sugar levels, support digestion, and boost overall energy using traditional Ayurvedic ingredients."
        },
        {
          question: "How do I use D-52?",
          answer: "Add 5 drops to a glass of water and drink it before meals—once in the morning and once in the evening. It’s that simple."
        },
        {
          question: "Is D-52 safe for long-term use?",
          answer: "Yes. D-52 is made with safe, herbal ingredients and contains no harmful chemicals or preservatives. It is certified by the AYUSH department for quality and safety."
        },
        {
          question: "What are the benefits of using D-52?",
          answer: "It helps maintain healthy blood glucose levels, supports liver and digestive function, and reduces fatigue often associated with diabetes."
        },
        {
          question: "Who should use D-52?",
          answer: "Anyone managing diabetes or prediabetes, or those looking for natural metabolic support, can benefit from using D-52 daily."
        }
      ]
    },
    testimonials: {
      title: 'Real Results from Real People',
      testimonial: [
        {
          image: one,
          text: "D-52 has become an essential part of my daily routine. My sugar levels have stabilized, and I feel more energetic throughout the day. The simplicity of just 5 drops before meals is perfect.",
          name: 'RAJESH KUMAR',
          role: 'School Principal',
          rating: 5,
          location: 'Bangalore, Karnataka',
          beforeAfter: [
            'More stable glucose readings',
            'Increased daily energy',
            'No bloating or digestive issues',
            'Liver markers improved'
          ]
        },
        {
          image: two,
          text: "I was looking for a natural way to manage my blood sugar. D-52 has helped me feel more balanced and alert. It fits easily into my lifestyle and doesn’t feel like a burden.",
          name: 'POONAM SINGH',
          role: 'Yoga Instructor',
          rating: 5,
          location: 'Lucknow, Uttar Pradesh',
          beforeAfter: [
            'Better fasting sugar levels',
            'Improved mental focus',
            'Reduced cravings',
            'Feel lighter after meals'
          ]
        },
        {
          image: three,
          text: "My doctor suggested I try natural alternatives. D-52 supported my digestion and gave me a boost of energy. It’s subtle but effective.",
          name: 'SURESH IYER',
          role: 'Accountant',
          rating: 4.5,
          location: 'Chennai, Tamil Nadu',
          beforeAfter: [
            'Reduced sugar spikes',
            'Better post-meal digestion',
            'Improved mood',
            'Gentle on the stomach'
          ]
        },
        {
          image: four,
          text: "I didn’t expect much from herbal drops, but D-52 proved me wrong. I feel much better overall and my blood reports look more promising now.",
          name: 'ALKA MEHRA',
          role: 'Retired Banker',
          rating: 5,
          location: 'Delhi NCR',
          beforeAfter: [
            'Lower HbA1c levels',
            'Fewer sugar crashes',
            'Improved sleep patterns',
            'More physical activity'
          ]
        }
      ]      
    },       
    contact: {
      title: 'Contact Us',
      address: 'India',
      phone: '+91 939 227 7389',
      email: 'customercareproductcenter@gmail.com',
      info: "information",
      det: "Details",
      pagetitle: 'Need your help?',
      pagesectitle: 'You can contact us today ',
      pageinname: "Your Name",
      pageinemail: "Your Email",
      pageinphone: "Your Phone",
      pageinsubject: "Subject",
      pageinmessage: "Write you present condition...",
      pagesubbutton: "Send Message",
    },
    // aboutpage: {
    //   title: "About Us",
    //   img: about,
    // },    
    returnpage: {
      title: 'Return Policy',
      sectitle: 'Return Policy',
      content1: `D-52 is committed to helping millions of people become fitter, healthier, and happier; we stand behind the quality of our products with a 15-day return policy. If you don't believe our products are improving the quality of your life, we offer a refund within 15 days of receipt of your order, less the shipping cost. Any remaining product and original packaging must be returned to D-52 for a refund.`,
      content2: `Eligibility – Your purchase is eligible for a return if it meets the criteria below:`,
      content3: `Refunds require returning used or unused product packaging of D-52 Products.`,
      content4: `Return Process has to be done by the customer only.`,
      content5: `The product has to reach the specified address on the website.`,
      content6: `The product has to arrive within 15 days of the date of purchasing the product.`,
      content7: `We will not accept damaged products.`,
      content8: `Amount will be added to the original source of payment done by the customer within 10 working days.`,
    },    
    sections: [
      {
        title: "Information We Collect",
        content: [
          {
            text: "This Privacy Policy describes how Dr.Joints Fat and Weight Loss Oil collects, uses, and discloses your information when you use our website https://drjoints.in"
          },
          {
            subtitle: "Personal Information",
            text: "This includes information that can be used to identify you, such as your name, billing address, shipping address, email address, and phone number. You only provide this information when you contact us through a form on the Site."
          },
          {
            subtitle: "Non-Personal Information",
            text: "This includes information that cannot be used to identify you, such as your browser type, operating system, IP address, browsing activity on the Site, and demographic information (e.g., age, gender). This information is collected automatically when you visit the Site."
          }
        ]
      }
    ],
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: June 2025",
      sections: [
        {
          title: "Information We Collect",
          content: [
            {
              text: "This Privacy Policy describes how D-52 uses and discloses your information when you use our website https://www.d52care.com/"
            },
            {
              subtitle: "Personal Information:",
              text: "This includes information that can be used to identify you, such as your name, billing address, shipping address, email address, and phone number. You only provide this information when you contact us through a form on the Site."
            },
            {
              subtitle: "Non-Personal Information:",
              text: "This includes information that cannot be used to identify you, such as your browser type, operating system, IP address, browsing activity on the Site, and demographic information (e.g., age, gender). This information is collected automatically when you visit the Site."
            }
          ]
        },
        {
          title: "How We Use Your Information",
          content: [
            {
              subtitle: "Personal Information:",
              text: "We will only use your personal information to respond to inquiries and requests. We will not share your personal information with any third parties without your consent, except as required by law."
            },
            {
              subtitle: "Non-Personal Information:",
              text: "We use non-personal information to improve the Site and understand how users interact. We may also use non-personal information for internal marketing and promotional purposes."
            }
          ]
        },
        {
          title: "Cookies and Tracking Technologies",
          content: `We may use cookies and other tracking technologies to collect non-personal information about your use of the Site. Cookies are small data files that are stored on your device when you visit a website. They allow the website to remember your actions and preferences over time. If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser. When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed. If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.`
        },
        {
          title: "Third-Party Service Providers",
          content: "We may use third-party service providers to help us operate the Site and deliver our services. These service providers may have access to your non-personal information. We will not share your personal information with any third-party service providers for their marketing purposes without your consent."
        },
        {
          title: "Security",
          content: "We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no website or internet transmission is completely secure."
        },
        {
          title: "Children's Privacy",
          content: "The Site is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you believe that your child has provided us with personal information, please contact us. We will take steps to remove the information from our records."
        },
        {
          title: "Changes to this Privacy Policy",
          content: "We may update this Privacy Policy from time to time. We will post any changes on the Site. We encourage you to review this Privacy Policy periodically for the latest information on our privacy practices."
        }
      ]
    },    
    checkout: {
      title: "Checkout",
      sectitle: "Billing Details",
      firstname: 'First Name ',
      lastname: 'Last Name ',
      country: 'Country/ Region ',
      address: 'Street Address ',
      city: 'Town/ City ',
      countrytitle: "Country ",
      phone: "Phone ",
      email: "Email Address ",
      order: "Your Order",
      clientaddress: "Apartment/Suite",
      mode: "Payment Mode",
      total: "Total",
      shipping: "Shipping",
      subtotal: "Subtotal",
      product: "Product",
      processing: "Processing...",
      successfully: "Order Placed Successfully!",
      thank: "Thank you for your purchase. You will receive a confirmation email shortly.",
      continue: "Continue Shopping"
    },
    features: [
      {
        icon: Brain,
        title: "Effective Pain Relief",
        color: "text-blue-500"
      },
      {
        icon: Leaf,
        title: "Natural Ingredients",
        color: "text-green-500"
      },
      {
        icon: Hand,
        title: "Promotes Recovery",
        color: "text-orange-500"
      },
      {
        icon: Shield,
        title: "Convenient And Easy To Use",
        color: "text-purple-500"
      }
    ],
    termsData: {
      title: "Terms & Conditions",
      sections: [
        {
          title: "Welcome to D-52!",
          content:
            "These terms and conditions outline the rules and regulations for the use of the D-52 website, located at https://www.d52care.com, a natural herbal supplement for diabetes wellness support. By accessing this website we assume you accept these terms and conditions. Do not continue to use D-52 if you do not agree to take all of the terms and conditions stated on this page."
        },
        {
          title: "Definitions",
          content:
            "The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice, and all Agreements: \"Client\", \"You\" and \"Your\" refers to you, the person who logs on to this website and is compliant with the Company's terms and conditions. \"The Company\", \"Ourselves\", \"We\", \"Our\" and \"Us\" refers to our Company. \"Party\", \"Parties\", or \"Us\" refers to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, by and subject to, prevailing laws. Any use of the above terminology or other words in the singular, plural, capitalization, and/or he/she or they, are taken as interchangeable and therefore as referring to the same."
        },
        {
          title: "Cookies",
          content:
            "We employ the use of cookies. By accessing D-52, you agree to use cookies in agreement with D-52's Privacy Policy. Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies."
        },
        {
          title: "License",
          content:
            "Unless otherwise stated, D-52 and/or its licensors own the intellectual property rights for all material on D-52. All intellectual property rights are reserved. You may access this from D-52 for your own personal use subject to restrictions set in these terms and conditions."
        },
        {
          title: "You must not:",
          content: [
            "Republish material from D-52",
            "Sell, rent, or sub-license material from D-52",
            "Reproduce, duplicate, or copy material from D-52",
            "Redistribute content from D-52"
          ]
        },
        {
          title: "User Comments",
          content:
            "Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. D-52 does not filter, edit, publish, or review Comments prior to their appearance on the website. Comments do not reflect the views and opinions of D-52, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts them. To the extent permitted by applicable laws, D-52 shall not be liable for the Comments or any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website."
        },
        {
          title: "Content Liability",
          content:
            "We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are arising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third-party rights."
        }
      ]
    }    
    }
};

