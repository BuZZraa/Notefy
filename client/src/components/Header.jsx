function Header() {
  return (
    <header>
      <div class="bg-indigo-500 border-b border-gray-200">
        <div class="px-4 mx-auto sm:px-6 lg:px-8">
          <nav class="relative flex items-center justify-between h-16 lg:h-20">
            <div class="lg:flex lg:items-center lg:space-x-10">
              <a
                href="#"
                title=""
                class="text-base font-medium text-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300"
              >
                Home
              </a>

              <a
                href="#"
                title=""
                class="text-base font-medium text-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300"
              >
                About
              </a>
            </div>

            <div class="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
              <div class="flex-shrink-0">
                <img
                  class="w-auto h-8 lg:h-10"
                  src="https://merakiui.com/images/full-logo.svg"
                  alt=""
                />
              </div>
            </div>

            <div class="lg:flex lg:items-center lg:space-x-4">
              <a
                href="#"
                title=""
                class="text-base font-medium text-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300"
              >
                
                Register
              </a>

              <a
                href="#"
                title=""
                class="text-base font-medium text-indigo-500 bg-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300 hover:text-stone-100"
              >
                
                Log in
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
