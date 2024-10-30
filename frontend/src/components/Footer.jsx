
const Footer = () => {
  return (
    <footer className='text-center py-4 fixed bottom-0 left-0 w-full bg-transparent backdrop-brightness-75 backdrop-blur-md border-t-2 border-gray-400 rounded-t-xl shadow-xl'>
      <div className='flex flex-col items-center'>
        <h1 className='text-lg font-semibold'>
          &copy; {new Date().getFullYear()} Abhishek Das
        </h1>
        <p className='text-sm text-gray-600'>
          Made by Abhishek Das
        </p>
        <p className='text-sm text-gray-600'>
          Email: <a href='mailto:codewithabhi14@gmail.com' className='text-grey-500 '>codewithabhi14@gmail.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
