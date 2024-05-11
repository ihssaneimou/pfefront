import React from "react";

const ForgotPassword = () => {
  return (
    <main className="h-screen flex flex-col gap-2 items-center justify-center bg-gray-200 p-6">
      <div className="bg-gray-100 pt-4 px-8 pb-4 rounded-lg shadow-md w-96">
        <div className="w-full flex mb-4">
          <p className="text-center mx-auto">Entrez votre email:</p>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mb-4 w-full p-3 rounded-md border border-gray-200 bg-gray-200  placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none">
          Confirmer
        </button>
      </div>
      {/* had lform khas ytle3 ta ytsifet link dial reset password fl email dial user */}
      <div className="bg-gray-100 pt-8 px-8 pb-4 rounded-lg shadow-md w-96">
        <div className="w-full flex mb-4">
          <p className="text-center mx-auto">
            Entrez votre nouveau mot de passe
          </p>
        </div>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          className="mb-4 w-full p-3 rounded-md border border-gray-200 bg-gray-200  placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <div className="w-full flex mb-4">
          <p className="text-center mx-auto">
            Resaisir le nouveau mot de passe
          </p>
        </div>
        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          className="mb-4 w-full p-3 rounded-md border border-gray-200 bg-gray-200  placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none">
          Confirmer
        </button>
      </div>
    </main>
  );
};

export default ForgotPassword;
