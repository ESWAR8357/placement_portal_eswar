import { FiArrowRight, FiBarChart2, FiCheckCircle, FiCode, FiLayers } from "react-icons/fi";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
            Placement Preparation Portal
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl dark:text-white">
            Practice smarter for aptitude, coding, technical MCQs, and interviews.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
            A structured preparation workspace for students to track performance, revisit weak topics, and stay ready
            for placement rounds.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to={isAuthenticated ? "/dashboard" : "/register"} className="btn-primary">
              Get Started
              <FiArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="btn-secondary">
              {isAuthenticated ? "Open Dashboard" : "Login"}
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: <FiLayers />, title: "Aptitude Tests", text: "Quant, logical, and verbal practice." },
              { icon: <FiCode />, title: "Technical MCQs", text: "Java, React, JavaScript, DBMS, OS, and CN." },
              { icon: <FiBarChart2 />, title: "Progress Tracking", text: "Scores and performance trends." },
              { icon: <FiCheckCircle />, title: "Interview Prep", text: "Company experiences and common questions." }
            ].map((item) => (
              <div key={item.title} className="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">
                  {item.icon}
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
