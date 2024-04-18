import React from "react";

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[var(--primary-dark-color)]">
      <form
        action=""
        className="bg-[var(--primary-soft-color)] p-10 rounded-md w-[500px] h-[500px] flex justify-center flex-col gap-6"
      >
        <h1 className="text-center text-white text-2xl mb-4">Login</h1>
        <input
          type="text"
          placeholder="Username"
          className="p-7 border-2 border-[#2e374a] rounded-sm bg-[var(--primary-dark-color)]"
        />
        <input
          type="text"
          placeholder="Password"
          className="p-7 border-2 border-[#2e374a] rounded-sm bg-[var(--primary-dark-color)]"
        />
        <button className="p-7 bg-[teal] border-none cursor-pointer rounded-sm">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
