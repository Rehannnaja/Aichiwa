import Head from 'next/head';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Masuk | Aichiwa</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="p-6 bg-gray-900 rounded-xl w-full max-w-md shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Masuk ke Aichiwa</h1>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded font-semibold"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
