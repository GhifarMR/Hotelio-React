interface Name {
  title?: string,
  link?: string,
}

const Logo= ({title = "HOTELIO", link = "/"}: Name) => (
  <div className="font-bold cursor-pointer text-2xl ml-6 md:hover:bg-purple-950 md:hover:text-white active:bg-purple-950 active:text-white pt-1 pb-1 pl-1 pr-1 transition">
    <a href={link}>{title}</a>
  </div>
);

export default Logo;