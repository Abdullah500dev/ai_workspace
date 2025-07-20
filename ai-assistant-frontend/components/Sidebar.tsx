import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = [
  { name: 'Chat', href: '/chat' },
  { name: 'Search', href: '/search' },
  { name: 'Upload', href: '/upload' },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">AI Assistant</h1>
      <nav>
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-md hover:bg-gray-700 ${
                  router.pathname === item.href ? 'bg-gray-700' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
