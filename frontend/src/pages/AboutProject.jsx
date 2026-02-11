import React from "react";
import "../styles/AboutProject.css";

export default function AboutProject() {
  return (
    <div className="about-project">
      <h1>Project Case Study: Beta Chow Foods</h1>

      <p className="project-intro">
        <b>Beta Chow Foods</b> is a full-stack food ordering and order management
        system developed to support a Lagos-based SME restaurant. The platform
        enables customers to browse meals, place online orders, and track order
        progress in real time, while providing administrators with tools to
        manage menu items, orders, and customers efficiently.
      </p>

      <section>
        <h2>1. Project Background</h2>
        <p>
          Many small restaurants in Lagos rely heavily on WhatsApp messages,
          phone calls, and informal communication for taking orders. This often
          leads to operational inefficiencies such as delayed responses, order
          errors, poor customer experience, and limited business scalability.
        </p>
        <p>
          This project was designed as a digital solution that supports
          structured ordering, automated tracking, and improved customer service
          delivery for SME food businesses.
        </p>
      </section>

      <section>
        <h2>2. Business Problem</h2>
        <ul>
          <li>Manual order processing via WhatsApp and phone calls</li>
          <li>High likelihood of missed or incorrect orders</li>
          <li>Limited visibility for customers to track their orders</li>
          <li>No centralized order database for business reporting</li>
          <li>Difficulty scaling operations as customer demand increases</li>
        </ul>
      </section>

      <section>
        <h2>3. Solution Delivered</h2>
        <p>
          I developed a full-stack e-commerce food ordering system that provides
          a modern web experience for customers and an operational dashboard for
          administrators. The solution ensures improved order accuracy,
          structured customer records, and a scalable foundation for future
          business growth.
        </p>
      </section>

      <section>
        <h2>4. Key Features Implemented</h2>
        <ul>
          <li>Customer-facing menu browsing and product listing</li>
          <li>Cart system with quantity adjustment and checkout workflow</li>
          <li>Order placement with delivery details capture</li>
          <li>Order tracking using a unique order number</li>
          <li>Automated order status updates (New → Accepted → Completed)</li>
          <li>Admin dashboard for managing orders, customers, and menu items</li>
          <li>Enable/Disable menu items (availability control)</li>
          <li>WhatsApp fallback ordering integration for customer convenience</li>
        </ul>
      </section>

      <section>
        <h2>5. Technology Stack</h2>
        <ul>
          <li>
            <b>Frontend:</b> React (Vite), React Router, CSS (custom responsive UI)
          </li>
          <li>
            <b>Backend:</b> Django + Django REST Framework (REST API architecture)
          </li>
          <li>
            <b>Authentication:</b> JWT-based admin authentication
          </li>
          <li>
            <b>Database:</b> SQLite (development) with scalable support for PostgreSQL
          </li>
          <li>
            <b>Deployment:</b> Frontend deployed on <b>Vercel</b>, Backend deployed on{" "}
            <b>PythonAnywhere</b>
          </li>
        </ul>
      </section>

      <section>
        <h2>6. System Architecture</h2>
        <p>
          The system follows a modern client-server architecture. The React
          frontend communicates with the Django REST API through secure HTTP
          requests. The backend handles business logic, database operations, and
          authentication, while the frontend focuses on user experience and
          interface performance.
        </p>

        <ul>
          <li>React UI → REST API calls</li>
          <li>Django REST API → database operations</li>
          <li>JWT authentication for admin access control</li>
          <li>Deployed architecture supports scalability and modular upgrades</li>
        </ul>
      </section>

      <section>
        <h2>7. My Role & Contribution</h2>
        <p>
          I independently designed and developed the entire system from planning
          to deployment. This included frontend UI development, backend API
          engineering, database integration, deployment setup, and system
          testing.
        </p>

        <ul>
          <li>Designed the system workflow and user journey</li>
          <li>Developed the REST API and integrated frontend communication</li>
          <li>Implemented admin management features and authentication</li>
          <li>Handled deployment on Vercel and PythonAnywhere</li>
          <li>Ensured responsive design for mobile and desktop usability</li>
        </ul>
      </section>

      <section>
        <h2>8. Business Impact</h2>
        <p>
          This solution demonstrates how digital transformation can improve SME
          operations by replacing informal ordering methods with structured
          automation. The system improves order accuracy, enhances customer
          experience, and provides a foundation for data-driven decision making.
        </p>

        <ul>
          <li>Reduced operational friction caused by manual order handling</li>
          <li>Improved customer confidence through order tracking</li>
          <li>Enabled better order visibility and admin control</li>
          <li>Created a scalable platform for future expansion</li>
        </ul>
      </section>

      <section>
        <h2>9. Challenges & Learning Outcomes</h2>
        <p>
          Building and deploying this system provided strong experience in
          full-stack development, API integration, debugging production issues,
          and delivering a complete real-world business solution.
        </p>

        <ul>
          <li>Full-stack integration between React and Django REST</li>
          <li>Deployment configuration and production debugging</li>
          <li>Building responsive admin dashboards and customer interfaces</li>
          <li>Applying real-world system design for SME operations</li>
        </ul>
      </section>

      <section>
        <h2>10. Future Enhancements</h2>
        <ul>
          <li>Payment gateway integration (Paystack / Stripe)</li>
          <li>Role-based admin permissions</li>
          <li>Inventory management module</li>
          <li>Delivery staff assignment and dispatch tracking</li>
          <li>Business analytics dashboard with charts and KPIs</li>
          <li>SMS/Email notifications for order updates</li>
        </ul>
      </section>

      <section>
        <h2>11. Live Deployment</h2>
        <p>
          This project is fully deployed and accessible online:
        </p>

        <ul>
          <li>
            <b>Frontend (Vercel):</b>{" "}
            <a
              href="https://beta-chow-foods-ntkg.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              https://beta-chow-foods-ntkg.vercel.app
            </a>
          </li>
        </ul>

        <p className="note-text">
          <i>
            Note: Admin features require authentication and are restricted for
            security purposes.
          </i>
        </p>
      </section>
    </div>
  );
}