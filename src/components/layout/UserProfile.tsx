export default function UserProfile({ nickname }: { nickname: string }) {
  return (
    <div className="flex items-center">
      <div className="flex items-center ml-4">
        <div className="mr-3">
          <button
            type="button"
            className="bg-gray-800 flex text-[1.6rem] rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span className="sr-only">Open user menu</span>
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </button>
        </div>
        <div className="hidden md:flex items-center text-gray-300 text-sm">
          {nickname}
        </div>
      </div>
    </div>
  );
}
