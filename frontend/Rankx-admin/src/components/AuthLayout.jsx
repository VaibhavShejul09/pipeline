export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT SIDE - branding / admin info */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-green-700 to-green-900 text-white">
        <h1 className="text-5xl font-extrabold mb-4">RankX Admin</h1>
        <p className="text-lg opacity-90 mb-6">
          Manage your platform efficiently with secure admin tools.
        </p>

{/* 
        <ul className="space-y-3 text-sm opacity-90">
          <li>✔ User & Role Management</li>
          <li>✔ Real-time Analytics</li>
          <li>✔ System Monitoring</li>
        </ul> */}
      </div>

      {/* RIGHT SIDE - login form */}
      <div className="flex items-center justify-center bg-gray-900">
        <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-xl 
                        border border-gray-700 rounded-2xl p-10 shadow-2xl">
          
          <h2 className="text-3xl font-bold text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            {subtitle}
          </p>

          {children}

          {/* Optional admin footer */}
          <div className="mt-6 text-center text-gray-500 text-xs">
            © 2026 RankX Admin Panel. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
