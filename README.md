#  Farm-Vet E-Shop

Farm-Vet E-Shop is a **full-stack e-commerce platform** designed for the **veterinary and farm supplies industry**, providing a secure, scalable, and intelligent shopping experience.  
The platform combines modern frontend architecture, Firebase backend services, and **AI-powered features** for data analysis and product recommendations.

---

##  Key Features

###  Authentication & Authorization
- User registration and login using **Email or Username**
- Password reset functionality
- Role-based access control (User / Admin)
- Protected routes for sensitive pages
- Secure session handling with Firebase Authentication

---

### E-Commerce Functionality
- Browse and view products
- Advanced search and filtering
- Shopping cart with quantity management
- Favorites (wishlist) per user
- Persistent cart & favorites per authenticated user

---

###  Admin Dashboard
- Add, edit, and delete products
- Manage user roles and permissions
- Secure admin-only routes
- Full protection using Firestore Security Rules

---

###  Notifications System
- Personalized notifications for each user
- Secure access (each user can access only their own notifications)
- Real-time updates using Firestore listeners

---

##  AI-Powered Features

###  Sales Analytics AI Model
- AI model analyzes sales and user behavior data
- Generates insights such as:
  - Best-selling products
  - Sales trends
  - High-demand categories
- Helps admins make **data-driven decisions**
- Improves inventory planning and product prioritization

###  Smart Recommendation Chatbot
- AI-powered chatbot integrated into the platform
- Recommends the **best products** based on:
  - User preferences
  - Previous interactions
  - Product popularity
- Enhances user experience and increases conversion rate

---

##  Tech Stack

### Frontend
- **React.js**
- **Redux Toolkit** (state management)
- **React Router**
- **Vite**
- Modular and scalable component architecture

### Backend & Services
- **Firebase Authentication**
- **Firestore Database**
- **Firebase Security Rules**
- Real-time data handling with Firestore listeners

### AI & Intelligence
- AI Agent for sales data analysis
- Recommendation engine for personalized product suggestions
- AI chatbot for product guidance

### Tools & Utilities
- Axios
- Environment Variables (.env)
- Clean code & feature-based folder structure
- Git & GitHub for version control

---

##  Security & Data Protection

- Strong Firestore Security Rules
- Users can only access their own data
- Admin-only write access for sensitive collections
- Protected API keys and environment variables
- Secure authentication and authorization flow

---



