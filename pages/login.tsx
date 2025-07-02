import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Masuk | Aichiwa</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute w-[600px] h-[600px] bg-blue-700/20 rounded-full blur-3xl animate-pulse -top-40 -left-40"></div>
        <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-2xl animate-ping -bottom-20 -right-20"></div>

        {/* Login Card */}
        <div className="relative z-10 bg-gray-900/80 border border-gray-800 backdrop-blur-md p-8 rounded-2xl w-full max-w-md shadow-xl text-white">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold">🔒 Aichiwa Login</h1>
            <p className="text-gray-400 mt-2 text-sm">Selamat datang kembali, silakan login ke akunmu</p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm mb-1 text-gray-300">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-300">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200"
            >
              Masuk
            </button>

            <p className="text-center text-sm text-gray-400">
              Belum punya akun?{" "}
              <a href="/register" className="text-blue-400 hover:underline">
                Daftar sekarang
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
