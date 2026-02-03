import { useState } from "react";
import {
  FiHeart,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";

const Footer = () => {
  const [year] = useState(new Date().getFullYear());

  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand and description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-primary-600">LMS Pro</h2>
                <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
                  v2.1.0
                </span>
              </div>
              <p className="mt-3 text-gray-600 text-sm">
                A comprehensive Learning Management System designed to
                streamline education management for institutions, teachers, and
                students.
              </p>
              <div className="mt-4 flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiGithub className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiTwitter className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiLinkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:contact@lmspro.edu"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiMail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="/dashboard"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/courses"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href="/grades"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Grades
                  </a>
                </li>
                <li>
                  <a
                    href="/calendar"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Calendar
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/cookies"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/security"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-600">
                © {year} LMS Pro. All rights reserved.
              </div>
              <div className="mt-4 md:mt-0 flex items-center text-sm text-gray-600">
                <span>Made with</span>
                <FiHeart className="mx-1 text-red-500" />
                <span>by the LMS Team</span>
              </div>
            </div>

            {/* System status */}
            <div className="mt-4 text-xs text-gray-500 flex items-center justify-center">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
              System Status: All systems operational
              <span className="mx-2">•</span>
              <span>Last updated: Today, 10:30 AM</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
