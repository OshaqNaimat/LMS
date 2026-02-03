import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiCheckCircle } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              return to sign in
            </Link>
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          {submitted ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <FiCheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">
                Check your email
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                We've sent password reset instructions to:
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">{email}</p>
              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    try another email address
                  </button>
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Return to sign in
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Enter your email address and we'll send you instructions to
                  reset your password.
                </p>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send reset instructions"}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a
              href="mailto:support@lmspro.edu"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
